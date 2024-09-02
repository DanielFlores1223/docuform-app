import { UseGuards, applyDecorators } from '@nestjs/common';
import { JwtGuardGuard } from 'src/auth/guards';

export const Auth = () => {
    return applyDecorators(
        UseGuards(JwtGuardGuard),
    )
};
