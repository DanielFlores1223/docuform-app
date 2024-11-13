import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDynamicFormDto } from './dto/create-dynamic-form.dto';
import { UpdateDynamicFormDto } from './dto/update-dynamic-form.dto';
import { In, Not, Repository } from 'typeorm';
import { DynamicForm, FieldType, FormField } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities';

interface ValidateConstrainstsOptions {
  formFieldsIds: number[],
  uniqueNameUser: {
    idDynamicForm?: number;
    name: string;
    idUser: string;
  }
}
@Injectable()
export class DynamicFormService {
  constructor(
    @InjectRepository(DynamicForm)
    private readonly dynamicFormRepository: Repository<DynamicForm>,
    @InjectRepository(FormField)
    private readonly formFiledRepository: Repository<FormField>,
    @InjectRepository(FieldType)
    private readonly fieldTypeRepository: Repository<FieldType>
  ) {}

  async create(createDynamicFormDto: CreateDynamicFormDto, user: User) {
    const { name, description, fields } = createDynamicFormDto;

    await this.validateConstraints({
      formFieldsIds: fields.map(field => field.idFieldType),
      uniqueNameUser: { idUser: user.id, name: name }
    });

    const fieldsForDB = fields.map(field => {
      return this.formFiledRepository.create({
        fieldType: { id: field.idFieldType },
        name: field.name,
        scannedDocumentSeparator: field.scannedDocumentSeparator
      })
    });

   await this.dynamicFormRepository.save({
      name,
      description,
      user: user,
      formFields: fieldsForDB
    });

  }

  findAll() {
    return `This action returns all dynamicForm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dynamicForm`;
  }

  update(id: number, updateDynamicFormDto: UpdateDynamicFormDto) {
    return `This action updates a #${id} dynamicForm` + updateDynamicFormDto;
  }

  remove(id: number) {
    return `This action removes a #${id} dynamicForm`;
  }

  private async validateConstraints(options: ValidateConstrainstsOptions): Promise<never | void> {
    const { formFieldsIds, uniqueNameUser } = options;

    const uniqueFieldsIds = new Set();
    formFieldsIds.forEach( f => uniqueFieldsIds.add(f) );

    // id_field_type
    const amountFormFields = await this.fieldTypeRepository.find({
      where: { id: In(formFieldsIds) },
      select: { id: true }
    });

    if(amountFormFields.length !== uniqueFieldsIds.size)
      throw new BadRequestException('One or more form fields could not be found')

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
      throw new BadRequestException(`the name: ${uniqueNameUser.name} is unavailable`)
  }
}
