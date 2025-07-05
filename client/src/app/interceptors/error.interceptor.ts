import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { PlantError } from '../interfaces/error';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';
      
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Network Error: ${error.error.message}`;
      } else {
        errorMessage = error.error?.message || `Server Error: ${error.status}`;
      }

      const plantError = new PlantError(
        errorMessage,
        error.status,
        error.error?.code,
        error.error
      );

      console.error('HTTP Error:', plantError);

      return throwError(() => plantError);
    })
  );
};
