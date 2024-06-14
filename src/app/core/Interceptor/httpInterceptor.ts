import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class httpInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {
        let tokenInfo = localStorage.getItem('access_token');
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${tokenInfo}`
                }
            });
        return newRequest.handle(request);       
    }
}