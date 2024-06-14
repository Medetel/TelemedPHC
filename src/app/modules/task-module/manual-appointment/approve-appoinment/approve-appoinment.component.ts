import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ManualAppointmentService } from '../manual-appointment.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-approve-appoinment',
  templateUrl: './approve-appoinment.component.html',
  styleUrls: ['./approve-appoinment.component.scss']
})
export class ApproveAppoinmentComponent implements OnInit {

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
  allergy: any;
  apt_bpmeditation;
  apt_sugarmeditation;
  minDate:any=new Date();
  constructor(private dialogRef: MatDialogRef<ApproveAppoinmentComponent>,@Inject(MAT_DIALOG_DATA) private _data: any, private service: ManualAppointmentService, private notif: Notification) { }
  patient = new FormGroup({
    pR_Id: new FormControl('')
  })
  fixappointment = new FormGroup({
    appt_Id: new FormControl(''),
    CON_ConsultedDate: new FormControl(''),
    CON_ConsultedTime: new FormControl(''),
    Remarks: new FormControl(''),
    appt_PatientId_FK: new FormControl(''),
    appt_DateTime: new FormControl(this.today),
    select_toTime: new FormControl(''),
    appt_DO_Id_FK: new FormControl(''),
    select_FrmTime: new FormControl(''),
    select_day: new FormControl(''),
    complaint: new FormControl(''),
    diseasesDtl: new FormControl(''),
    symptoms: new FormControl(''),
    allergySigns_DTL: new FormControl(''),
    //underBPMedication: new FormControl(''),
    //underSugarMedication: new FormControl(''),

  })

  ngOnInit(): void {    
    this.approve();
    this.bind();
    this.Image_Url = 'data:image/jpeg;base64,' + this._data.d.pR_Photobyte;
  }
  bind() {
    this.patient_name = this._data.d.appt_P_Name;
    this.patient_id = this._data.d.appt_P_Code;
    this.complaint = this._data.d.complaintslist;
    this.symptoms = this._data.d.symptomslist;
    this.Diseases = this._data.d.diseaseslist;
    this.allergy = this._data.d.allergylist;
    this.medications = this._data.d.medicationlist;
    this.apt_date = this._data.d.select_date;
    this.apt_docor = this._data.d.appt_DO_Name;
    this.apt_f_time = this._data.d.select_FrmTime;
    this.apt_to_time = this._data.d.select_toTime;
    //this.apt_bpmeditation = this._data.d.underBPMedication;
    //this.apt_sugarmeditation = this._data.d.underSugarMedication;
    this.Image_Url = this._data.d.pR_Photobyte;
    this.fixappointment.controls['CON_ConsultedDate'].setValue(this._data.d.select_date);

  }
  approve() {
    this.fixappointment.controls['appt_Id'].setValue(this._data.d.appt_Id);
  }

  approveform() {
    this.service.Put_Approval(this.fixappointment.value)
      .subscribe((res) => {
        this.notif.successmsg("Appointment Approved Successfully");
        this.dialogRef.close();
        window.location.reload(); 

      })
  }
}
