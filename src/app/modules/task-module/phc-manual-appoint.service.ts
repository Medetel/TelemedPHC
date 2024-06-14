import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PHCManualAppointService {

  constructor(private http:HttpClient) { }
  Get_DoctorDD(select_day:any,select_frmtime:any,select_totime:any){
    return this.http.get(`${environment.API_Base_URL}`+`Appointment/GetDoctorDD?Select_day=${select_day}&Select_FrmTime=${select_frmtime}&Select_toTime=${select_totime}`)
  }
  Get_Medication() {
    return this.http.get(`${environment.API_Base_URL}` + `Medication/GetAllMedication`)
  }
  Get_Approval_detail(){
    return this.http.get(`${environment.API_Base_URL}` + `Appointment/Admin/GetAppointmentSP`)
  }
  Get_Appointment(){
    return this.http.get(`${environment.API_Base_URL}` +`PHC_Appointment/GetAllPHC_Appointment`)
  }

  GetAll_quick_consult(){
    return this.http.get(`${environment.API_Base_URL}`+`Appointment/GetAllAppointment_Change_Doctor`)
  }
  Get_Patient_id(data){
    return this.http.get(`${environment.API_Base_URL}`+`Patient/Admin/GetPatientById?PR_Id=${data}`)
  }
  Get_Patient(){
    return this.http.get(`${environment.API_Base_URL}`+`Patient/GetAllPatient`)
  }
  Get_Doctor(select_day:any,select_frmtime:any,select_totime:any){
    return this.http.get(`${environment.API_Base_URL}`+`Appointment/GetDoctorDD?Select_day=${select_day}&Select_FrmTime=${select_frmtime}&Select_toTime=${select_totime}`)
  }
  // Get_Doctor(){
  //   return this.http.get(`${environment.API_Base_URL}`+`Doctor/GetAllDoctor`)
  // }
  Get_Compliant(){
    return this.http.get(`${environment.API_Base_URL}`+`ComplaintMst/GetComplaintMst_DD`)
  }
  Get_Symptoms(){
    return this.http.get(`${environment.API_Base_URL}`+`SymptomsMst/GetSymptomsMst_DD`)
  }
  Get_Diseases(){
    return this.http.get(`${environment.API_Base_URL}`+`Diseases/GetDiseases_DD`) 
  }
  Post_Appointment(data){
    return this.http.post(`${environment.API_Base_URL}`+`Appointment/Admin/InsertAppointment`,data)  
  }
  // Post_Appointment(data){
  //   return this.http.post(`${environment.API_Base_URL}` +`PHC_Appointment/InsertAppointment`,data)  
  // }
  Get_patient_by_id(id){
    return this.http.get(`${environment.API_Base_URL}`+`Patient/Admin/GetPatientById?PR_Id=${id}`)
  }
  // Delete_appointment(data){
  //   return this.http.delete(`${environment.API_Base_URL}`+`PHC_Appointment/DeletePHC_Appointment?Phc_Appt_Id=${data}`)
  // }
  Delete_appointmentt(data){
    return this.http.delete(`${environment.API_Base_URL}`+`PHC_Appointment/DeletePHC_Appointment?Phc_Appt_Id=${data}`)
  }
  Get_hospital(){
    return this.http.get(`${environment.API_Base_URL}`+`Hospital/Admin/GetHospital_DD`) 
  }

  // new
  Get_Doctordd(){
    return this.http.get(`${environment.API_Base_URL}`+`Appointment/GetDoctordd_Changedoctor`) 
  }
  Get_allergy() {
    return this.http.get(`${environment.API_Base_URL}` + `AllergySigns/GetAllergySigns_DD`)
  }
  Put_Approval(data){
    return this.http.put(`${environment.API_Base_URL}` + `PHC_Appointment/ApprovePHC_Appointment`,data)
  }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
  // Put_phcappmt(data){
  //   return this.http.put(`${environment.API_Base_URL}` + `PHC_Appointment/UpdatePHC_Appointment`,data)
  // }
  Put_phcappmt(data){
    return this.http.post(`${environment.API_Base_URL}` + `Appointment/InsertAppointment_changeDoctor`,data)
  }
  insertpatient(data){
    return this.http.post(`${environment.API_Base_URL}` + `PatientDocument/InsertPatientDocument`,data)
  }

  Get_documentdropdown() {
    return this.http.get(`${environment.API_Base_URL}` + `DocumentType/GetDocumentType_DD`)
  }
  Get_doctordetails(data){
    return this.http.get(`${environment.API_Base_URL}` + `Doctor/GetDoctorDetails?HospitalId=${data}`)
  }
  assign_doctor(DoctorId,ApptId){
    return this.http.get(`${environment.API_Base_URL}` + `PHC_Appointment/AssignDoctor/`+DoctorId+`/`+ApptId)
  }

  speedSearchPatient(){
  return this.http.get(`${environment.API_Base_URL}` + `Patient/GetPatient_DD`)

  }

  GetAllMediaDocument_by_id(data: any) {
    return this.http.get(`${environment.API_Base_URL}` + `MediaAwareness/GetMediaAwarnessDocumentById?med_Id=${data}`)
  }
}