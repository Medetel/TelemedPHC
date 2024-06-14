import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private UserData = new BehaviorSubject<any>('');
  private UserImage = new BehaviorSubject<any>('');
  currentUserData = this.UserData.asObservable();
  currentUserImage = this.UserImage.asObservable();
  httpOptions: any;
  constructor(private http: HttpClient) {
    let accesstoken = localStorage.getItem('accessToken');
    if (accesstoken != null && accesstoken != '' && typeof (accesstoken) != undefined) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accesstoken,
          'No-Auth': 'True'
        })
      };
    }
  }

  Get_Userprofile(){
    return this.http.get(`${environment.API_Base_URL}` +`Authentication/GetUserByname`)
  }
  update_profile(data){
    return this.http.put(`${environment.API_Base_URL}` +`Authentication/UpdateUserProfile`,data)
  }
  changeUserImage(image: any) {
    
    this.UserImage.next(image)
  }
  // Post_login(username: string) {
  //   return this.http.post(`${environment.API_Base_URL}` + `Authentication/Login`, username)
  // }
  Post_login(data: { username: string }) {
    const params = new HttpParams().set('username', data.username);
    return this.http.post(`${environment.API_Base_URL}Authentication/Login`, null, { params });
  }

}
