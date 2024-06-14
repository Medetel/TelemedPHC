import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiagnostictestService {

  constructor(private http:HttpClient) { }

  Get_Diagnostic_typedd(){
    return this.http.get(`${environment.API_Base_URL}`+`DiagnosticType/GetDiagnosticType_DD`)
  }

  Get_Categorydd(id){
    return this.http.get(`${environment.API_Base_URL}`+`DiagnoCategory/GetDiagnoCategory_DD?Type_Id=${id}`)
  }

  Post_Diagnostictst(data){
    return this.http.post(`${environment.API_Base_URL}`+`Diagnostic_Test/InsertDiagnostic_Test`,data)
  }

 Get_Diagnosticttstall(){
  return this.http.get(`${environment.API_Base_URL}`+`Diagnostic_Test/GetAllDiagnostic_Test`)
 }

 Get_categoryall(){
  return this.http.get(`${environment.API_Base_URL}`+`DiagnoCategory/GetAllDiagnoCategory`)
 }

 Put_Diagnostic(data){
  return this.http.put(`${environment.API_Base_URL}` + `Diagnostic_Test/UpdateDiagnostic_Test`, data)
 }

 Delete_diagnostictst(data){
  return this.http.delete(`${environment.API_Base_URL}` + `Diagnostic_Test/DeleteDiagnostic_Test?DT_Id=${data}`)
 }

 Approve_diagnotest(data){
  return this.http.put(`${environment.API_Base_URL}` + `Diagnostic_Test/ApproveDiagnostic_Test`, data)
 }

 Get_menu_claims(data) {
  return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
}
 
}
