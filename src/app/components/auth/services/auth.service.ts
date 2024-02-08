import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError} from 'rxjs';
import { LoginInterface } from '../Interfaces/login.interface';
import { ResponseInterface } from '../Interfaces/response.interface';
import { httpHandleError } from '../../../Errors/http.errorHandler';
import { environment } from '../../../../environments/environment.development';
import { RegisterInterface } from '../Interfaces/register.interface';
import { UserData } from '../Interfaces/userData.interface';
import { HmacSHA256 } from 'crypto-js';




@Injectable({ providedIn: 'root' })
export class AuthService {
  //Declaraciones
  private baseUrl = environment.API_URL + 'auth';

  //Constructor
  constructor(
    private readonly _httClient: HttpClient) { }

  //login
  public login(formValue: LoginInterface): Observable<ResponseInterface> {
    return this._httClient.post<ResponseInterface>(`${this.baseUrl}/login`, formValue)
    .pipe(catchError(httpHandleError));
  }
  //register
  public register(formValue: RegisterInterface): Observable<ResponseInterface> {
    return this._httClient.post<ResponseInterface>(`${this.baseUrl}/register`, formValue)
    .pipe(catchError(httpHandleError));
  }
  //logout
  public logout(){
    localStorage.clear();

  }
  //Firmar Datos
  public firmarDatos(userData: UserData): string{
    const firma = HmacSHA256(JSON.stringify(userData), environment.SECRET_KEY).toString();
    return firma;
  }

  //Validar Firma
  public validarFirma(userData: string, firma: string): boolean {
    const calculatedFirma = HmacSHA256(userData, environment.SECRET_KEY).toString();
    return calculatedFirma === firma;
  }

}
