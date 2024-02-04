import { Component,  } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  message: string = '';
  loginForm: FormGroup;

  constructor(private _authService: AuthService, private formBuilder: FormBuilder) {
    this.loginForm =  this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid){
      this._authService.login(this.loginForm.value).subscribe({
        next: (data) => {
          console.log(data);
          localStorage.setItem('token', data.token);
        },
        error: (error) => {
          if(error.statusCode === 401){
            this.message = 'Credenciales Invalidas';
          }else{
            this.message = 'Error en el servidor';
            console.log(error);
          }
        },
        complete: () => {
          this.message = 'Login exitoso';
        }
      });}
  }

  hasErrors(controlName: string, errorType: string) {
    return this.loginForm.get(controlName)?.touched && this.loginForm.get(controlName)?.hasError(errorType);
  }

}
