import { ExecutionContext, InternalServerErrorException, createParamDecorator } from '@nestjs/common';
import { User } from 'src/auth/entities';

export const GetUser = createParamDecorator(
    (data: keyof User, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        if(!user)
            throw new InternalServerErrorException('User not found in request');

        if(data) return user[data];

        return user;
    }
);
