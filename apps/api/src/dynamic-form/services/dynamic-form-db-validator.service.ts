import { BadRequestException, Injectable } from "@nestjs/common";
import { In, Not, Repository } from "typeorm";
import { DynamicForm, FieldType } from "../entities";
import { InjectRepository } from "@nestjs/typeorm";

interface IUniqueNameUser {
    idDynamicForm?: number;
    name: string;
    idUser: string;
}

interface IValidateConstrainstsOptions {
  formFieldsIds: number[],
  uniqueNameUser: IUniqueNameUser
}

@Injectable()
export class DynamicFormDBValidatorService {
    constructor(
        @InjectRepository(DynamicForm)
        private readonly dynamicFormRepository: Repository<DynamicForm>,
        @InjectRepository(FieldType)
        private readonly fieldTypeRepository: Repository<FieldType>,
    ) {}

    async validateConstraints(options: IValidateConstrainstsOptions): Promise<never | void> {
        const { formFieldsIds, uniqueNameUser } = options;
        
        await Promise.all([
            this._validateFormField(formFieldsIds),
            this._uniqueUserName(uniqueNameUser),
        ]);
    }

    private async _validateFormField(formFieldsIds: number[]) {
        const uniqueFieldsIds = new Set();
        formFieldsIds.forEach( f => uniqueFieldsIds.add(f) );
    
        const amountFormFields = await this.fieldTypeRepository.find({
            where: { id: In(formFieldsIds) },
            select: { id: true }
        });
    
        if(amountFormFields.length !== uniqueFieldsIds.size)
            throw new BadRequestException('One or more form fields could not be found');
    }

    private async _uniqueUserName(uniqueNameUser: IUniqueNameUser) {
        // unique constraint "unique_name_user"
        const existUniqueNameUser = await this.dynamicFormRepository.findOne({
            where: { 
                name: uniqueNameUser.name, 
                user: { id: uniqueNameUser.idUser },
                id: uniqueNameUser.idDynamicForm 
                && Not(uniqueNameUser.idDynamicForm)
            },
            select: { id: true  },
        });
    
        if(existUniqueNameUser)
            throw new BadRequestException(`The name: ${uniqueNameUser.name} is unavailable`)
    }
}