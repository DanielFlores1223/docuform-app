import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth-status.enum';

export const isPublicRouteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if(authService.authStatus() === AuthStatus.authenticated)
    return false;

  return true;
};
