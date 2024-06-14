import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http:HttpClient) { }

  Get_hospital(){
    return this.http.get(`${environment.API_Base_URL}`+`Hospital/GetAllHospital`)
  }
  Get_branch_id(id){
    return this.http.get(`${environment.API_Base_URL}`+`Hospital/Admin/GetNetworkHospital_DD?NE_Id=${id}`)
  }
  Get_hospital_dd(){
    return this.http.get(`${environment.API_Base_URL}`+`Hospital/Admin/GetHospital_DD`) 
  }
  Get_hospital_type(){
    return this.http.get(`${environment.API_Base_URL}`+`Hos_Type/GetHos_Type_DD`)
  }
  Post_hospital(data){
    return this.http.post(`${environment.API_Base_URL}`+`Hospital/Admin/InsertHospital`,data)
  }
  Put_hospital(data){
    return this.http.put(`${environment.API_Base_URL}`+`Hospital/Admin/UpdateHospital`,data)
  }
  Delete_hospital(data){
    return this.http.delete(`${environment.API_Base_URL}`+`Hospital/DeleteHospital?Hos_Id=${data}`)
  }
  Get_network(){
    return this.http.get(`${environment.API_Base_URL}`+`Network/GetNetwork_DD`)
  }
  Get_branch(){
    return this.http.get(`${environment.API_Base_URL}`+`Hospital/Admin/GetPrimaryHospitalDD`)
  }
  Get_state(){
    return this.http.get(`${environment.API_Base_URL}`+`State/GetState_DD`)
  }
  Get_district(){
    return this.http.get(`${environment.API_Base_URL}`+`District/GetDistrict_DD`)
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
  Get_Gram_id(id){
    return this.http.get(`${environment.API_Base_URL}`+`Gram/GetGram_DD?Taluk_id=${id}`)
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
  Get_allTaluk(){
    return this.http.get(`${environment.API_Base_URL}`+`Taluk/GetAllTaluk`)
  }
  Get_allgram(){
    return this.http.get(`${environment.API_Base_URL}`+`Gram/GetAllGram`)
  }
  Get_Catagory(){
    return this.http.get(`${environment.API_Base_URL}`+`Category/GetAllCategory`)
  }
  Put_Approval(data){
    return this.http.put(`${environment.API_Base_URL}` + `Hospital/ApproveHospital`,data)
  }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
}
