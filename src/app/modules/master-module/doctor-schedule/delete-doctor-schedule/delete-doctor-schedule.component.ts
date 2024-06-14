import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { PartnerService } from '../../partner.service';

@Component({
  selector: 'app-delete-doctor-schedule',
  templateUrl: './delete-doctor-schedule.component.html',
  styleUrls: ['./delete-doctor-schedule.component.scss']
})
export class DeleteDoctorScheduleComponent implements OnInit {

  constructor(private service:PartnerService,private dialogRef: MatDialogRef<DeleteDoctorScheduleComponent>,@Inject(MAT_DIALOG_DATA) private data: any,private notif: Notification) { }

  ngOnInit(): void {
  }

  delete() {
    console.log(this.data)
    this.service.delete_schedule(this.data.id)
      .subscribe((res) => {
        this.notif.successmsg("Schedule deleted successfully");
        this.dialogRef.close();
        window.location.reload(); 
      })
  }
}
