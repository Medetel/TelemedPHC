import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { ManualAppointmentService } from '../manual-appointment.service';

@Component({
  selector: 'app-delete-manual-appointment',
  templateUrl: './delete-manual-appointment.component.html',
  styleUrls: ['./delete-manual-appointment.component.scss']
})
export class DeleteManualAppointmentComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteManualAppointmentComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private _service:ManualAppointmentService,private notif:Notification) { }

  ngOnInit(): void {
  }
delete(){
   this._service.Delete_manualAppointment(this._data.d.appt_Id)
   .subscribe(res=>{
      this.notif.successmsg("Record Deleted Successfully")
      this.dialogRef.close();
      window.location.reload(); 
   })
}


}
