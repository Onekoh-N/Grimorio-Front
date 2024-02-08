import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/pages/login/login.component';
import { RegisterComponent } from './components/auth/pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { OtherHomeComponent } from './components/other-home/other-home.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "home2", component: OtherHomeComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  { path: "**", redirectTo: "home" },
];
