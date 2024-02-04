import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './components/auth/pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/pages/login/login.component';
import { NavBarComponent } from './components/Nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    NavBarComponent,
    RegisterComponent,
    ReactiveFormsModule,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Grimorio';
}
