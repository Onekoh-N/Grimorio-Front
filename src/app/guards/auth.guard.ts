import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../components/auth/services/auth.service';

export const AuthGuard: CanActivateFn = (route, state): boolean => {
  const router = inject(Router);
  const _authService = inject(AuthService);
  const firma = localStorage.getItem('firma') || '{}';
  const userData = localStorage.getItem('userData') || '{}';
  if (_authService.validarFirma(userData, firma)){
    return true;
  }else{
    localStorage.clear();
    router.navigate(['/login']);
    return false;
  }
};
