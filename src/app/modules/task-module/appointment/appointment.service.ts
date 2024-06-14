import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient) { }
  Get_Appointment(){
    return this.http.get(`${environment.API_Base_URL}`+`Appointment/Admin/GetAllAppointment`)
  }
  Get_Patient_id(data){
    return this.http.get(`${environment.API_Base_URL}`+`Patient/Admin/GetPatientById?PR_Id=${data}`)
  }
  Get_Patient(){
    return this.http.get(`${environment.API_Base_URL}`+`Patient/GetAllPatient`)
  }
  Get_Doctor(select_day: any, select_frmtime: any, select_totime: any, sp_id:any){
    return this.http.get(`${environment.API_Base_URL}` + `Appointment/GetDoctorDD?Select_day=${select_day}&Select_FrmTime=${select_frmtime}&Select_toTime=${select_totime},&Sp_Id=${sp_id}`)
  }
  Get_hospital() {
    return this.http.get(`${environment.API_Base_URL}` + `Hospital/Admin/GetHospital_DD`)
  }
  Get_sephospital() {
    return this.http.get(`${environment.API_Base_URL}` + `Hospital/Admin/GetHospitalSpeciality`)
  }
  // Get_specialization() {
  //   return this.http.get(`${environment.API_Base_URL}` + `Specialization/GetAllSpecialization_DD`)
  // }
  Get_specialization() {
    return this.http.get(`${environment.API_Base_URL}` + `SpecilistDoctor/GetSpecilistDoctor_DD`)
  }

  Get_Compliant(){
    return this.http.get(`${environment.API_Base_URL}`+`ComplaintMst/GetComplaintMst_DD`)
  }
  Get_Symptoms(){
    return this.http.get(`${environment.API_Base_URL}`+`SymptomsMst/GetSymptomsMst_DD`)
  }
  Get_Diseases(){
    return this.http.get(`${environment.API_Base_URL}`+`Diseases/GetDiseases_DD`) 
  }
  Get_allergy() {
    return this.http.get(`${environment.API_Base_URL}` + `AllergySigns/GetAllergySigns_DD`)
  }
  // Post_Appointment(data){
  //   return this.http.post(`${environment.API_Base_URL}`+`ManualAppointment/InsertManualAppointment`,data)  
  // }
  Post_Appointment(data){
    return this.http.post(`${environment.API_Base_URL}` +`PHC_Appointment/InsertAppointment`,data)  
  }
  Post_Medicaltests(data) {
    return this.http.post(`${environment.API_Base_URL}` + `Parameters/InsertVitalParameters_PHC`, data)
  }
  Get_Approval_detail(){
    return this.http.get(`${environment.API_Base_URL}` + `Appointment/Admin/GetAppointmentSP`)
  }
  Dlt_Appointment(data){
    return this.http.delete(`${environment.API_Base_URL}`+`Appointment/RejectAppointment?Appt_Id=${data}`)
  }
  Get_AppointmentById(app_Id:any){
    return this.http.get(`${environment.API_Base_URL}` +`Appointment/Admin/GetAppointmentById_PHC?Appt_Id=${app_Id}`)
  }
  GetECGData(ApptID:any){
    return this.http.get(`${environment.API_Base_URL}`+`Appointment/Admin/GetECGData/`+ ApptID);
  }
  put_approval(data){
    return this.http.put(`${environment.API_Base_URL}`+`Appointment/ApproveAppointment`,data)
  }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }

  speedSearchPatient(){
    return this.http.get(`${environment.API_Base_URL}` + `Patient/GetPatient_DD`)
  
    }

    get_appointmentbyId(app_Id:any, pr_Id:any){
      return this.http.get(`${environment.API_Base_URL}` + `Appointment/Admin/GetAppointmentById_PHC?Appt_Id=${app_Id}&PR_Id=${pr_Id}`)

    }
  Get_Medication() {
    return this.http.get(`${environment.API_Base_URL}` + `Medication/GetAllMedication`)
  }

    
}
