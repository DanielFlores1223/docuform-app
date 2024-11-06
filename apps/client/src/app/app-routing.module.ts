import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard, isPublicRouteGuard } from './auth/guards';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isPublicRouteGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'my-forms',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () =>
      import('./dynamic-form/dynamic-form.module').then(
        (m) => m.DynamicFormModule,
      ),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
