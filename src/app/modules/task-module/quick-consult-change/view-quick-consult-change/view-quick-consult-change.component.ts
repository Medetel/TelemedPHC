import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { PHCManualAppointService } from '../../phc-manual-appoint.service';


@Component({
  selector: 'app-view-quick-consult-change',
  templateUrl: './view-quick-consult-change.component.html',
  styleUrls: ['./view-quick-consult-change.component.scss']
})
export class ViewQuickConsultChangeComponent implements OnInit {

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
  complaint: any;
  symptoms: any;
  Diseases: any;
  medications: any;
  Image_Url;
  today = new Date();
  hos_NE_Id_FK;
  allergy;
  apt_bpmeditation;
  apt_sugarmeditation;
  // app_hospital;
  app_doctor;
  lp_total_cholesterol: any;
  lp_triglycerides: any;
  lp_hdl_cholesterol: any;
  lp_ldl: any;
  patient_dob: any;
  patient_age: any;
  patient_gender: any;
  frmtime: any;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any, private service: PHCManualAppointService,) { }
  patient = new FormGroup({
    pR_Id: new FormControl('')
  })
  fixappointment = new FormGroup({
    appt_PatientId_FK: new FormControl(''),
    appt_DateTime: new FormControl(this.today),
    select_toTime: new FormControl(''),
    hos_NE_Id_FK: new FormControl(''),
    select_FrmTime: new FormControl(''),
    select_day: new FormControl(''),
    complaint: new FormControl(''),
    diseasesDtl: new FormControl(''),
    symptoms: new FormControl(''),
    height: new FormControl(''),
    weight: new FormControl(''),
    tempInFahrenheit: new FormControl(''),
    tempInCelsius: new FormControl(''),
    bloodPressure: new FormControl(''),
    sugar: new FormControl(''),
    pulseRate: new FormControl(''),
    respiratoryRate: new FormControl(''),
    ecg: new FormControl(''),
    oxygenSaturation: new FormControl(''),

  })

  ngOnInit(): void {
    this.bind();
    this.Image_Url = this._data.d.pR_Image;
    this.patient_name = this._data.d.appt_P_Name;
    this.patient_id = this._data.d.appt_P_Code;
    this.patient_dob = this._data.d.appt_P_DOB;
    this.patient_age = this._data.d.appt_P_Age;
    this.patient_gender = this._data.d.appt_P_Gender;
  }
  bind() {
    console.log('from time :' + this._data.d.select_FrmTime);

    this.patient_name = this._data.d.appt_P_Name;
    this.patient_id = this._data.d.appt_P_Code;
    this.complaint = this._data.d.complaintslist;
    //this.medications = this._data.d.medicationlist;
    this.apt_date = this._data.d.select_day;
    this.app_doctor = this._data.d.appt_DO_Name;
    /*
    if(this._data.d.select_FrmTime==null || this._data.d.select_FrmTime=="")
    {
      this.frmtime = "00:00";
    }
    else{
      this.frmtime=this._data.d.select_FrmTime;
    }
    */
    this.apt_f_time = this._data.d.select_FrmTime;
    this.apt_to_time = this._data.d.select_toTime;
    this.apt_height = this._data.d.appt_PA_Height;
    this.apt_weight = this._data.d.appt_PA_Weight;
    this.Image_Url = this._data.d.pR_Image;

  }
}


