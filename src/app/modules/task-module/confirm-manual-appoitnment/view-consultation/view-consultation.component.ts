import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ManualAppointmentService } from '../../manual-appointment/manual-appointment.service';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-consultation',
  templateUrl: './view-consultation.component.html',
  styleUrls: ['./view-consultation.component.scss']
})
export class ViewConsultationComponent implements OnInit {
  patient_name;
  patient_id;
  patient_gender;
  patient_age;
  patient_bloodgroup;
  patient_mothertongue;
  apt_date;
  apt_f_time;
  apt_to_time;
  apt_docor;
  apt_weight;
  apt_height;
  apt_temp;
  apt_pulse;
  apt_res_rate;
  apt_bloodpressure;
  apt_spo2;
  apt_hemoglobin;
  apt_glucose;
  lp_total_cholesterol: any;
  lp_triglycerides: any;
  lp_hdl_cholesterol:any;
  lp_ldl: any; 
  complaint:any;
  symptoms:any;
  Diseases:any;
  Image_Url;
  today=new Date();
  minDate:any=new Date();
  allergy: any;
  medications: any;
  apt_bpmeditation;
  apt_sugarmeditation;
  //appr_appt_id;
  NewCON_ConsultedDate;
  NewCON_ConsultedTime;
  NewRemarks;
  new_appt_id;
  new_phc_appt_id;
  constructor(private dialogRef: MatDialogRef<ViewConsultationComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private service:ManualAppointmentService,private notif:Notification) { }
  patient = new FormGroup({
    pR_Id:new FormControl('')
  })
  fixappointment=new FormGroup({
    appt_Id: new FormControl(''),
    phc_appt_id: new FormControl(''),
    CON_ConsultedDate:new FormControl(''),
    CON_ConsultedTime:new FormControl(''),
    Remarks:new FormControl(''),
    appt_PatientId_FK:new FormControl(''),
    appt_DateTime:new FormControl(this.today),
    select_toTime:new FormControl(''),
    appt_DO_Id_FK:new FormControl(''),
    select_FrmTime:new FormControl(''),
    select_day:new FormControl(''),
    complaint:new FormControl(''),
    diseasesDtl:new FormControl(''),
    symptoms:new FormControl(''),
    allergy: new FormControl(''),
    medications: new FormControl(''),
    height:new FormControl(''),
    weight:new FormControl(''),
    tempInFahrenheit:new FormControl(''),
    tempInCelsius:new FormControl(''),
    bloodPressure:new FormControl(''),
    sugar:new FormControl(''),
    pulseRate:new FormControl(''),
    respiratoryRate:new FormControl(''),
    apt_hemoglobin:new FormControl(''),
    ecg:new FormControl(''),
    oxygenSaturation:new FormControl(''),

  })

  ngOnInit(): void {
    this.bind();
    this.Image_Url = this._data.d.pR_Image;
    this.fixappointment.controls['CON_ConsultedDate'].setValue(this.today);
    this.fixappointment.controls['CON_ConsultedTime'].setValue(this.getCurrentTime());
  }

  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }


  

  bind(){
    this.patient_name=this._data.d.appt_P_Name;
    this.patient_id=this._data.d.appt_P_Code;
    this.patient_gender=this._data.d.appt_P_Gender;
    this.patient_age=this._data.d.appt_P_Age;
    this.patient_bloodgroup=this._data.d.appt_P_BloodGroup;
    this.patient_mothertongue=this._data.d.language;
    this.complaint=this._data.d.complaintslist;
    this.symptoms=this._data.d.symptomslist;
    this.Diseases=this._data.d.diseaseslist;
    this.allergy = this._data.d.allergylist;
    this.medications = this._data.d.medicationlist;
    this.apt_date=this._data.d.select_date;
    this.apt_docor=this._data.d.appt_DO_Name;
    this.apt_f_time=this._data.d.select_FrmTime;
    this.apt_to_time=this._data.d.select_toTime;
    this.apt_height=this._data.d.appt_PA_Height;
    this.apt_weight=this._data.d.appt_PA_Weight;
    this.apt_temp=this._data.d.appt_PA_TempInCelsius;
    this.apt_bloodpressure=this._data.d.appt_PA_BloodPressure;
    this.apt_pulse=this._data.d.appt_PA_PulseRate;
    this.apt_res_rate=this._data.d.appt_PA_RespiratoryRate;
    this.apt_hemoglobin=this._data.d.appt_PA_Hemoglobin;
    this.apt_spo2=this._data.d.appt_PA_OxygenSaturation;
    this.apt_glucose=this._data.d.appt_PA_Sugar;
    this.lp_total_cholesterol=this._data.d.lp_total_cholesterol;
    this.lp_triglycerides=this._data.d.lp_triglycerides;
    this.lp_hdl_cholesterol=this._data.d.lp_hdl_cholesterol;
    this.lp_ldl=this._data.d.lp_ldl;
    this.Image_Url= this._data.d.pR_Image;
    this.apt_bpmeditation=this._data.d.underBPMedication;
    this.apt_sugarmeditation=this._data.d.underSugarMedication;   
    this.fixappointment.controls['appt_Id'].setValue(this._data.d.appt_Id);
    this.fixappointment.controls['phc_appt_id'].setValue(this._data.d.phc_appt_id);
  }
  approveform(){
    var datePipe = new DatePipe('en-US');
    this.NewCON_ConsultedDate = datePipe.transform(this.fixappointment.value.CON_ConsultedDate, 'yyyy-MM-dd');
    //this.fixappointment.value.CON_ConsultedDate=NewCON_ConsultedDate;    
    this.fixappointment.value.CON_ConsultedTime=this.fixappointment.value.CON_ConsultedTime;
    this.fixappointment.value. Remarks = this.fixappointment.value.Remarks;    

    console.log("console.log :" +JSON.stringify(this.fixappointment.value));
    
//saheb
    if (this._data.d.appt_Type === 'REFERRALS' || this._data.d.appt_Id === 0) {
      this.fixappointment.controls['phc_appt_id'].setValue(this._data.d.phc_appt_id);
      this.new_phc_appt_id=this._data.d.phc_appt_id;

      this.new_appt_id=0;
      this.fixappointment.controls['appt_Id'].setValue(0);
    } else {
      this.fixappointment.controls['appt_Id'].setValue(this._data.d.appt_Id);
      this.new_appt_id=this._data.d.appt_Id;

      this.new_phc_appt_id=0;
      this.fixappointment.controls['phc_appt_id'].setValue(0);
    }    
   
   
    var approve_data ={
      appt_Id: this.new_appt_id,
      phc_appt_id: this.new_phc_appt_id,     
      CON_ConsultedDate:this. NewCON_ConsultedDate,     
      CON_ConsultedTime:this.fixappointment.value.CON_ConsultedTime,
      Remarks : this.fixappointment.value.Remarks  
    }
    
    //console.log("Consulted Date:", this.fixappointment.value)
    console.log("approve consulation data :", JSON.stringify(approve_data))
    //return;
    this.service.Put_Approval(approve_data)
    .subscribe((res)=>{
      this.notif.successmsg("Consultation Approved Successfully")
      this.dialogRef.close();
      window.location.reload(); 
    },(error)=>{
      this.notif.errorsmsg("Consultation Not Approved")
    })
    this.fixappointment.reset();
   
  }


  calculateBMI(): string {
    if (this.apt_height && this.apt_weight) {
      // Convert height from cm to meters (1 cm = 0.01 m)
      const heightInMeters = this.apt_height / 100;

      // Calculate BMI
      const bmi = this.apt_weight / (heightInMeters * heightInMeters);

      // Format BMI to display in metric square
      return bmi.toFixed(2) + ' kg/m²';
    }
    // Return an empty string or an appropriate message if height or weight is missing.
    return 'N/A';
  }

}
