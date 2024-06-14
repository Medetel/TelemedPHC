import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { PHCManualAppointService } from '../../phc-manual-appoint.service';

@Component({
  selector: 'app-delete-phc-manual-appoinment',
  templateUrl: './delete-phc-manual-appoinment.component.html',
  styleUrls: ['./delete-phc-manual-appoinment.component.scss']
})
export class DeletePhcManualAppoinmentComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeletePhcManualAppoinmentComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private _service:PHCManualAppointService,private notif:Notification) { }

  ngOnInit(): void {
  }

  delete(){
    this._service.Delete_appointmentt(this._data.d.phc_Appt_Id)
    .subscribe(res=>{
       this.notif.successmsg("Record Deleted Successfully")
       this.dialogRef.close();
       window.location.reload(); 
    })
 }

}
