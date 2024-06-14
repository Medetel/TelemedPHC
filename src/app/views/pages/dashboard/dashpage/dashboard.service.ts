import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  Get_Dashboard_Data(){
    return this.http.get(`${environment.API_Base_URL}` + `DashBoard_Count/GetDashboardData`)
  }
   
}
