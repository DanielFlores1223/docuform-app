import { CanActivate, UseGuards, applyDecorators } from '@nestjs/common';
import { JwtGuardGuard } from 'src/auth/guards';

interface IAuthDecorator {
    extraGuards?: (CanActivate | Function)[],
}

export const Auth = (args?: IAuthDecorator) => {
    const extraGuards = args?.extraGuards || [];

    return applyDecorators(
        UseGuards(JwtGuardGuard, ...extraGuards),
    )
};
