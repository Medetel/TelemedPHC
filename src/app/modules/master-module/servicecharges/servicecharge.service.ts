import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { data } from 'jquery';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicechargeService {

  getservicecharge() {
    throw new Error('Method not implemented.');
  }
  getsericecharge() {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }

  Get_Servicecharge_DD(){
    return this.http.get(`${environment.API_Base_URL}`+`PriceMaster/GetService_DD`)
  }

Get_Servicecharge(){
  return this.http.get(`${environment.API_Base_URL}`+`PriceMaster/GetAllServiceCharges`)
}
Post_AddServicecharge(data){
   return this.http.post(`${environment.API_Base_URL}`+`PriceMaster/InsertServiceCharges`,data)
}
Put_UpdateServicecharge(data){
  return this.http.put(`${environment.API_Base_URL}`+`PriceMaster/UpdateServiceCharges`,data) 
}
Delete_Servicecharge(data){
  return this.http.delete(`${environment.API_Base_URL}`+`PriceMaster/DeleteServiceCharges/${data}`)
}
Get_menu_claims(data) {
  return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
}
Put_ApproveServicecharge(data){
  return this.http.put(`${environment.API_Base_URL}` + `PriceMaster/ApproveServiceCharges`,data)
}
  GetAllTestPackages_PHC() {
  return this.http.get(`${environment.API_Base_URL}` + `PriceMaster/GetAllTestPackages_PHC`)
}
}
