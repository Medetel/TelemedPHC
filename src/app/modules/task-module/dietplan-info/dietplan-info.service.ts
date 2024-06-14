import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DietplanInfoService {

  constructor(private http: HttpClient) { }

  getall_dietplan() {
    return this.http.get(`${environment.API_Base_URL}` + `DietPlan/GetAllDietPlan_Info`)
  }
  GetbyId_dietplan(id) {
    return this.http.get(`${environment.API_Base_URL}` + `DietPlan/GetByIdDietPlan_info?Cons_Id=${id}`)
  }
}
