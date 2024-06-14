import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(private http:HttpClient) { }

  Get_pharmacy(){
    return this.http.get(`${environment.API_Base_URL}`+`Pharmacy/GetAllPharmacy`)
  }

  Get_pharmacy_dd(){
    return this.http.get(`${environment.API_Base_URL}`+`Pharmacy/Admin/GetPharmacy_DD`) 
  }
  
  Post_pharmacy(data){
    return this.http.post(`${environment.API_Base_URL}`+`Pharmacy/Admin/InsertPharmacy`,data)
  }

  Put_pharmacy(data){
    return this.http.put(`${environment.API_Base_URL}`+`Pharmacy/Admin/UpdatePharmacy`,data)
  }

  Delete_pharmacy(data){
    return this.http.delete(`${environment.API_Base_URL}`+`Pharmacy/DeletePharmacy?Ph_Id=${data}`)
  }

  Get_network(){
    return this.http.get(`${environment.API_Base_URL}`+`Network/GetNetwork_DD`)
  }
  Get_branch(){
    return this.http.get(`${environment.API_Base_URL}`+`Pharmacy/Admin/GetPrimaryPharmacyDD`)
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
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
  Get_Pharmacy_type(){
    return this.http.get(`${environment.API_Base_URL}`+`PharmacyType/GetPharmacyType_DD`)
  }
  Get_Pharmacy_cate(){
    return this.http.get(`${environment.API_Base_URL}` +`PharmacyCategory/GetPharmacyCategory_DD`)
  }

}
