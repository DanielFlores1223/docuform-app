import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { DynamicForm } from "../../entities";
import { User } from "src/auth/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { DynamicFormController } from "../../dynamic-form.controller";
import { IOwnerDynamicFormParams } from "src/dynamic-form/interfaces";

@Injectable()
export class OwnerDynamicFormGuard implements CanActivate {
    constructor(
        @InjectRepository(DynamicForm)
        private readonly dynamicFormRepository: Repository<DynamicForm>,
    ) {}

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const req = ctx.switchToHttp().getRequest();
       
        const params = req.params as IOwnerDynamicFormParams;
        
        if(!params.id && !params.slug && !params.idDynamicForm)
            throw new InternalServerErrorException('The route should contain id or slug param');

        const user = req.user as User;

        if(!user) 
            throw new UnauthorizedException('Try to login')

        const record = await this.dynamicFormRepository.findOne({ 
            where: {
                ...this._getParamFilter(params, ctx),
                user: { id: user.id } 
            }
        });

        if(!record) throw new NotFoundException() ;
        
        req.dynamicForm = record;
        return true
    }

    private _getParamFilter(params: IOwnerDynamicFormParams, ctx: ExecutionContext) {
        let paramFilter = {};

        if(params?.id && ctx.getClass().name === DynamicFormController.name) 
            paramFilter = { id: params.id };

        if(params?.idDynamicForm) 
            paramFilter = { id: params.idDynamicForm };

        if(params?.slug) 
            paramFilter = { slug: params.slug }

        return paramFilter;
    }
}