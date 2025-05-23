import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DynamicFormService } from './dynamic-form.service';
import { CreateDynamicFormDto } from './dto/create-dynamic-form.dto';
import { UpdateDynamicFormDto } from './dto/update-dynamic-form.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiRestEndpointDescription, ApiRestResponse } from 'src/common/decorators';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities';
import { ResponseController } from 'src/common/interfaces';
import { IGetDynamicFormResponse, IGetDynamicFormsResponse, IPaginationResponse } from 'global-interfaces';
import { FindAllDynamicFormDto } from './dto';
import { GetDynamicFormsResponse } from 'src/dynamic-form/responses/get-dynanic-forms.response';
import { PaginationResponse } from 'src/common/responses';
import { OwnerDynamicFormGuard } from './guards/';
import { GetDynamicForm } from './decorators';
import { DynamicForm } from './entities';
import { GetDynamicFormResponse } from 'src/dynamic-form/responses/get-dynamic-form.respose';

@Controller('dynamic-form')
@ApiTags('dynamic-form')
export class DynamicFormController {
  constructor(private readonly dynamicFormService: DynamicFormService) {}
  
  @Auth()
  @Post()
  @ApiBearerAuth()
  @ApiRestEndpointDescription({
    summary: 'Create a dynamic form by user',
    bodyInterface: 'ICreateDynamicFormPayload',
    responseInterface: 'IApiResponse'
  })
  @ApiRestResponse({
    description: 'Form was saved!'
  })
  async create(
    @Body() createDynamicFormDto: CreateDynamicFormDto,
    @GetUser() user: User
  ): Promise<ResponseController<null>> {
    await this.dynamicFormService.create(createDynamicFormDto, user);

    return {
      message: 'Form was saved!',
      result: null
    }
  }

  @Auth()
  @Get()
  @ApiBearerAuth()
  @ApiRestEndpointDescription({
    summary: 'Get all dynamic form by user',
    bodyInterface: '',
    responseInterface: 'PaginationResponse<GetDynamicFormsResponse>'
  })
  @ApiRestResponse({
    description: 'Ok',
    pagination: true,
    genericType: GetDynamicFormsResponse,
  })
  async findAll(
    @GetUser() user: User,
    @Query() params: FindAllDynamicFormDto,
  ): Promise<ResponseController<IPaginationResponse<IGetDynamicFormsResponse>>> {
    const { total, records } = await this.dynamicFormService.findAll(params, user);

    return {
      message: 'success',
      result: {
        total,
        records
      }
    }
  }

  @Auth({ extraGuards: [OwnerDynamicFormGuard] })
  @Get(':slug')
  @ApiBearerAuth()
  @ApiRestEndpointDescription({
    summary: 'Get a dynamic form by slug, only owner can get own entities',
    bodyInterface: '',
    responseInterface: 'IGetDynamicFormResponse'
  })
  @ApiRestResponse({
    description: 'Ok',
    pagination: true,
    genericType: GetDynamicFormResponse,
  })
  async findOne(
    @GetDynamicForm() idDynamicForm: DynamicForm,
    @Param('slug') _: string,
  ): Promise<ResponseController<IGetDynamicFormResponse>> {
    const result = await this.dynamicFormService.findOne(idDynamicForm);

    return {
      message: 'Ok',
      result
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDynamicFormDto: UpdateDynamicFormDto) {
    return this.dynamicFormService.update(+id, updateDynamicFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dynamicFormService.remove(+id);
  }
}
