import { Injectable } from '@nestjs/common';
import { CreateDynamicFormDto } from './dto/create-dynamic-form.dto';
import { UpdateDynamicFormDto } from './dto/update-dynamic-form.dto';

@Injectable()
export class DynamicFormService {
  create(createDynamicFormDto: CreateDynamicFormDto) {
    return 'This action adds a new dynamicForm ' + createDynamicFormDto;
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
}
