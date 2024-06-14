import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DailyReportService {

  constructor(private http: HttpClient) { }
  GetDailyReport(reportType: any, selectedDate: any) {
    return this.http.get(`${environment.API_Base_URL}` + `DashBoard_Count/GetDailyReport?reportType=${reportType}&selectedDate=${selectedDate}`)
  }
  Get_Userprofile() {
    return this.http.get(`${environment.API_Base_URL}` + `Authentication/GetUserByname`)
  }
}
