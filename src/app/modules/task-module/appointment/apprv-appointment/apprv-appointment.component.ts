import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

import { Notification } from 'src/app/core/Notifications/Notification';
import { AppointmentService } from '../appointment.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-apprv-appointment',
  templateUrl: './apprv-appointment.component.html',
  styleUrls: ['./apprv-appointment.component.scss']
})
export class ApprvAppointmentComponent implements OnInit {
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
  medications:any
  Image_Url;
  today = new Date();
  allergy: any;
  apt_bpmeditation;
  apt_sugarmeditation;
  ECGDATA:any;
  minDate:any=new Date();
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any, private service: AppointmentService, private notif: Notification) { }
  patient = new FormGroup({
    pR_Id: new FormControl('')
  })
  fixappointment = new FormGroup({
    appt_Id: new FormControl(''),
    CON_ConsultedDate: new FormControl(''),
    CON_ConsultedTime: new FormControl(''),
    Remarks: new FormControl(''),   

  })

  ngOnInit(): void {
   
    this.approve();
    this.Get_appointmentById();
    this.Get_appointmentById_copy();
    this.GetECGData();
    this.bind();
    this.Image_Url = this._data.d.pR_Image;
  }
  bind() {
    this.patient_name = this._data.d.appt_P_Name;
    this.patient_id = this._data.d.appt_P_Code;
    this.complaint = this._data.d.complaintslist;
    this.symptoms = this._data.d.symptomslist;
    this.Diseases = this._data.d.diseaseslist;
    this.allergy = this._data.d.allergylist;
    this.medications = this._data.d.medicationlist;
    this.apt_date = this._data.d.appt_DateTime;
    this.apt_docor = this._data.d.appt_DO_Name;
    this.apt_f_time = this._data.d.select_FrmTime;
    this.apt_to_time = this._data.d.select_toTime;
    //this.apt_bpmeditation = this._data.d.underBPMedication;
    //this.apt_sugarmeditation = this._data.d.underSugarMedication;
    this.Image_Url = this._data.d.pR_Image;
    //this.fixappointment.controls['CON_ConsultedDate'].setValue(this._data.d.appt_DateTime);

  }
  approve() {
    this.fixappointment.controls['appt_Id'].setValue(this._data.d.appt_Id);
  }

  data:any;
  Get_appointmentById(){
    this.service.Get_AppointmentById(this._data.d.appt_Id).subscribe((data)=>{
      this.data= data[0];     
    })
  }
  data1:any;
  Get_appointmentById_copy(){
    this.service.Get_AppointmentById(this._data.d.appt_Id).subscribe((data)=>{
      this.data1= data;     
    })
  }
  GetECGData(){
    this.service.GetECGData(this._data.d.appt_Id).subscribe((data)=>{
      this.ECGDATA= data;      
    })
  }
  approveform() {
    var datePipe = new DatePipe('en-US');
    this.fixappointment.value.CON_ConsultedDate = datePipe.transform(this.fixappointment.value.CON_ConsultedDate, 'yyyy-MM-dd');
    //alert("App Details"+ JSON.stringify(this.fixappointment.value))
    this.service.put_approval(this.fixappointment.value)
      .subscribe((res) => {
        this.notif.successmsg("Appointment Approved Successfully");
        window.location.reload();
        // setTimeout(()=>{
        //   window.location.reload();
        // },700)
        
      })
     this.fixappointment.reset(); 
  }
}
