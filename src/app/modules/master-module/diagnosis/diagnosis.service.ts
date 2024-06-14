import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {
  constructor(private http: HttpClient) { }

  Post_diagnosis(data) {
    return this.http.post(`${environment.API_Base_URL}` + `DiagnosticsDescription/InsertDiagnostic_Description`, data)
  }
  Put_diagnosis(data) {
    return this.http.put(`${environment.API_Base_URL}` + `DiagnosticsDescription/UpdateDiagnostic_Description`, data)
  }
  Delete_diagnosis(data) {
    return this.http.delete(`${environment.API_Base_URL}` + `DiagnosticsDescription/DeleteDiagnostic_Description?dD_Id=${data}`)
  }
  Put_diagnosisApproval(data) {
    return this.http.put(`${environment.API_Base_URL}` + `DiagnosticsDescription/ApproveDiagnostic_Description`, data)
  }
  GetAll_diagnosis() {
    return this.http.get(`${environment.API_Base_URL}` + `DiagnosticsDescription/GetAllDiagnostic_Description`)
  }
  Get_diagnosis_Catdd() {
    return this.http.get(`${environment.API_Base_URL}` + `DiagnosticsDescription/GetDiagnosticsMaster_DD`)
  }

  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
}
