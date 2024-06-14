import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(private http:HttpClient) { }
  Get_country(){
    return this.http.get(`${environment.API_Base_URL}`+`Country/GetCountry_DD`)
  }
  Get_State(id){
    return this.http.get(`${environment.API_Base_URL}`+`State/GetState_DD?cntry_id=${id}`)
  }
  Get_alldistrict(){
    return this.http.get(`${environment.API_Base_URL}`+`District/GetAllDistrict`)
  }
  Post_district(data){
    return this.http.post(`${environment.API_Base_URL}`+`District/InsertDistrict`,data)
  }
  Put_district(data){
    return this.http.put(`${environment.API_Base_URL}`+`District/UpdateDistrict`,data)
  }
  Delete_district(data){
    return this.http.delete(`${environment.API_Base_URL}`+`District/DeleteDistrict?district_id=${data}`)
  }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
  Put_Approval(data){
    return this.http.put(`${environment.API_Base_URL}` + `District/ApproveDistrict`,data)
  }
}
