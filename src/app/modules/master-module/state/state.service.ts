import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http:HttpClient) { }
  
  Get_allState(){
     return this.http.get(`${environment.API_Base_URL}`+`State/GetAllState`)
  }
  Post_state(data){
    return this.http.post(`${environment.API_Base_URL}`+`State/InsertState`,data)
  }
  Put_state(data){
    return this.http.put(`${environment.API_Base_URL}`+`State/UpdateState`,data)
  }
  Delete_state(data){
    return this.http.delete(`${environment.API_Base_URL}`+`State/DeleteState?stat_id=${data}`)
  }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
  Get_country(){
    return this.http.get(`${environment.API_Base_URL}`+`Country/GetCountry_DD`)
  }
  Put_Approval(data){
    return this.http.put(`${environment.API_Base_URL}` + `State/ApproveState`,data)
  }
}
