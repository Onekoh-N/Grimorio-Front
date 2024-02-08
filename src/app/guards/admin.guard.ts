import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserData } from '../components/auth/Interfaces/userData.interface';

export const AdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userData: UserData = JSON.parse(localStorage.getItem('userData') || '{}');
  if(userData.rol !== 'admin'){
    router.navigate(['/home']);
    return false;
  }
  return true;
};
