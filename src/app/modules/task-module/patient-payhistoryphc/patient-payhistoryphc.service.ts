import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientPayhistoryphcService {
  httpOptions: any;

  constructor(private http: HttpClient) {
    // let accesstoken = localStorage.getItem('accessToken');
    // if (accesstoken != null && accesstoken != '' && typeof (accesstoken) != undefined) {
    //   this.httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Bearer ' + accesstoken,
    //       'No-Auth': 'True'
    //     })
    //   };
    // }
   }
  patientpayhistory() {
    return this.http.get(`${environment.API_Base_URL}` + `Payment/PaymentHistoryCCAve_PHC`)

  }
}
