import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { QualificationService } from '../qualification.service';

@Component({
  selector: 'app-approve-qualification',
  templateUrl: './approve-qualification.component.html',
  styleUrls: ['./approve-qualification.component.scss']
})
export class ApproveQualificationComponent implements OnInit {

  qualification: FormGroup;
  constructor(private dialogRef: MatDialogRef<ApproveQualificationComponent>,@Inject(MAT_DIALOG_DATA) private _data: any, private fb: FormBuilder, private service: QualificationService, private notif: Notification) {
    this.qualification = this.fb.group({
      'qualification_Name': [this._data.d.qualification_Name],
      'qualification_code': [this._data.d.qualification_code],
      'qualification_id': [''],
      'Remarks': ['']
    })
  }

  ngOnInit(): void {
    this.disable();
    this.bind();
  }
  disable() {
    this.qualification.controls['qualification_Name'].disable();
    this.qualification.controls['qualification_code'].disable();
  }
  bind() {
    this.qualification.controls['qualification_id'].setValue(this._data.d.qualification_id)
    this.qualification.controls['qualification_Name'].setValue(this._data.d.qualification_Name)
    this.qualification.controls['qualification_code'].setValue(this._data.d.qualification_code)
  }

  approveform() {
    this.service.Put_Approval(this.qualification.value)
      .subscribe((res) => {
        this.notif.successmsg("Qualification approved successfully")
        this.dialogRef.close();
        window.location.reload();
      })
  }

}
