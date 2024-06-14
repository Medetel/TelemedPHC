import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-specialist-doctor',
  templateUrl: './view-specialist-doctor.component.html',
  styleUrls: ['./view-specialist-doctor.component.scss']
})
export class ViewSpecialistDoctorComponent implements OnInit {
  specialistdoc: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any, private fb: FormBuilder) {
    this.specialistdoc = this.fb.group({
      'sD_ClinicalSpecilist': [this._data.d.sD_ClinicalSpecilist],
      'sD_Code': [this._data.d.sD_Code]
    })
  }

  ngOnInit(): void {
    this.disable();
  }
  disable() {
    this.specialistdoc.controls['sD_ClinicalSpecilist'].disable();
    this.specialistdoc.controls['sD_Code'].disable();
  }
}
