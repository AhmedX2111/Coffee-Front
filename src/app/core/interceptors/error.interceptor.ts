import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
          this.notificationService.error('Your session has expired. Please login again.');
        } else if (error.status === 403) {
          this.notificationService.error('You do not have permission to access this resource.');
        } else if (error.status === 404) {
          this.notificationService.error('Resource not found.');
        } else if (error.status === 500) {
          this.notificationService.error('Server error. Please try again later.');
        } else if (error.status === 0) {
          this.notificationService.error('Network error. Please check your connection.');
        } else {
          const errorMessage =
            error.error?.message ||
            error.message ||
            'An error occurred. Please try again.';
          this.notificationService.error(errorMessage);
        }

        return throwError(() => error);
      })
    );
  }
}
