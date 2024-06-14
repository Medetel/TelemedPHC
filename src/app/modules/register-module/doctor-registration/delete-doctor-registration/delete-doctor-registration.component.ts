import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DoctorRegistrationService } from '../doctor-registration.service';

@Component({
  selector: 'app-delete-doctor-registration',
  templateUrl: './delete-doctor-registration.component.html',
  styleUrls: ['./delete-doctor-registration.component.scss']
})
export class DeleteDoctorRegistrationComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteDoctorRegistrationComponent>,@Inject(MAT_DIALOG_DATA) private _data: any, private service: DoctorRegistrationService, private notif: Notification) { }

  ngOnInit(): void {
  }
  delete() {
    this.service.Delete_Doctor(this._data.d.dO_Id)
      .subscribe((res) => {
        this.notif.successmsg("Doctor Deleted Successfully")
        this.dialogRef.close();
        window.location.reload(); 
      })
  }
}
