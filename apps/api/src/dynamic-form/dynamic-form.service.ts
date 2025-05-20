import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDynamicFormDto } from './dto/create-dynamic-form.dto';
import { UpdateDynamicFormDto } from './dto/update-dynamic-form.dto';
import { FindOptionsWhere, ILike, In, Not, Repository } from 'typeorm';
import { DynamicForm, FieldType, FormField } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities';
import { IGetDynamicFormsResponse, IPaginationResponse } from 'global-interfaces';
import { FindAllDynamicFormDto } from './dto';
import { SlugService } from 'src/common/services';

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
    private readonly slugService: SlugService,
    @InjectRepository(DynamicForm)
    private readonly dynamicFormRepository: Repository<DynamicForm>,
    @InjectRepository(FormField)
    private readonly formFieldRepository: Repository<FormField>,
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
      return this.formFieldRepository.create({
        fieldType: { id: field.idFieldType },
        name: field.name,
        scannedDocumentSeparator: field.scannedDocumentSeparator
      })
    });

   await this.dynamicFormRepository.save({
      name,
      description,
      user: user,
      formFields: fieldsForDB,
      slug: this.slugService.generateSlug(name)
    });

  }

  async findAll(params: FindAllDynamicFormDto, user: User): Promise<IPaginationResponse<IGetDynamicFormsResponse>> {
    const where: FindOptionsWhere<DynamicForm> = {
      user: { id: user.id }
    };

    if(params.search) {
      where.name = ILike(`%${params.search}%`);
    }

    const [records, total] = await this.dynamicFormRepository.findAndCount({
      select: { id: true, name: true, description: true }, 
      where: where,
      skip: params.offset,
      take: params.limit,
      order: { id: 'DESC' }
    });

    return {
      total,
      records
    }
  }

  async findOne(dynamicForm: DynamicForm) {
    const formFields = await this.formFieldRepository.find({
      where: { dynamicForm: { id: dynamicForm.id } }
    });

    return {
      ...dynamicForm,
      formFields
    };
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
