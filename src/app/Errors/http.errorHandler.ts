import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export function httpHandleError(error: HttpErrorResponse) {
  let errorMessage = '';
  //Verificamos si el error es por parte del cliente o del servidor
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    console.log("error del lado del cliente");
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    console.log("error del lado del server");
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(() => error.error);
}
