import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AppointmentService } from '../../appointment/appointment.service';
import { ManualAppointmentService } from '../manual-appointment.service';

@Component({
  selector: 'app-view-manual-appointment',
  templateUrl: './view-manual-appointment.component.html',
  styleUrls: ['./view-manual-appointment.component.scss']
})
export class ViewManualAppointmentComponent implements OnInit {

  patient_name;
  patient_id;
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
  complaint:any;
  symptoms:any;
  Diseases: any;
  medications: any;
  
  Image_Url;
  today=new Date();
  allergy: any;
  apt_bpmeditation;
  apt_sugarmeditation;
  patient_dob: any;
  patient_age: any;
  patient_gender: any;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private service:AppointmentService,) { }
  patient = new FormGroup({
    pR_Id:new FormControl('')
  })
  fixappointment=new FormGroup({
    appt_PatientId_FK:new FormControl(''),
    appt_DateTime:new FormControl(this.today),
    select_toTime:new FormControl(''),
    appt_DO_Id_FK:new FormControl(''),
    select_FrmTime:new FormControl(''),
    select_day:new FormControl(''),
    complaint:new FormControl(''),
    diseasesDtl:new FormControl(''),
    symptoms:new FormControl(''),
    allergySigns_DTL:new FormControl(''),
    height:new FormControl(''),
    weight:new FormControl(''),
    tempInFahrenheit:new FormControl(''),
    tempInCelsius:new FormControl(''),
    bloodPressure:new FormControl(''),
    sugar:new FormControl(''),
    pulseRate:new FormControl(''),
    respiratoryRate:new FormControl(''),
    ecg:new FormControl(''),
    oxygenSaturation:new FormControl(''),
    underBPMedication:new FormControl(''),
    underSugarMedication:new FormControl(''),
  })

  ngOnInit(): void {
    console.log('Data', this._data.d);
    console.log('patient age', this._data.d.appt_P_Age);
    
  }
  bind(){
    this.patient_name=this._data.d.appt_P_Name;
    this.patient_id=this._data.d.appt_P_Code;
    this.patient_dob=this._data.d.appt_P_DOB;
    this.patient_age=this._data.d.appt_P_Age;
    this.patient_gender=this._data.d.appt_P_Gender;
    this.complaint=this._data.d.complaintslist;
    this.symptoms = this._data.d.symptomslist;
    this.medications = this._data.d.medicationlist;
    this.Diseases=this._data.d.diseaseslist;
    this.allergy=this._data.d.allergylist;
    this.apt_date=this._data.d.select_date;
    this.apt_docor=this._data.d.appt_DO_Name;
    this.apt_f_time=this._data.d.select_FrmTime;
    this.apt_to_time=this._data.d.select_toTime;
    this.apt_height=this._data.d.appt_PA_Height;
    this.apt_weight=this._data.d.appt_PA_Weight;
    this.apt_temp=this._data.d.appt_PA_TempInCelsius;
    this.apt_bloodpressure=this._data.d.appt_PA_BloodPressure;
    this.apt_hemoglobin=this._data.d.appt_PA_Hemoglobin;
    this.apt_pulse=this._data.d.appt_PA_PulseRate;
    this.apt_res_rate=this._data.d.appt_PA_RespiratoryRate;
    this.apt_spo2=this._data.d.appt_PA_OxygenSaturation;
    this.apt_glucose=this._data.d.appt_PA_Sugar;
    this.apt_bpmeditation=this._data.d.underBPMedication;
    this.apt_sugarmeditation=this._data.d.underSugarMedication;
    this.Image_Url= this._data.d.pR_Photobyte;
  } 

}
