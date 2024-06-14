import { Component, Inject, OnInit } from '@angular/core';
import { ManualAppointmentService } from '../../manual-appointment/manual-appointment.service';
import { Notification } from 'src/app/core/Notifications/Notification';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-appoinment-reject',
  templateUrl: './appoinment-reject.component.html',
  styleUrls: ['./appoinment-reject.component.scss']
})
export class AppoinmentRejectComponent implements OnInit {
  enable=true;
  insurer: any;
  insuranceCategory: any;
  constructor(private dialogRef: MatDialogRef<AppoinmentRejectComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private _service:ManualAppointmentService,private notif: Notification) { }

  ngOnInit(): void {
  }  
//   delete(){
//     this.enable = false;
//     const appointmentIdToDelete = this._data.d.appt_Type === 'REFERRALS' ? this._data.d.phc_appt_id : this._data.d.appt_Id;
//     this._service.Delete_manualAppointment(appointmentIdToDelete)
//    .subscribe(res=>{
//       this.notif.successmsg("Record Deleted Successfully")
//       this.dialogRef.close();
//       window.location.reload(); 
      
//    })
// }
  delete() {
    // Call the delete method based on appt_Type value
    this.enable = false;
    if (this._data.d.appt_Type === 'REFERRALS' || this._data.d.appt_Id === 0) {
      this.deleteReferralAppointment(this._data.d.phc_appt_id);
    } else {
      this.deleteRegularAppointment(this._data.d.appt_Id);
    }
  }

  deleteReferralAppointment(phcApptId: number) {
    this._service.Delete_manualAppointmentByPHC(phcApptId)
      .subscribe(
        (response) => {
          this.notif.successmsg('Appointment Deleted Successfully');
          // Optionally, update your view or perform other actions
          this.dialogRef.close();
          window.location.reload(); 
        },
        (error) => {
          this.notif.errorsmsg('Failed to Delete Appointment');
          console.error(error);
        }
      );
  }

  deleteRegularAppointment(apptId: number) {
    this._service.Delete_manualAppointment(apptId)
      .subscribe(
        (response) => {
          this.notif.successmsg('Appointment Deleted Successfully');
          // Optionally, update your view or perform other actions
          this.dialogRef.close();
          window.location.reload();
        },
        (error) => {
          this.notif.errorsmsg('Failed to Delete Appointment');
          console.error(error);
        }
      );
  }
}

