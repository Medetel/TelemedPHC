
import { ErrorInterceptor } from '../../../app/core/Interceptor/errorInterceptor';
import { httpInterceptor } from '../../../app/core/Interceptor/httpInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true },
];