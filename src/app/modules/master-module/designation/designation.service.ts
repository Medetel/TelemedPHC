import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private http:HttpClient) { }
  Get_designation(){
    return this.http.get(`${environment.API_Base_URL}`+`Designation/GetAllDesignation`)
  }
  Post_designation(data){
    return this.http.post(`${environment.API_Base_URL}`+`Designation/InsertDesignation`,data)
  }
  Put_designation(data){
    return this.http.put(`${environment.API_Base_URL}`+`Designation/UpdateDesignation`,data)
  }
  Delete_designation(data){
    return this.http.delete(`${environment.API_Base_URL}`+`Designation/DeleteDesignation?designation_id=${data}`)
  }
  Put_Approval(data){
    return this.http.put(`${environment.API_Base_URL}` + `Designation/ApproveDesignation`,data)
  }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
}
