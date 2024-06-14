import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentPhcHistoryService {

  constructor(private http:HttpClient) { }

  GetAppointmentPHCHistory(){
    return this.http.get(`${environment.API_Base_URL}`+`PHC_Appointment/GetPHCAppointmentHistory`)
  }
}
