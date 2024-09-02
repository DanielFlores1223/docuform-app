import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DynamicFormService } from './dynamic-form.service';
import { CreateDynamicFormDto } from './dto/create-dynamic-form.dto';
import { UpdateDynamicFormDto } from './dto/update-dynamic-form.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiRestEndpointDescription, ApiRestResponse } from 'src/common/decorators';

@Controller('dynamic-form')
@ApiTags('dynamic-form')
export class DynamicFormController {
  constructor(private readonly dynamicFormService: DynamicFormService) {}

  @Post()
  @ApiBearerAuth()
  @ApiRestEndpointDescription({
    summary: 'Create an user and authenticate them',
    bodyInterface: 'IRegisterUserPayload',
    responseInterface: 'IApiResponse<TokenResponse>'
  })
  @ApiRestResponse({
    description: 'Welcome to docuform'
  })
  create(@Body() createDynamicFormDto: CreateDynamicFormDto) {
    return this.dynamicFormService.create(createDynamicFormDto);
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
