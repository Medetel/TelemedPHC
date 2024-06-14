import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  Get_User() {
    return this.http.get(`${environment.API_Base_URL}` + `User/GetAllUser`)
  }
  Get_Office() {
    return this.http.get(`${environment.API_Base_URL}` + `Offices/Admin/GetOfficeCategory_DD`)
  }
  Get_Role() {
    return this.http.get(`${environment.API_Base_URL}` + `Roles/GetAllRoles`)
  }
  Get_RoleDD() {
    return this.http.get(`${environment.API_Base_URL}` + `Roles/GetAllRoles_DD`)
  }
  post_user(data) {
    return this.http.post(`${environment.API_Base_URL}` + `Authentication/Register`, data)
  }
  put_user(data) {
    return this.http.put(`${environment.API_Base_URL}` + `Authentication/Update`, data)
  }
  Delete_user(data) {
    return this.http.delete(`${environment.API_Base_URL}` + `Authentication/Delete?UserId=${data}`,)
  }
  Active_inactive_user(data) {
    return this.http.get(`${environment.API_Base_URL}` + `Authentication/ActivateInactivate?userid=${data}`)
  }
  post_role(data) {
    return this.http.post(`${environment.API_Base_URL}` + `Roles/Create`, data)
  }
  put_role(data) {
    return this.http.put(`${environment.API_Base_URL}` + `Roles/UpdateRoles`, data)
  }
  Delete_Active_inactive_role(data) {
    return this.http.delete(`${environment.API_Base_URL}` + `Roles/ActivateInactivate?id=${data}`)
  }
  Active_inactive_role(data) {
    return this.http.get(`${environment.API_Base_URL}` + `Roles/ActivateInactivate?roleid=${data}`)
  }
  Change_Password(data) {
    return this.http.put(`${environment.API_Base_URL}` + `Authentication/ChangePassword`, data)
  }
  Get_Roleclamis(data) {
    return this.http.get(`${environment.API_Base_URL}` + `Claims/${data}`)
  }
  saveClaims(roleid, role) {
    return this.http.post(`${environment.API_Base_URL}` + `Claims/${roleid}/assignclaims`, role)
  }
  Get_Hospital() {
    return this.http.get(`${environment.API_Base_URL}` + `Hospital/Admin/GetHospitalCategory_DD`)
  }
  Get_Pharmacy() {
    return this.http.get(`${environment.API_Base_URL}` + `Pharmacy/Admin/GetPharmacyCategory_DD`)
  }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
  Get_Diagnostic() {
    return this.http.get(`${environment.API_Base_URL}` + `DiagnosticCenters/Admin/GetDiagnosticCategory_DD`)
  }
  GetDoctorDetails(data) {
    return this.http.get(`${environment.API_Base_URL}` + `Doctor/GetDoctorDetails?HospitalId=${data}`)
  }

  GetMedicalAssistDetails(data) {
    return this.http.get(`${environment.API_Base_URL}` + `Assistant/GetAssistantDetails?HospitalId=${data}`)
  }
  GetCallagentDetails(data) {
    return this.http.get(`${environment.API_Base_URL}` + `CallCenterAgent/GetSupportAgentDetails?HospitalId=${data}`)
  }
}
