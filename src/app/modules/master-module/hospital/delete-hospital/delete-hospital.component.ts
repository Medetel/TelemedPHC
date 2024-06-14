import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-delete-hospital',
  templateUrl: './delete-hospital.component.html',
  styleUrls: ['./delete-hospital.component.scss']
})
export class DeleteHospitalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteHospitalComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private service:HospitalService,private notif:Notification) { }

  ngOnInit(): void {
  }

delete(){
  this.service.Delete_hospital(this._data.d.hos_Id)
  .subscribe((res)=>{
    this.notif.successmsg("Hospital Deleted Successfully")
    this.dialogRef.close();
    window.location.reload();
  })
}

}
