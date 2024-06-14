import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientRegistrationService {
  private videoSource = new Subject<string>();

  video$ = this.videoSource.asObservable();

  openVideo(videoId: string) {
    this.videoSource.next(videoId);
  }

  constructor(private http: HttpClient) { }
  Get_Patient() {
    return this.http.get(`${environment.API_Base_URL}` + `Patient/GetAllPatient`)
  }
  Post_Patient(data) {
    return this.http.post(`${environment.API_Base_URL}` + `Patient/Admin/InsertPatient`, data)
  }
  Put_Patient(data) {
    return this.http.put(`${environment.API_Base_URL}` + `Patient/Admin/UpdatePatient`, data)
  }
  Delete_Patient(data) {
    return this.http.delete(`${environment.API_Base_URL}` + `Patient/DeletePatient?PR_Id=${data}`)
  }
  Get_StateDD() {
    return this.http.get(`${environment.API_Base_URL}` + `State/GetState_DD`)
  }
  Get_VilageDD() {
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
  Get_Discipline() {
    return this.http.get(`${environment.API_Base_URL}` + `Discipline/GetDiscipline_DD`)
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
  Get_nationality() {
    return this.http.get(`${environment.API_Base_URL}` + `Nationality_MST/GetAllNationality`)
  }
  Get_religion() {
    return this.http.get(`${environment.API_Base_URL}` + `Religion_MST/GetAllReligion`)
  } 
  Get_cast() {
    return this.http.get(`${environment.API_Base_URL}` + `Caste_MST/GetAllCaste`)
  } 
  Get_identity() {
    return this.http.get(`${environment.API_Base_URL}` + `Identity_DOC_MST/GetAllIdentity`)
  }
  Get_insurer() {
    return this.http.get(`${environment.API_Base_URL}` + `Insurer_MST/GetAllInsurer`)
  } 
  Get_occupation() {
    return this.http.get(`${environment.API_Base_URL}` + `Occupation_MST/GetAllOccupation`)
  } Language
  Get_language() {
    return this.http.get(`${environment.API_Base_URL}` + `Language_MST/GetAllLanguage`)
  }
 
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
}