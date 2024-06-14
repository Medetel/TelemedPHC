import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PHCManualAppointService } from '../../phc-manual-appoint.service';
import { Notification } from 'src/app/core/Notifications/Notification';


@Component({
  selector: 'app-assign-appointmentphc',
  templateUrl: './assign-appointmentphc.component.html',
  styleUrls: ['./assign-appointmentphc.component.scss']
})
export class AssignAppointmentphcComponent implements OnInit {
  docdetails: any;
  isEnabled: boolean;  
  

  constructor(private not: Notification, @Inject(MAT_DIALOG_DATA) private _data: any, private _service: PHCManualAppointService) { }
  doctorassign = new FormGroup({
    doc_Id: new FormControl('')
  })


  ngOnInit(): void {   
    this.get_doctordropdown();   
    this.get_appointment();
    this.doctorassign.controls['doc_Id'].setValue(this._data.d.appt_DO_Id_FK);    
  }
  get_doctordropdown() {
    this._service.Get_doctordetails(this._data.d.hos_Id)
      .subscribe((data) => {
        this.docdetails = data;        
      })
  }
  details: any
  assign_doctor() {
    if (this.doctorassign.value.doc_Id==0) {
      this.not.errorsmsg("Please select the doctor");
      return;
    }
    this._service.assign_doctor(this.doctorassign.value.doc_Id, this._data.d.phc_Appt_Id).subscribe((data) => {
      this.details = data;
      this.not.successmsg("Doctor assigned successfully");
      setTimeout(()=>{
        window.location.reload()
      },700)
     
    })
  }
  data: any;
  get_appointment() {
    this._service.Get_Appointment()
      .subscribe((data) => {
        this.data = data        
      })
  }
   
}