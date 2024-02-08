import { Component,  } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserData } from '../../Interfaces/userData.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //VARIABLES
  loading: boolean = false;
  message: string = '';
  loginForm: FormGroup;
  firmaVerificada: boolean = false;
  //CONSTRUCTOR
  constructor(private _authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm =  this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  //ON SUBMIT
  onSubmit() {
    this.loginForm.markAllAsTouched();
    this.loading = true;
    if (this.loginForm.valid){
      this._authService.login(this.loginForm.value).subscribe({
        next: (data) => {
          if(data.token && data.userData){
            localStorage.setItem('token', data.token);
            const firma: string = this._authService.firmarDatos(data.userData);
            localStorage.setItem('userData', JSON.stringify(data.userData));
            localStorage.setItem('firma', firma);
          } else {
            this.message = data.message;
          }
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

  //VALIDATORS
  hasErrors(controlName: string, errorType: string) {
    return this.loginForm.get(controlName)?.touched && this.loginForm.get(controlName)?.hasError(errorType);
  }

  //REDIRECT
  register() {
    this.router.navigate(['/register']);
  }

}


