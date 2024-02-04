import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private _authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    try {
      this._authService.register(this.registerForm.value).subscribe((user) => {
        console.log(user);
      });
    } catch (error: any) {
      throw new HttpErrorResponse(error);
    }
  }

  hasErrors(controlName: string, errorType: string) {
    return this.registerForm.get(controlName)?.touched && this.registerForm.get(controlName)?.hasError(errorType);
  }

}
