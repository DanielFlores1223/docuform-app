import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvsVariables } from 'src/common/interfaces';
import { JwtStrategy } from './strategies';
import { EncryptService } from 'src/common/services';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: 
        (configService: ConfigService<EnvsVariables>) => 
        {
          return {
            secret: configService.get('JWT_SECRET'),
            signOptions: { expiresIn: '2h' }
          } 
        }
    }),
    CommonModule
  ],
  controllers: [AuthController],
  providers: [AuthService, TypeOrmModule, JwtStrategy, EncryptService],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
