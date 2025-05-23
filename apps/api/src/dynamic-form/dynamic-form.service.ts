import { Injectable } from '@nestjs/common';
import { CreateDynamicFormDto } from './dto/create-dynamic-form.dto';
import { UpdateDynamicFormDto } from './dto/update-dynamic-form.dto';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { DynamicForm, FormField } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities';
import { IGetDynamicFormsResponse, IPaginationResponse } from 'global-interfaces';
import { FindAllDynamicFormDto } from './dto';
import { SlugService } from 'src/common/services';
import { DynamicFormDBValidatorService } from './services';
import { GetDynamicFormsResponse, GetDynamicFormResponse, GetFormFieldsResponse } from './responses';


@Injectable()
export class DynamicFormService {
  constructor(
    private readonly slugService: SlugService,
    private readonly dynamicFormDBValidatorService: DynamicFormDBValidatorService,
    @InjectRepository(DynamicForm)
    private readonly dynamicFormRepository: Repository<DynamicForm>,
    @InjectRepository(FormField)
    private readonly formFieldRepository: Repository<FormField>,
  ) {}

  async create(createDynamicFormDto: CreateDynamicFormDto, user: User) {
    const { name, description, fields } = createDynamicFormDto;

    await this.dynamicFormDBValidatorService.validateConstraints({
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
      records: records.map(record => new GetDynamicFormsResponse(record))
    }
  }

  async findOne(dynamicForm: DynamicForm) {
    const formFields = await this.formFieldRepository.find({
      where: { dynamicForm: { id: dynamicForm.id } }
    });

    const formFieldsInstances = formFields.map(formField => new GetFormFieldsResponse(formField));

    return new GetDynamicFormResponse({
      ...dynamicForm,
      formFields: formFieldsInstances,
    });
  }

  update(id: number, updateDynamicFormDto: UpdateDynamicFormDto) {
    return `This action updates a #${id} dynamicForm` + updateDynamicFormDto;
  }

  remove(id: number) {
    return `This action removes a #${id} dynamicForm`;
  }

}
