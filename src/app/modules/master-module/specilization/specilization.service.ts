import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecilizationService {

  constructor(private http:HttpClient) { }
  Get_specilization(){
    return this.http.get(`${environment.API_Base_URL}`+`Specialization/GetAllSpecialization`)
  }
  Get_specilizationdd() {
    return this.http.get(`${environment.API_Base_URL}` + `Specialization/GetSpecializationCategory_DD`)
  }
  Post_specilization(data){
    return this.http.post(`${environment.API_Base_URL}`+`Specialization/InsertSpecialization`,data)
  }
  Put_specilization(data){
    return this.http.put(`${environment.API_Base_URL}`+`Specialization/UpdateSpecialization`,data)
  }
  Delete_specilization(data){
    return this.http.delete(`${environment.API_Base_URL}`+`Specialization/DeleteSpecialization?SP_Id=${data}`)
  }
  Put_Approval(data){
    return this.http.put(`${environment.API_Base_URL}` + `Specialization/ApproveSpecialization`,data)
  }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
}
