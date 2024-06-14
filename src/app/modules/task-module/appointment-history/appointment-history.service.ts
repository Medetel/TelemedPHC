import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentHistoryService {

  constructor(private http:HttpClient) { }
  
  GetAppointmentHistory(){
    return this.http.get(`${environment.API_Base_URL}`+`Appointment/Admin/GetAppointmentHistory`)
  }

}
