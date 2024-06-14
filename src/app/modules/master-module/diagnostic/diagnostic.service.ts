import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {

  constructor(private http: HttpClient) { }
  Get_branch_id(id) {
    return this.http.get(`${environment.API_Base_URL}` + `DiagnosticCenters/Admin/GetDiagnosticCentersById?DGSTC_Id=${id}`)
  }
  Get_diagnostic() {
    return this.http.get(`${environment.API_Base_URL}` + `DiagnosticCenters/GetAllDiagnosticCenters`)
  }

  Post_diagnostic(data) {
    return this.http.post(`${environment.API_Base_URL}` + `DiagnosticCenters/Admin/InsertDiagnosticCenters`, data)
  }

  Get_diagnostic_dd() {
    return this.http.get(`${environment.API_Base_URL}` + `DiagnosticCenters/Admin/GetDiagnosticCenters_DD`)
  }

  Get_diagnostic_type() {
    return this.http.get(`${environment.API_Base_URL}` + `DiagnosticType/GetDiagnosticType_DD`)
  }

  put_diagnostic(data){
    return this.http.put(`${environment.API_Base_URL}`+`DiagnosticCenters/Admin/UpdateDiagnosticCenters`,data)
  }

  Get_Diag_Catagory(){
    return this.http.get(`${environment.API_Base_URL}`+`DiagnoCategory/GetAllDiagnoCategory`)
  }

  Get_network() {
    return this.http.get(`${environment.API_Base_URL}` + `Network/GetNetwork_DD`)
  }

  Get_state() {
    return this.http.get(`${environment.API_Base_URL}` + `State/GetState_DD`)
  }
  Get_district() {
    return this.http.get(`${environment.API_Base_URL}` + `District/GetDistrict_DD`)
  }
  Get_State(id) {
    return this.http.get(`${environment.API_Base_URL}` + `State/GetState_DD?cntry_id=${id}`)
  }
  Get_District(id) {
    return this.http.get(`${environment.API_Base_URL}` + `District/GetDistrict_DD?stat_id=${id}`)
  }
  Get_Taluk(id) {
    return this.http.get(`${environment.API_Base_URL}` + `Taluk/GetTaluk_DD?district_id=${id}`)
  }
  Get_Gram_id(id) {
    return this.http.get(`${environment.API_Base_URL}` + `Gram/GetGram_DD?Taluk_id=${id}`)
  }
  Get_country() {
    return this.http.get(`${environment.API_Base_URL}` + `Country/GetCountry_DD`)
  }
  Get_state_f() {
    return this.http.get(`${environment.API_Base_URL}` + `State/GetAllState`)
  }
  Get_alldistrict() {
    return this.http.get(`${environment.API_Base_URL}` + `District/GetAllDistrict`)
  }
  Get_allTaluk() {
    return this.http.get(`${environment.API_Base_URL}` + `Taluk/GetAllTaluk`)
  }
  Get_allgram() {
    return this.http.get(`${environment.API_Base_URL}` + `Gram/GetAllGram`)
  }

  Delete_diagnostic(data){
    return this.http.delete(`${environment.API_Base_URL}`+`DiagnosticCenters/DeleteDiagnosticCenters?DGSTC_Id=${data}`)
  }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }

}
