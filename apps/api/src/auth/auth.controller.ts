import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto';
import { ResponseController } from 'src/common/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { TokenResponse } from './responses';
import { ApiRestEndpointDescription, ApiRestResponse } from 'src/common/decorators';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
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
}
