import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { PatientRegistrationService } from '../patient-registration.service';

@Component({
  selector: 'app-delete-patient-registration',
  templateUrl: './delete-patient-registration.component.html',
  styleUrls: ['./delete-patient-registration.component.scss']
})
export class DeletePatientRegistrationComponent implements OnInit {

  
  constructor(private dialogRef: MatDialogRef<DeletePatientRegistrationComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private service:PatientRegistrationService,private notif:Notification) { }

  ngOnInit(): void {
  }
delete(){
  this.service.Delete_Patient(this._data.d.pR_Id)
  .subscribe((res)=>{
    this.notif.successmsg("Patient Deleted Successfully");
    this.dialogRef.close();
    window.location.reload();
  })
}

}
