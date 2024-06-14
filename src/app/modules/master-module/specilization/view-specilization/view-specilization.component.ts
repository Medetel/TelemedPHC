import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-specilization',
  templateUrl: './view-specilization.component.html',
  styleUrls: ['./view-specilization.component.scss']
})

export class ViewSpecilizationComponent implements OnInit {
  specilization: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any, private fb: FormBuilder) {
    this.specilization = this.fb.group({
      'spc_Name': [this._data.d.spc_Name],
      'sP_Specialization': [this._data.d.sP_Specialization],
      'sP_Code': [this._data.d.sP_Code]
    })
  }

  ngOnInit(): void {
    this.disable();
  }
  disable() {
    this.specilization.controls['spc_Name'].disable();
    this.specilization.controls['sP_Specialization'].disable();
    this.specilization.controls['sP_Code'].disable();
  }
}
