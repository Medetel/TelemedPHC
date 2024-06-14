import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CounsultationService {
  
  
  httpOptions: any;

  constructor(private http: HttpClient) { 
     //saheb
     let accesstoken = localStorage.getItem('accessToken');
     if (accesstoken != null && accesstoken != '' && typeof (accesstoken) != undefined) {
       this.httpOptions = {
         headers: new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + accesstoken,
           'No-Auth': 'True'          
         })
       };
     }
  }
  GetConsult_DrugPrescriptionById(id){
    return this.http.get(`${environment.API_Base_URL}` + `Drug_Prescription/GetById_Drug_Prescription_Pharmacy?Cons_Id=${id}`)
  }
  GetConsult_LabTestById(id){
    return this.http.get(`${environment.API_Base_URL}` + `Consult_LabTest/GetConsult_LabTestById?Id=${id}`)
  }
  Get_complaint() {
    return this.http.get(`${environment.API_Base_URL}` + `Complaint/GetAllComplaint`)
  }
  Get_consultation() {
    return this.http.get(`${environment.API_Base_URL}` + `Consultation/GetAllConsultation`)
  }
  Get_appoinment() {
    return this.http.get(`${environment.API_Base_URL}` + `Appointment/Admin/GetAllAppointment`)
  }
  Get_Consultation_id(consult_id) {
    return this.http.get(`${environment.API_Base_URL}` + `Consultation/Admin/GetConsultationById?CON_Id=${consult_id}`)
  }
  Get_appoinment_id(consult_id) {
    return this.http.get(`${environment.API_Base_URL}` + `ManualAppointment/GetManualAppointmentById?Appt_Id=${consult_id}`)
  }
  Get_patienthistory_id(id){
    return this.http.get(`${environment.API_Base_URL}`+ `PatientHistory/GetAllPatientHistory/`+id )
  }
  Get_Compliant() {
    return this.http.get(`${environment.API_Base_URL}` + `ComplaintMst/GetComplaintMst_DD`)
  }
  Get_Symptoms() {
    return this.http.get(`${environment.API_Base_URL}` + `SymptomsMst/GetSymptomsMst_DD`)
  }
  Get_Diseases() {
    return this.http.get(`${environment.API_Base_URL}` + `Diseases/GetDiseases_DD`)
  }
  Get_Allergy() {
    return this.http.get(`${environment.API_Base_URL}` + `AllergySigns/GetAllergySigns_DD`)
  }
  Get_Medication() {
    return this.http.get(`${environment.API_Base_URL}` + `Medication/GetAllMedication`)
  }
  Get_appoinment_byconId(appoi_id) {
    return this.http.get(`${environment.API_Base_URL}` + `Appointment/Admin/GetAppointmentById_PHC?Appt_Id=${appoi_id}`)
  }

  Get_drugFreqsdd() {
    return this.http.get(`${environment.API_Base_URL}` + `DrugCategory/GetADrug_Frequency_DD`)
  }

  Get_drugmastdd(id) {
    return this.http.get(`${environment.API_Base_URL}` + `Drug_Prescription/Getdrugname_Drugcatid?Drg_Category_Id=${id}`)
  }

  Post_prescription(data) {
    return this.http.post(`${environment.API_Base_URL}` + `Drug_Prescription/InserDrug_Prescription`, data)
  }

  Get_allpres() {
    return this.http.get(`${environment.API_Base_URL}` + `Drug_Prescription/GetAllDrug_Prescription`)
  }

  Get_presbyId(data) {
    return this.http.get(`${environment.API_Base_URL}` + `DrugMaster/GetDrugMasterById?Id=${data}`)
  }

  put_presc(data) {
    return this.http.put(`${environment.API_Base_URL}` + `Drug_Prescription/UpdateDrug_Prescription`, data)
  }

  Delete_Presctn(data) {
    return this.http.delete(`${environment.API_Base_URL}` + `Drug_Prescription/DeleteDrug_Prescription?Dtl_Id=${data}`)
  }

  Get_drugpresby_id(id) {
    return this.http.get(`${environment.API_Base_URL}` + `Drug_Prescription/GetById_Drug_Prescription?Cons_Id=${id}`)
  }

  Post_diet(data) {
    return this.http.post(`${environment.API_Base_URL}` + `DietPlan/InsertDietPlan`, data)
  }

  Get_dietbyid(id) {
    return this.http.get(`${environment.API_Base_URL}` + `DietPlan/GetDietPlanById?Id=${id}`)
  }

  Put_diet(data) {
    return this.http.put(`${environment.API_Base_URL}` + `DietPlan/UpdateDietPlan`, data)
  }

  put_parameters(data) {
    return this.http.put(`${environment.API_Base_URL}` + `Consult_Parameters/UpdateConsult_Parameters`, data)
  }

  Put_otherinfo(data) {
    return this.http.put(`${environment.API_Base_URL}` + `Consultation/UpdateOtherInfo`, data)
  }

  Delete_Diet(data) {
    return this.http.delete(`${environment.API_Base_URL}` + `DietPlan/DeleteDietPlan?Id=${data}`)
  }

  Post_diagnosis(data) {
    return this.http.post(`${environment.API_Base_URL}` + `Consult_diag/Insert_Consult_diag`, data)
  }
  Get_diagnosis_Catdd() {
    return this.http.get(`${environment.API_Base_URL}` + `DiagnosticsDescription/GetDiagnosticsMaster_DD`)
  }
  Get_diagnosis_Desdd(id) {
    return this.http.get(`${environment.API_Base_URL}` + `DiagnosticsDescription/GetDiagnosticDescription_DD?Cat_Id=${id}`)
  }

  Get_diagnosisbyid(id) {
    return this.http.get(`${environment.API_Base_URL}` + `Consult_diag/GetById_Consult_diag?Conslt_id=${id}`)
  }

  Put_diagnosis(data) {
    return this.http.put(`${environment.API_Base_URL}` + `Consult_diag/Update_Consult_diag`, data)
  }

  Delete_diagnosis(data) {
    return this.http.delete(`${environment.API_Base_URL}` + `Consult_diag/Delete_Consult_diag?Dlt_Id=${data}`)
  }

  Post_labtest(data){
    return this.http.post(`${environment.API_Base_URL}` + `Consultation/Insertlabtestcat_desc`, data)
  }

  Get_labcategorydd(){
    return this.http.get(`${environment.API_Base_URL}`+`Consultation/GetLabTestCategory_DD`)
  }

  Get_labdecrptndd(id){
    return this.http.get(`${environment.API_Base_URL}` + `Consultation/GetLabTestDescription_DD?Category_Id=${id}`)
  }

  Get_discriptionall(){
    return this.http.get(`${environment.API_Base_URL}` + `LAB_Description/GetAllLab_Description`)
  }

  get_labtestbyid(id){
    return this.http.get(`${environment.API_Base_URL}` + `Consultation/GetAllLabtestbyId?CON_Id=${id}`)
  }

  Put_Lab(data){
    return this.http.put(`${environment.API_Base_URL}` + `Consultation/Updatelabtestcat_desc`, data)
  }

  Get_labdescbyid(id){
    return this.http.get(`${environment.API_Base_URL}` + `LAB_Description/GetLabDescBy_Id?Lab_DescId=${id}`)
  }

  Delete_labtest(id){
    return this.http.delete(`${environment.API_Base_URL}` + `Consult_LabTest/DeleteConsult_LabTest?Id=${id}`)
  }

  Delete_consultation(data){
    return this.http.delete(`${environment.API_Base_URL}` + `Consultation/DeleteConsultation?CON_Id=${data}`)
  }
  
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }

  Post_referral(data){
    return this.http.post(`${environment.API_Base_URL}` + 'Referrals/InsertOrUpdateReferrals', data);
  }

  Get_splhospital_DD(){ 
    return this.http.get(`${environment.API_Base_URL}` + `Hospital/Admin/GetHospitalSpeciality`)
  }

  Get_referralby_id(data){
    return this.http.get(`${environment.API_Base_URL}` + `Referrals/GetReferralsByCON_Id?CON_Id=${data}`)
  }

  Put_referral(data){
    return this.http.put(`${environment.API_Base_URL}` + `Consult_LabTest/UpdateConsult_LabTest`, data)
  }

  Delete_referral(data){
    return this.http.delete(`${environment.API_Base_URL}` + `Referrals/DeleteReferrals?RV_Id=${data}`)
  }

  Approve_referral(data){
    return this.http.put(`${environment.API_Base_URL}` + `Referrals/ApproveReferrals`, data)
  }

  Post_revist(data){
    return this.http.post(`${environment.API_Base_URL}` + 'ReVisit/InsertOrUpdateReVisit', data);
  }

  Get_revistby_id(data){
    return this.http.get(`${environment.API_Base_URL}` + `ReVisit/GetReVisitByCON_Id?CON_Id=${data}`)
  }

  Approve_revisit(data){
    return this.http.put(`${environment.API_Base_URL}` + 'ReVisit/ApproveReVisit', data)
  }

  Delete_revisit(data){
    return this.http.delete(`${environment.API_Base_URL}` + `ReVisit/DeleteReVisit?RV_Id=${data}`)
  }

  Get_documentdropdown() {
    return this.http.get(`${environment.API_Base_URL}` + `DocumentType/GetDocumentType_DD`)
  }

  Get_documentdetail_patientid(id) {
    return this.http.get(`${environment.API_Base_URL}` + `PatientDocument/GetPatientDocumentByPatientId/` + id);
  }

  Insert_document(data:any) {
    return this.http.post(`${environment.API_Base_URL}` + `PatientDocument/InsertPatientDocument`, data)
  }

  Close_consultation(data){
    return this.http.put(`${environment.API_Base_URL}` + `Consultation/CloseConsultation?CON_Id=${data}`,null)
  }

  Endvc_meeting(meeting_id){
    return this.http.get(`${environment.API_Base_URL}` + `VideoConference/EndMeeting/` + meeting_id)
  }

   //saheb new for assistant or admin
   GetConsultation_Patient_DD_Common() {
    return this.http.get(`${environment.API_Base_URL}` + `Consultation/GetConsultation_Patient_DD_Common` ,this.httpOptions);
  }

   //saheb new for login based on doctor
   GetConsultation_Patient_DD() {
    return this.http.get(`${environment.API_Base_URL}` + `Consultation/GetConsultation_Patient_DD` ,this.httpOptions);
  } 

  //saheb new for patient info
  GetConsultation_Patient_Detail(pate_id:any, cons_id:any){
    return this.http.get(`${environment.API_Base_URL}` + `Consultation/GetConsultation_Patient_Detail/${pate_id}/${cons_id}`)
  }

   //saheb new for doctor info
   GetConsultation_Doctor_Detail(pate_id:any, cons_id:any){
    return this.http.get(`${environment.API_Base_URL}` + `Consultation/GetConsultation_Doctor_Detail/${pate_id}/${cons_id}`)
  }
 
  startMeeting(data:any) {
    return this.http.post(`${environment.API_Base_URL}` + 'VideoConference/StartMeeting', data,this.httpOptions);
  } 

  //saheb new
  joinMeeting(data:any) {
    return this.http.post(`${environment.API_Base_URL}` + 'VideoConference/JoinMeetingAsAttendee', data,this.httpOptions);
  } 
  //saheb new
  GetRegd_PatientDetail(p_code:any) {
    return this.http.get(`${environment.API_Base_URL}` + `Consultation/GetNewRegdPatient_Detail/${p_code}`)
  } 

   //saheb new
   GetRegd_DoctorDetail_DD() {
    return this.http.get(`${environment.API_Base_URL}` + `Consultation/GetConsultation_Doctor_DD` ,this.httpOptions);
  }   
  get_categoryDD(){
    return this.http.get(`${environment.API_Base_URL}` + `DrugCategory/GetDrug_Category_DD`)
  }
  GetSpec_doctor() {
    return this.http.get(`${environment.API_Base_URL}` + `SpecilistDoctor/GetSpecilistDoctor_Description`)
  }
  Post_mobile_no(data: any) {
    return this.http.post(`${environment.API_Base_URL}` + 'VideoConference/JoinVC_Specialist_Doctor', data, this.httpOptions);
  }
}


