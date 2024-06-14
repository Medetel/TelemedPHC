import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DiagnosisService } from '../diagnosis.service';

@Component({
  selector: 'app-edit-diagnosis',
  templateUrl: './edit-diagnosis.component.html',
  styleUrls: ['./edit-diagnosis.component.scss']
})
export class EditDiagnosisComponent implements OnInit {
  diagnosis: FormGroup;
  diagnosisdd: any;
  constructor(private dialogRef: MatDialogRef<EditDiagnosisComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private fb: FormBuilder, private service: DiagnosisService, private notif: Notification) {
    this.diagnosis = this.fb.group({
      
      'dD_Id': [''],
      'dD_Desc': ['', [Validators.required, this.alphaValidator, this.spaceValidator]],
      'dD_Code': [''],
      'dD_Master': [''],
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
    return this.diagnosis.controls[controlName].hasError(errorName);
  }
  ngOnInit(): void {
    this.bind();
    this.Get_diagnosis_Catdd();
  }
  bind() {
    this.diagnosis.controls['dD_Id'].setValue(this._data.d.dD_Id)
    this.diagnosis.controls['dD_Master'].setValue(this._data.d.dD_Master)
    this.diagnosis.controls['dD_Desc'].setValue(this._data.d.dD_Desc)
    this.diagnosis.controls['dD_Code'].setValue(this._data.d.dD_Code)
    this.diagnosis.controls['dD_Code'].disable();
    this.diagnosis.controls['dD_Master'].disable();
  }
  Get_diagnosis_Catdd() {
    this.service.Get_diagnosis_Catdd()
      .subscribe((data) => {
        this.diagnosisdd = data
      })
  }
  updateform() {
    var diagnosisData: any;
    if (this.diagnosis.invalid) {
      return
    }
    diagnosisData = {
      
      dD_Id: this._data.d.dD_Id,
      dD_Code: this._data.d.dD_Code,
      dD_Master: this._data.d.dD_Master,
      dD_Desc: this.diagnosis.value.dD_Desc
    }

    this.service.Put_diagnosis(diagnosisData)
      .subscribe((res) => {
        this.notif.successmsg("Diagnosis updated successfully")
        this.dialogRef.close();
        window.location.reload();
      })
  }
}
