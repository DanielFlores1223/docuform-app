import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FormErrorsDirective } from './directives/form-errors.directive';



@NgModule({
  declarations: [
    SideNavComponent,
    FormErrorsDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    SideNavComponent,
    FormErrorsDirective
  ]
})
export class SharedModule { }
