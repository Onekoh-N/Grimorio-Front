import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginInterface } from '../Interfaces/login.interface';
import { ResponseInterface } from '../Interfaces/response.interface';
import { httpHandleError } from '../../../Errors/http.errorHandler';
import { environment } from '../../../../environments/environment.development';
import { RegisterInterface } from '../Interfaces/register.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environment.API_URL + 'auth';
  constructor(private _httClient: HttpClient) { }

  public login(formValue: LoginInterface): Observable<ResponseInterface> {
    return this._httClient.post<ResponseInterface>(`${this.baseUrl}/login`, formValue)
      .pipe(catchError(httpHandleError));
  }

  public register(formValue: RegisterInterface): Observable<ResponseInterface> {
    return this._httClient.post<ResponseInterface>(`${this.baseUrl}/register`, formValue)
    .pipe(catchError(httpHandleError));
  }

}
