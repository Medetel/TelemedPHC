import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecialistDoctorService {

  constructor(private http: HttpClient) { }

  Post_specialistdoc(data) {
    return this.http.post(`${environment.API_Base_URL}` + `SpecilistDoctor/InsertSpecilistDoctor`, data)
  }
  Put_specialistdoc(data) {
    return this.http.put(`${environment.API_Base_URL}` + `SpecilistDoctor/UpdateSpecilistDoctor`, data)
  }
  Delete_specialistdoc(data) {
    return this.http.delete(`${environment.API_Base_URL}` + `SpecilistDoctor/DeleteSpecilistDoctor?SD_Id=${data}`)
  }
  Put_specialistdocApproval(data) {
    return this.http.put(`${environment.API_Base_URL}` + `SpecilistDoctor/ApproveSpecilistDoctor`, data)
  }
  GetAll_specialistdoc() {
    return this.http.get(`${environment.API_Base_URL}` + `SpecilistDoctor/GetAllSpecilistDoctor`)
  }

  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
}
