import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedirectUrlService {

  constructor(private http: HttpClient) { }  
  Callback_PayReq(data:any) {
    return this.http.post(`${environment.API_Base_URL}` + `Payment/CallbackPayReq`, data)
  }
}
