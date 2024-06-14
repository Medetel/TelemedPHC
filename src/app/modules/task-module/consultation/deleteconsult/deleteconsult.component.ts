import { Component, Inject, OnInit } from '@angular/core';
import { CounsultationService } from '../counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteconsult',
  templateUrl: './deleteconsult.component.html',
  styleUrls: ['./deleteconsult.component.scss']
})
export class DeleteconsultComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteconsultComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private service:CounsultationService,private notif:Notification) { }

  ngOnInit(): void {
  }
  delete()
  {
    this.service.Delete_consultation(this._data.d.coN_Id)
    .subscribe(res=>{
      this.notif.successmsg("Record Deleted Successfully")
      this.dialogRef.close();
        window.location.reload(); 
   })
  }

}
