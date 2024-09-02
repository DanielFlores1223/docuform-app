import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, UserRegisterDto } from './dto';
import { ResponseController } from 'src/common/interfaces';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokenResponse } from './responses';
import { ApiRestEndpointDescription, ApiRestResponse } from 'src/common/decorators';
import { Auth } from './decorators';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Auth()
  @Post('register')
  @ApiBearerAuth()
  @ApiRestEndpointDescription({
    summary: 'Create an user and authenticate them',
    bodyInterface: 'IRegisterUserPayload',
    responseInterface: 'IApiResponse<TokenResponse>'
  })
  @ApiRestResponse({
    genericType: TokenResponse,
    description: 'Welcome to docuform'
  })
  async register(
    @Body() userRegisterDto: UserRegisterDto
  ): Promise<ResponseController<TokenResponse>> {
    const result = await this.authService.register(userRegisterDto);
  
    return {
      message: 'Welcome to docuform',
      result
    }
  }

  @Post('login')
  @ApiRestEndpointDescription({
    summary: 'Basic authentication with email and password',
    bodyInterface: 'ILoginPayload',
    responseInterface: 'IApiResponse<TokenResponse>'
  })
  @ApiRestResponse({
    genericType: TokenResponse,
    description: 'Welcome to docuform'
  })
  async login(
    @Body() loginDto: LoginDto
  ): Promise<ResponseController<TokenResponse>> {
    const result = await this.authService.login(loginDto);

    return {
      message: 'Welcome to docuform',
      result
    }
  }
}
