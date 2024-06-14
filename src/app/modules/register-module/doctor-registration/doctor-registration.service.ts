import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorRegistrationService {
  [x: string]: any;
  

  constructor(private http: HttpClient) { }
  Get_network() {
    return this.http.get(`${environment.API_Base_URL}` + `Network/GetNetwork_DD`)
  }
  Get_Doctor(){
    return this.http.get(`${environment.API_Base_URL}`+`Doctor/GetAllDoctor`)
  }
  Post_Doctor(data){
    return this.http.post(`${environment.API_Base_URL}`+`Doctor/Admin/InsertDoctor`,data)
  }
  Put_Doctor(data){
    return this.http.put(`${environment.API_Base_URL}`+`Doctor/Admin/UpdateDoctor`,data)
  }
  Delete_Doctor(data){
    return this.http.delete(`${environment.API_Base_URL}`+`Doctor/DeleteDoctor?DO_Id=${data}`)
  }
  Get_StateDD(){
    return this.http.get(`${environment.API_Base_URL}`+`State/GetState_DD`)
  }
  Get_DistrictDD(){
    return this.http.get(`${environment.API_Base_URL}`+`District/GetDistrict_DD`)
  }
  Get_HospitalDD(){
    return this.http.get(`${environment.API_Base_URL}`+`Hospital/Admin/GetHospital_DD`)
  }
  Get_QualificationDD(){
    return this.http.get(`${environment.API_Base_URL}`+`Qualification/GetQualification_DD`)
  }
  Get_DesignationDD(){
    return this.http.get(`${environment.API_Base_URL}`+`Designation/GetDesignation_DD`)
  }
  Get_SpecializationDD() {
    return this.http.get(`${environment.API_Base_URL}` + `Specialization/GetSpecializationCategory_DD`)
  }
  Get_Specialization_Desdd(id) {
    return this.http.get(`${environment.API_Base_URL}` + `Specialization/GetSpecializationDescription_DD?Cat_Id=${id}`)
  }
  Get_SpecializationDDby(id){
    return this.http.get(`${environment.API_Base_URL}`+`Specialization/GetSpecialization_DD?CD_Id=${id}`)
  }
  Get_Discipline(){
    return this.http.get(`${environment.API_Base_URL}`+`Discipline/GetDiscipline_DD`)
  }
  Get_specialistdocDD() {
    return this.http.get(`${environment.API_Base_URL}` + `SpecilistDoctor/GetSpecilistDoctor_DD`)
  }
  Get_Gram(){
    return this.http.get(`${environment.API_Base_URL}`+`Gram/GetAllGram`)
  }
  Get_state_f(){
    return this.http.get(`${environment.API_Base_URL}`+`State/GetAllState`)
  }
  Get_alldistrict(){
    return this.http.get(`${environment.API_Base_URL}`+`District/GetAllDistrict`)
  }
  Get_allTaluk(){
    return this.http.get(`${environment.API_Base_URL}`+`Taluk/GetAllTaluk`)
  }
  Get_State(id){
    return this.http.get(`${environment.API_Base_URL}`+`State/GetState_DD?cntry_id=${id}`)
  }
  Get_District(id){
    return this.http.get(`${environment.API_Base_URL}`+`District/GetDistrict_DD?stat_id=${id}`)
  }
  Get_Taluk(id){
    return this.http.get(`${environment.API_Base_URL}`+`Taluk/GetTaluk_DD?district_id=${id}`)
  }
  Get_Gram_id(id){
    return this.http.get(`${environment.API_Base_URL}`+`Gram/GetGram_DD?Taluk_id=${id}`)
  }
  Get_country(){
    return this.http.get(`${environment.API_Base_URL}`+`Country/GetCountry_DD`)
  }
  Get_Language(){
    return this.http.get(`${environment.API_Base_URL}`+`Language_MST/GetAllLanguage`)
  }
  Get_allgram(){
    return this.http.get(`${environment.API_Base_URL}`+`Gram/GetAllGram`)
  }
  Put_Approval(data){
    return this.http.put(`${environment.API_Base_URL}` + `Doctor/ApproveDoctor`,data)
  }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
  Get_Servicecharge_DD() {
    return this.http.get(`${environment.API_Base_URL}`+`PriceMaster/GetService_DD`)
  } 
 
  Get_Servicecode_DD(data) {
    return this.http.get(`${environment.API_Base_URL}`+`PriceMaster/GetServicecode?Services_FK=${data}`)
  }

  Get_Servicecharge_Detail(data) {
    return this.http.get(`${environment.API_Base_URL}`+`PriceMaster/GetChargesByServiceCode?Price_Id=${data}`)
  }


}
