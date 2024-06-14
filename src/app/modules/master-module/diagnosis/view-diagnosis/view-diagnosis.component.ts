import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-diagnosis',
  templateUrl: './view-diagnosis.component.html',
  styleUrls: ['./view-diagnosis.component.scss']
})
export class ViewDiagnosisComponent implements OnInit {

  diagnosis: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any, private fb: FormBuilder) {
    this.diagnosis = this.fb.group({
      'dD_Desc': [this._data.d.dD_Desc],
      'dM_Name': [this._data.d.dM_Name],
      'dD_Code': [this._data.d.dD_Code]
    })
  }

  ngOnInit(): void {
    this.disable();
  }
  disable() {
    this.diagnosis.controls['dD_Desc'].disable();
    this.diagnosis.controls['dM_Name'].disable();
    this.diagnosis.controls['dD_Code'].disable();
  }
}
