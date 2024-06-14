import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { PHCManualAppointService } from '../../phc-manual-appoint.service';

@Component({
  selector: 'app-delete-phc-manual-appointment',
  templateUrl: './delete-phc-manual-appointment.component.html',
  styleUrls: ['./delete-phc-manual-appointment.component.scss']
})
export class DeletePhcManualAppointmentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private _service:PHCManualAppointService,private notif:Notification) { }

  ngOnInit(): void {
  }
delete(){
   this._service.Delete_appointmentt(this._data.d.phc_Appt_Id)
   .subscribe(res=>{
      this.notif.successmsg("Record Deleted Successfully")
   })
}
}