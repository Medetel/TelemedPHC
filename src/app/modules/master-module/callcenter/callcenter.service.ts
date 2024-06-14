import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallcenterService {

  constructor(private http: HttpClient) { }

  Get_Callcenter() {
    return this.http.get(`${environment.API_Base_URL}` + `CallCenterAgent/GetAllCallCenter_Agent`)
  }
  Post_Callcenter(data) {
    return this.http.post(`${environment.API_Base_URL}` + `CallCenterAgent/InsertCallCenter_Agent`, data)
  }
  Put_Callcenter(data) {
    return this.http.put(`${environment.API_Base_URL}` + `CallCenterAgent/UpdateCallCenter_Agent`, data)
  }
  Delete_callcenter(data) {
    return this.http.delete(`${environment.API_Base_URL}` + `CallCenterAgent/DeleteCallCenter_Agent?Call_Ag_Id=${data}`)
  }
  Get_StateDD() {
    return this.http.get(`${environment.API_Base_URL}` + `State/GetState_DD`)
  }
  Get_DistrictDD() {
    return this.http.get(`${environment.API_Base_URL}` + `District/GetDistrict_DD`)
  }
  Get_TalukDD() {
    return this.http.get(`${environment.API_Base_URL}` + `District/GetDistrict_DD`)
  }
  Get_GramDD() {
    return this.http.get(`${environment.API_Base_URL}` + `District/GetDistrict_DD`)
  }
  Get_HospitalDD() {
    return this.http.get(`${environment.API_Base_URL}` + `Hospital/Admin/GetHospital_DD`)
  }
  Get_QualificationDD() {
    return this.http.get(`${environment.API_Base_URL}` + `Qualification/GetQualification_DD`)
  }
  Get_DesignationDD() {
    return this.http.get(`${environment.API_Base_URL}` + `Designation/GetDesignation_DD`)
  }
  Get_SpecializationDD() {
    return this.http.get(`${environment.API_Base_URL}` + `Specialization/GetSpecialization_DD`)
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
  Get_skillset(id) {
    return this.http.get(`${environment.API_Base_URL}` + `SkillSet/GetSkillSetById?Skillset_id=${id}`)
  }
  Get_skillsetddbyId(id) {
    return this.http.get(`${environment.API_Base_URL}` + `SkillSet/GetSkillSet_DD?qualification_Id=${id}`)
  }
  Get_skillall() {
    return this.http.get(`${environment.API_Base_URL}` + `SkillSet/GetAllSkillSet`)
  }
  Put_Approval(data) {
    return this.http.put(`${environment.API_Base_URL}` + `CallCenterAgent/ApproveCallCenter_Agent`, data)
  }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
}
