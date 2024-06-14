import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-taluk',
  templateUrl: './view-taluk.component.html',
  styleUrls: ['./view-taluk.component.scss']
})
export class ViewTalukComponent implements OnInit {
  district:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder) { 
    this.district=this.fb.group({
      'taluk_code':[this._data.d.taluk_code],
      'taluk_name':[this._data.d.taluk_name],
      'state_name':[this._data.d.state_name],
      'cntry_name':[this._data.d.cntry_name],
      'district_name':[this._data.d.district_name],
     
    })
  }

  ngOnInit(): void {
    this.disable();
  }
  disable(){
    this.district.controls['taluk_code'].disable();
    this.district.controls['taluk_name'].disable();
    this.district.controls['state_name'].disable();
    this.district.controls['district_name'].disable();
    this.district.controls['cntry_name'].disable();
   
  }

}
