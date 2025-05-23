import { Module } from '@nestjs/common';
import { DynamicFormService } from './dynamic-form.service';
import { DynamicFormController } from './dynamic-form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicForm, FieldType, FormField } from './entities';
import { SlugService } from 'src/common/services';
import { OwnerDynamicFormGuard } from './guards/';
import { DynamicFormDBValidatorService } from './services'

@Module({
  imports: [ TypeOrmModule.forFeature([DynamicForm, FormField, FieldType]) ],
  controllers: [DynamicFormController],
  providers: [
    DynamicFormService, 
    TypeOrmModule, 
    SlugService, 
    OwnerDynamicFormGuard, 
    DynamicFormDBValidatorService
  ],
})
export class DynamicFormModule {}
