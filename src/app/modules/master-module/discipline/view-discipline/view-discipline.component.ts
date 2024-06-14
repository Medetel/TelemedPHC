import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-discipline',
  templateUrl: './view-discipline.component.html',
  styleUrls: ['./view-discipline.component.scss']
})
export class ViewDisciplineComponent implements OnInit {
  discipline:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder) { 
    this.discipline=this.fb.group({
      'cD_ClinicalDiscipline':[this._data.d.cD_ClinicalDiscipline],
      'cD_Code':[this._data.d.cD_Code]
    })
  }

  ngOnInit(): void {
    this.disable();
  }
  disable(){
    this.discipline.controls['cD_ClinicalDiscipline'].disable();
    this.discipline.controls['cD_Code'].disable();
  }
}
 