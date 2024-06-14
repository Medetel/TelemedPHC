import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManualAppointmentService {

  constructor(private http:HttpClient) { }
  Get_Appointment(){
    return this.http.get(`${environment.API_Base_URL}`+`Appointment/Admin/GetAllAppointment`)
  }
  // Get_Appointment(){
  //   return this.http.get(`${environment.API_Base_URL}`+`ManualAppointment/GetAllManualAppointment`)
  // }
  Get_Patient_id(data){
    return this.http.get(`${environment.API_Base_URL}`+`Patient/Admin/GetPatientById?pR_Id=${data}`)
  }
  Get_Patient(){
    return this.http.get(`${environment.API_Base_URL}`+`Patient/GetAllPatient`)
  }
  Get_Doctor(){
    //Doctor/GetAllDoctor
    return this.http.get(`${environment.API_Base_URL}`+`Doctor/DoctorDD`)
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
  Post_Appointment(data){
    return this.http.post(`${environment.API_Base_URL}`+`ManualAppointment/InsertManualAppointment`,data)  
  }
  Get_patient_by_id(id){
    return this.http.get(`${environment.API_Base_URL}`+`Patient/Admin/GetPatientById?PR_Id=${id}`)
  }
  Delete_appointment(id){
    return this.http.delete(`${environment.API_Base_URL}`+`Appointment/Admin/DeleteAppointment?Appt_Id=${id}`)
  }
  // Delete_manualAppointment(data){
  //   return this.http.delete(`${environment.API_Base_URL}`+`ManualAppointment/DeleteManualAppointment?Appt_Id=${data}`)
  // }
  Delete_manualAppointment(apptId: number) {
    return this.http.delete(`${environment.API_Base_URL}ManualAppointment/DeleteManualAppointment?Appt_Id=${apptId}`);
  }

  Delete_manualAppointmentByPHC(phcApptId: number) {
    return this.http.delete(`${environment.API_Base_URL}ManualAppointment/DeleteManualAppointment?phc_appt_id=${phcApptId}`);
  }
  Get_Allergy(){
    return this.http.get(`${environment.API_Base_URL}`+`AllergySigns/GetAllergySigns_DD`)
  }
  Put_Approval(data){
    return this.http.put(`${environment.API_Base_URL}` + `Appointment/ApproveAppointment`,data)
  }
  // Put_Approval(data){
  //   return this.http.put(`${environment.API_Base_URL}` + `ManualAppointment/ApproveManualAppointment`,data)
  // }
  
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
  Put_Appoinment(data){
    return this.http.put(`${environment.API_Base_URL}` + `ManualAppointment/UpdateManualAppointment`,data)
  }

  speedSearchPatient(){
    return this.http.get(`${environment.API_Base_URL}` + `Patient/GetPatient_DD`)
  
    }
 
}
