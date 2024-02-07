import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registrado: boolean = false;
  message: string = '';
  loading: boolean = false;

  //CONSTRUCTOR
  constructor(private formBuilder: FormBuilder, private _authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  //ON-INIT
  ngOnInit(): void {
    this.registrado = false;
    this.message = '';
    this.loading = false;
  }

  //ON-SUBMIT
  onSubmit() {
    this.registerForm.markAllAsTouched();
    this.loading = true;
    try {
      this._authService.register(this.registerForm.value).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          this.message = error.message;
          this.loading = false;
        },
        complete: () => {
          this.registerForm.reset();
          this.loading = false;
          this.registrado = true;
        }
      });
    } catch (error: any) {
      throw new HttpErrorResponse(error);
    }
  }

  //HAS ERRORS?
  hasErrors(controlName: string, errorType: string) {
    return this.registerForm.get(controlName)?.touched && this.registerForm.get(controlName)?.hasError(errorType);
  }

  //REDIRECT
  redirect() {
  this.router.navigate(['/login']);
  }
}
