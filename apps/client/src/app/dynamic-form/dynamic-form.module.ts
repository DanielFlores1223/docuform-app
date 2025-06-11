import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { DynamicFormLayoutComponent } from './layouts/dynamic-form-layout/dynamic-form-layout.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { PreviewComponent } from './components/preview/preview.component';
import { FormSaveComponent } from './components/form-save/form-save.component';
import { FieldsCardsComponent } from './components/fields-cards/fields-cards.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormItemCardComponent } from './components/dynamic-form-item-card/dynamic-form-item-card.component';

@NgModule({
  declarations: [
    DynamicFormLayoutComponent,
    CreatePageComponent,
    ListPageComponent,
    PreviewComponent,
    FormSaveComponent,
    FieldsCardsComponent,
    DynamicFormItemCardComponent,
  ],
  imports: [
    CommonModule,
    DynamicFormRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
})
export class DynamicFormModule {}
