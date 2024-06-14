import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DiagnosisService } from '../diagnosis.service';

@Component({
  selector: 'app-approve-diagnosis',
  templateUrl: './approve-diagnosis.component.html',
  styleUrls: ['./approve-diagnosis.component.scss']
})
export class ApproveDiagnosisComponent implements OnInit {
  diagnosis: FormGroup;
  constructor(private dialogRef: MatDialogRef<ApproveDiagnosisComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private fb: FormBuilder, private service: DiagnosisService, private notif: Notification) {
    this.diagnosis = this.fb.group({
      'dD_Desc': [this._data.d.dD_Desc],
      'dM_Name': [this._data.d.dM_Name],
      'dD_Code': [this._data.d.dD_Code],
      'dD_Id': [''],
      'Remarks': [''],
    })
  }

  ngOnInit(): void {
    this.disable();
    this.bind();
  }
  disable() {
    this.diagnosis.controls['dD_Desc'].disable();
    this.diagnosis.controls['dD_Code'].disable();
    this.diagnosis.controls['dM_Name'].disable();
  }
  bind() {
    this.diagnosis.controls['dD_Id'].setValue(this._data.d.dD_Id)
  }
  approveform() {
    this.service.Put_diagnosisApproval(this.diagnosis.value)
      .subscribe((res) => {
        this.notif.successmsg("Diagnosis Approved Successfully")
        this.dialogRef.close();
        window.location.reload();
      })

  }
}
