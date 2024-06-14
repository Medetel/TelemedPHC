import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-designation',
  templateUrl: './view-designation.component.html',
  styleUrls: ['./view-designation.component.scss']
})
export class ViewDesignationComponent implements OnInit {
  designation:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder) { 
    this.designation=this.fb.group({
      'designation_desc':[this._data.d.designation_desc],
      'designation_code':[this._data.d.designation_code]
    })
  }

  ngOnInit(): void {
    this.disable();
  }
  disable(){
    this.designation.controls['designation_desc'].disable();
    this.designation.controls['designation_code'].disable();
  }
}
