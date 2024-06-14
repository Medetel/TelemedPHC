import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TalukService {

  constructor(private http:HttpClient) { }
  Get_Taluk(){
    return this.http.get(`${environment.API_Base_URL}`+`Taluk/GetAllTaluk`)
  }
  Get_distict(){
    return this.http.get(`${environment.API_Base_URL}`+`Taluk/GetAllTaluk`)
  }
  Post_Taluk(data){
    return this.http.post(`${environment.API_Base_URL}`+`Taluk/InsertTaluk`,data)
  }
  Put_Taluk(data){
    return this.http.put(`${environment.API_Base_URL}`+`Taluk/UpdateTaluk`,data)
  }
  Delete_Taluk(id){
    return this.http.delete(`${environment.API_Base_URL}`+`Taluk/DeleteTaluk?Taluk_id=${id}`)
  }
  Get_State(id){
    return this.http.get(`${environment.API_Base_URL}`+`State/GetState_DD?cntry_id=${id}`)
  }
  Get_District(id){
    return this.http.get(`${environment.API_Base_URL}`+`District/GetDistrict_DD?stat_id=${id}`)
  }
  Get_country(){
    return this.http.get(`${environment.API_Base_URL}`+`Country/GetCountry_DD`)
  }
  Get_state_f(){
    return this.http.get(`${environment.API_Base_URL}`+`State/GetAllState`)
  }
  Get_alldistrict(){
    return this.http.get(`${environment.API_Base_URL}`+`District/GetAllDistrict`)
  }
  Put_Approval(data){
    return this.http.put(`${environment.API_Base_URL}` + `Taluk/ApproveTaluk`,data)
  }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
}
