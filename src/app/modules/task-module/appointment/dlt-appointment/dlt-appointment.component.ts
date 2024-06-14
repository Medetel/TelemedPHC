import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { AppointmentService } from '../appointment.service';


@Component({
  selector: 'app-dlt-appointment',
  templateUrl: './dlt-appointment.component.html',
  styleUrls: ['./dlt-appointment.component.scss']
})
export class DltAppointmentComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DltAppointmentComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private _service:AppointmentService,private notif:Notification) { }

  ngOnInit(): void {
  }
delete(){
   this._service.Dlt_Appointment(this._data.d.appt_Id)
   .subscribe((res)=>{
      this.notif.successmsg("Record Deleted Successfully")
      this.dialogRef.close();
      window.location.reload(); 
   })
}


}
