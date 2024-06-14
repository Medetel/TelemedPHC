import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AppointmentService } from '../../appointment.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.scss']
})
export class ViewPatientComponent implements OnInit {
  app_Id;
  pr_Id;
  patient_name;
  patient_id;
  apt_date;
  apt_f_time;
  apt_to_time;
  apt_docor;
  apt_weight;
  apt_height;
  bmi;
  apt_temp;
  apt_pulse;
  apt_res_rate;
  apt_bloodpressure;
  apt_spo2;
  apt_hemoglobin;
  // apt_glucose;
  complaint:any;
  symptoms:any;
  Diseases:any;
  lp_total_cholesterol: any;
  lp_triglycerides: any;
  lp_hdl_cholesterol:any;
  lp_ldl: any;  
  Image_Url;
  today=new Date();
  allergy: any;
  apt_meditation:any;
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
    oxygenSaturation: new FormControl(''),
    apt_meditation: new FormControl(''),
    // underBPMedication:new FormControl(''),
    // underSugarMedication:new FormControl(''),
  })

  ngOnInit(): void {   
    this.app_Id=this._data.d.appt_Id
    this.pr_Id=this._data.d.pR_Id   
    this.view_appointment(this.app_Id,this.pr_Id); 
    
    
    
  }  
  height:any;
  weight:any;
  pat_details:any=[];
  view_appointment(app_Id:any,pr_Id: any){
    this.service.get_appointmentbyId(app_Id,pr_Id)
    .subscribe((data) => {
      this.pat_details = data
      
      
      if(this.pat_details.length>0)
      {
      console.log('appt data :' +JSON.stringify(this.pat_details))
      this.Diseases=this.pat_details[0].diseaseslist
      this.symptoms=this.pat_details[0].symptomslist;
      this.allergy=this.pat_details[0].allergylist;
      this.complaint=this.pat_details[0].complaintslist;
        this.apt_meditation = this.pat_details[0].medicationlist;
      // this.apt_glucose=this.pat_details[0].underSugarMedication;
      this.lp_total_cholesterol=this.pat_details[0].lp_total_cholesterol;
      this.lp_triglycerides=this.pat_details[0].lp_triglycerides;
      this.lp_hdl_cholesterol=this.pat_details[0].lp_hdl_cholesterol;
      this.lp_ldl=this.pat_details[0].lp_ldl;
      this.apt_date=this.pat_details[0].select_date;
      this.apt_f_time=this.pat_details[0].select_FrmTime;
      this.apt_to_time=this.pat_details[0].select_toTime;
      this.apt_docor=this.pat_details[0].appt_DO_Name;
      this.Image_Url =this.pat_details[0].pR_Image;
      this.height=this.pat_details[0].appt_PA_Height;
      this.weight=this.pat_details[0].appt_PA_Weight;

      }
      this.bmi= this.weight / Math.pow(this.height/100, 2);
    this.bmi=parseFloat(this.bmi).toFixed(2);
      
    })

  }
}
