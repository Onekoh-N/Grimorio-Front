import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/pages/login/login.component';
import { RegisterComponent } from './components/auth/pages/register/register.component';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent},
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },

  { path: "**", redirectTo: "home" },
];
