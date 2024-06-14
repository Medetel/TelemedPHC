import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-qualification',
  templateUrl: './view-qualification.component.html',
  styleUrls: ['./view-qualification.component.scss']
})
export class ViewQualificationComponent implements OnInit {
  qualification:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder) { 
    this.qualification=this.fb.group({
      'qualification_Name':[this._data.d.qualification_Name],
      'qualification_code':[this._data.d.qualification_code]
    })
  }

  ngOnInit(): void {
    this.disable();
  }
  disable(){
    this.qualification.controls['qualification_Name'].disable();
    this.qualification.controls['qualification_code'].disable();
  }
}
