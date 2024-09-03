import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DynamicFormService } from './dynamic-form.service';
import { CreateDynamicFormDto } from './dto/create-dynamic-form.dto';
import { UpdateDynamicFormDto } from './dto/update-dynamic-form.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiRestEndpointDescription, ApiRestResponse } from 'src/common/decorators';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/entities';
import { ResponseController } from 'src/common/interfaces';

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

  @Get()
  findAll() {
    return this.dynamicFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dynamicFormService.findOne(+id);
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
