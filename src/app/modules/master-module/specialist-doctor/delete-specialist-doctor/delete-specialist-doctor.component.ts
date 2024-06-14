import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpecialistDoctorService } from '../specialist-doctor.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-delete-specialist-doctor',
  templateUrl: './delete-specialist-doctor.component.html',
  styleUrls: ['./delete-specialist-doctor.component.scss']
})
export class DeleteSpecialistDoctorComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<DeleteSpecialistDoctorComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private service: SpecialistDoctorService, private notif: Notification) { }

  ngOnInit(): void {
  }
  delete() {
    this.service.Delete_specialistdoc(this._data.d.sD_Id)
      .subscribe((res) => {
        this.notif.successmsg("Specialist Doctor deleted successfully")
        this.dialogRef.close();
        window.location.reload();
      })
  }

}
