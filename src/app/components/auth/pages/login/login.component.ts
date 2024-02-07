import { Component,  } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loading: boolean = false;
  message: string = '';
  loginForm: FormGroup;

  constructor(private _authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm =  this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  onSubmit() {
    this.loginForm.markAllAsTouched();
    this.loading = true;
    if (this.loginForm.valid){
      this._authService.login(this.loginForm.value).subscribe({
        next: (data) => {
          localStorage.setItem('token', JSON.stringify(data.token));
          localStorage.setItem('user', JSON.stringify(data.userData));
        },
        error: (error) => {
          if(error.statusCode == 401) {
            this.message = error.message;
          }
          this.loading = false;
        },
        complete: () => {
          this.loginForm.reset();
          this.router.navigate(['/home']);
          this.loading = false;
        }
      });}
  }

  hasErrors(controlName: string, errorType: string) {
    return this.loginForm.get(controlName)?.touched && this.loginForm.get(controlName)?.hasError(errorType);
  }

  register() {
    this.router.navigate(['/register']);
  }
}


