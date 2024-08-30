import { BadRequestException, Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { User, UserUniqueAttr } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from './dto';
import { EncryptService } from 'src/common/services';
import { JwtPaylaod } from './interfaces';
import { TokenResponse } from './responses';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly encryptService: EncryptService
  ) {}

  async register( userRegisterDto: UserRegisterDto ): Promise<TokenResponse> {
    const user = this.userRepository.create({
      active: true,
      email: userRegisterDto.email,
      name: userRegisterDto.name,
    });

    await this.validateUniqueFieldsExist(user);

    const password = await this.encryptService.hashPassword(userRegisterDto.password);
    
    const userDb = await this.userRepository.save({ 
      ...user,
      password
    });

    const token = this.getJwtToken({ id: userDb.id });

    return { token }
  }

  private async validateUniqueFieldsExist(user: UserUniqueAttr): Promise<never | boolean> {
    const { email, id } = user;

    if(!email) throw new Error('property email is required in validateUniqueFieldsExist function');

    const emailExist = await this.userRepository.findOne({
      where: [
        { email },
        id && { id: Not(id) }
      ],
      select: { id: true }
    });

    if(emailExist) 
      throw new BadRequestException(`Email ${email} already exists`);

    return true;
  }

  private getJwtToken(payload: JwtPaylaod): string {
    const token = this.jwtService.sign(payload);

    return token;
  }

}
