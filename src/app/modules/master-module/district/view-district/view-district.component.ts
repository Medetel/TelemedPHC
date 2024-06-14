import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-district',
  templateUrl: './view-district.component.html',
  styleUrls: ['./view-district.component.scss']
})
export class ViewDistrictComponent implements OnInit {
  district:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder) { 
    this.district=this.fb.group({
      'state_name':[this._data.d.state_name],
      'district_name':[this._data.d.district_name],
      'district_code':[this._data.d.district_code]
    })
  }

  ngOnInit(): void {
    this.disable();
  }
  disable(){
    this.district.controls['state_name'].disable();
    this.district.controls['district_name'].disable();
    this.district.controls['district_code'].disable();
  }
}
