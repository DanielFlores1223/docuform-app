import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { DynamicFormLayoutComponent } from './layouts/dynamic-form-layout/dynamic-form-layout.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DynamicFormLayoutComponent,
    CreatePageComponent,
    ListPageComponent,
  ],
  imports: [
    CommonModule,
    DynamicFormRoutingModule,
    MaterialModule,
    SharedModule
  ],
})
export class DynamicFormModule {}
