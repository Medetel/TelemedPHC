import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpecialistDoctorService } from '../specialist-doctor.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-edit-specialist-doctor',
  templateUrl: './edit-specialist-doctor.component.html',
  styleUrls: ['./edit-specialist-doctor.component.scss']
})
export class EditSpecialistDoctorComponent implements OnInit {
  specialistdoc: FormGroup;
  constructor(private dialogRef: MatDialogRef<EditSpecialistDoctorComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private fb: FormBuilder, private service: SpecialistDoctorService, private notif: Notification) {
    this.specialistdoc = this.fb.group({
      'sD_Id': [''],
      'sD_ClinicalSpecilist': ['', [Validators.required, this.alphaValidator, this.spaceValidator]],
      'sD_Code': [''],
    })
  }
  alphaValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?0-9]/;
    if (control.value && nameRegexp.test(control.value)) {
      return { alphaCheck: true };
    }
  }
  spaceValidator(control: any): { [key: string]: boolean } {
    if ((control.value as string).indexOf('  ') >= 0 || control.value.startsWith(' ') || control.value.endsWith(' ')) {
      return { spaceCheck: true };
    }
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.specialistdoc.controls[controlName].hasError(errorName);
  }
  ngOnInit(): void {
    this.bind();
  }
  bind() {
    this.specialistdoc.controls['sD_Id'].setValue(this._data.d.sD_Id)
    this.specialistdoc.controls['sD_ClinicalSpecilist'].setValue(this._data.d.sD_ClinicalSpecilist)
    this.specialistdoc.controls['sD_Code'].setValue(this._data.d.sD_Code)
    this.specialistdoc.controls['sD_Code'].disable();
  }
  updateform() {
    var specialistData: any;
    if (this.specialistdoc.invalid) {
      return
    }
    specialistData = {
      sD_Id: this._data.d.sD_Id,
      sD_Code: this._data.d.sD_Code,
      sD_ClinicalSpecilist: this.specialistdoc.value.sD_ClinicalSpecilist
    }

    this.service.Put_specialistdoc(specialistData)
      .subscribe((res) => {
        this.notif.successmsg("Specialist Doctor updated successfully")
        this.dialogRef.close();
        window.location.reload();
      })
  }

}
