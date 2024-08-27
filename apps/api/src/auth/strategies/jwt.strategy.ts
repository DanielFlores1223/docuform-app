import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvsVariables } from "src/common/interfaces";
import { JwtPaylaod } from "../interfaces";
import { User } from "../entities";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        configService: ConfigService<EnvsVariables>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'), 
        });
    }

    async validate(payload: JwtPaylaod): Promise<User> {
        const { id } = payload;
        
        const user = await this.userRepository.findOne({ 
            where: { 
                id, 
                active: true 
            }, 
            select: { 
                id: true, 
                email: true,
                name: true 
            } 
        });

        if(!user)
            throw new UnauthorizedException('Token is not valid');

        return user;
    }   
}
