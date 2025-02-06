import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';

export const interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
