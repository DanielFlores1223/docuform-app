import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { DynamicForm } from 'src/dynamic-form/entities';

export const GetDynamicForm = createParamDecorator(
    (data: keyof DynamicForm, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const dynamicForm = req.dynamicForm;

        if(!dynamicForm)
            throw new InternalServerErrorException('Dynamic form was not found in request');

        if(data)
            return dynamicForm[data];

        return dynamicForm
    }
);
