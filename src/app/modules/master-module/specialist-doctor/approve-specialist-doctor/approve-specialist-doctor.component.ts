import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApproveDisciplineComponent } from '../../discipline/approve-discipline/approve-discipline.component';
import { SpecialistDoctorService } from '../specialist-doctor.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-approve-specialist-doctor',
  templateUrl: './approve-specialist-doctor.component.html',
  styleUrls: ['./approve-specialist-doctor.component.scss']
})
export class ApproveSpecialistDoctorComponent implements OnInit {
  specialistdoc: FormGroup;
  constructor(private dialogRef: MatDialogRef<ApproveSpecialistDoctorComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private fb: FormBuilder, private service: SpecialistDoctorService, private notif: Notification) {
    this.specialistdoc = this.fb.group({
      'sD_ClinicalSpecilist': [this._data.d.sD_ClinicalSpecilist],
      'sD_Code': [this._data.d.sD_Code],
      'sD_Id': [''],
      'Remarks': [''],
    })
  }

  ngOnInit(): void {
    this.disable();
    this.bind();
  }
  disable() {
    this.specialistdoc.controls['sD_ClinicalSpecilist'].disable();
    this.specialistdoc.controls['sD_Code'].disable();
  }
  bind() {
    this.specialistdoc.controls['sD_Id'].setValue(this._data.d.sD_Id)
  }
  approveform() {
    this.service.Put_specialistdocApproval(this.specialistdoc.value)
      .subscribe((res) => {
        this.notif.successmsg("Specilist Doctor Approved Successfully")
        this.dialogRef.close();
        window.location.reload();
      })

  }
}
