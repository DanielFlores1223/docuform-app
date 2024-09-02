import { Module } from '@nestjs/common';
import { DynamicFormService } from './dynamic-form.service';
import { DynamicFormController } from './dynamic-form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicForm, FormField } from './entities';

@Module({
  imports: [ TypeOrmModule.forFeature([DynamicForm, FormField]) ],
  controllers: [DynamicFormController],
  providers: [DynamicFormService, TypeOrmModule],
})
export class DynamicFormModule {}
