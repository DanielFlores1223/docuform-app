import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto';
import { TokenResponse } from 'global-interfaces';
import { ResponseController } from 'src/common/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() userRegisterDto: UserRegisterDto
  ): Promise<ResponseController<TokenResponse>> {
    const result = await this.authService.register(userRegisterDto);
  
    return {
      message: 'Ok',
      result
    }
  }
}
