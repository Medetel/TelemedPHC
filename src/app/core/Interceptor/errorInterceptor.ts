import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs'
import { UserService } from '../../views/pages/auth/UserDetails/user.service';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';
import { Notification } from '../Notifications/Notification';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: UserService, private router: Router, private Notify: Notification) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {       
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {                  
                    if (error.status == 400 && error.error.error_description !=undefined ) {
                        this.Notify.errorsmsg(error.error.error_description);
                    }
                    else if (error.status == 400 && error.error != undefined) {                       
                       
                        //this.Notify.errorsmsg(error.error);
                        if (error.error.message != undefined) {
                            this.Notify.errorsmsg(error.error.message);
                        }
                        else if (error.error != undefined) {
                            this.Notify.errorsmsg(error.error);
                        }
                        else
                            this.Notify.errorsmsg(error.error.message);
                    }
                    else if (error.status == 400) {                      
                        this.Notify.errorsmsg("Duplicate value are not allowed");
                    }
                    else if (error.status == 404) {                       
                        this.Notify.errorsmsg("Data not found");
                    }
                    else if (error.status == 404 && error.error==undefined) {                       
                        this.Notify.errorsmsg("Data not found");
                    }
                    else if (error.status == 405) {
                        this.Notify.errorsmsg("The requested URL couldn't be found or that it was entered incorrectly");
                    }
                    else if (error.status == 500) {
                        this.Notify.errorsmsg("Please contact: enquiry@vikasglobal.net");
                    }
                    else if (error.status == 401) {
                        this.Notify.errorsmsg("Session Expired! Please login again")
                         this.authenticationService.logout();
                         this.router.navigate(['/auth/login']);
                    }                   
                    
                    return throwError(error.error)
                })
            );

    }
}