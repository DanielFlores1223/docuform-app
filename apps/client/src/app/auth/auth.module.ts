import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { MaterialModule } from '../material/material.module';
import { LogoHeaderComponent } from './components/logo-header/logo-header.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginPageComponent,
    SignupPageComponent,
    LogoHeaderComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule
  ],
  providers: [
    provideHttpClient()
  ]
})
export class AuthModule { }
