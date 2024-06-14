import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GramService {

  constructor(private http:HttpClient) { }
  Get_Gram(){
    return this.http.get(`${environment.API_Base_URL}`+`Gram/GetAllGram`)
  }
  Get_state_f(){
    return this.http.get(`${environment.API_Base_URL}`+`State/GetAllState`)
  }
  Get_alldistrict(){
    return this.http.get(`${environment.API_Base_URL}`+`District/GetAllDistrict`)
  }
  Get_allTaluk(){
    return this.http.get(`${environment.API_Base_URL}`+`Taluk/GetAllTaluk`)
  }
  Post_Gram(data){
    return this.http.post(`${environment.API_Base_URL}`+`Gram/InsertGram`,data)
  }
  Put_Gram(data){
    return this.http.put(`${environment.API_Base_URL}`+`Gram/UpdateGram`,data)
  }
  Delete_gram(id){
    return this.http.delete(`${environment.API_Base_URL}`+`Gram/DeleteGram?Gram_id=${id}`)
  }
  Get_State(id){
    return this.http.get(`${environment.API_Base_URL}`+`State/GetState_DD?cntry_id=${id}`)
  }
  Get_District(id){
    return this.http.get(`${environment.API_Base_URL}`+`District/GetDistrict_DD?stat_id=${id}`)
  }
  Get_Taluk(id){
    return this.http.get(`${environment.API_Base_URL}`+`Taluk/GetTaluk_DD?district_id=${id}`)
  }
  Get_country(){
    return this.http.get(`${environment.API_Base_URL}`+`Country/GetCountry_DD`)
  }
  Put_Approval(data){
    return this.http.put(`${environment.API_Base_URL}` + `Gram/ApproveGram`,data)
  }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
}
