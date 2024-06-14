import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from './user.profile';
import { IProfile } from './user.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { MenuItem } from 'src/app/views/layout/sidebar/menu.model';
import { tap } from 'rxjs/internal/operators/tap';
@Injectable()
export class UserService {
    redirectUrl: string;
    errorMessage: string;
    httpOptions: any;
    constructor(private http: HttpClient,private authProfile: UserProfile) {

      let accesstoken = localStorage.getItem('access_token');
      if (accesstoken != null && accesstoken != '' && typeof (accesstoken) != undefined) {
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer' + accesstoken,
            'No-Auth': 'True'
          })
        };
      }
      
    }
    menu_method() {
      return this.http.get<MenuItem []>(`${environment.API_Base_URL}`+`Claims/Testuser1`);
    }
    isAuthenticated() {
       
    }
    isAuthorized() {
        let profile = this.authProfile.getProfile();
        var validToken = profile.access_token != "" && profile.access_token != null;
       var isTokenExpired = this.isTokenExpired(profile);
        return validToken //&& !isTokenExpired;
    }
    isTokenExpired(profile: IProfile) {
        var expiration = new Date(profile.expires_in)
        return expiration < new Date();
    }
    Post_Patient_register(data){
      return this.http.post(`${environment.API_Base_URL}`+`Authentication/ExternalRegister`,data)
    }    

    logout(): void {     
      this.authProfile.resetProfile();
    }
    logoutonce(userid: any) {
    return this.http.get(`${environment.API_Base_URL}` + `Authentication/Logout?userid=${userid}`)
    }
   
      
}