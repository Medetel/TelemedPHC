import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-viewservicecharges',
  templateUrl: './viewservicecharges.component.html',
  styleUrls: ['./viewservicecharges.component.scss']
})
export class ViewservicechargesComponent implements OnInit {
 
viewservicecharge:FormGroup;
  test: any;

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder) {
    this.viewservicecharge=this.fb.group({
      'service_name':[this._data.d.service],
      'service_code':[this._data.d.serviceCode],
      'service_charge': [this._data.d.charges],
      'package_desc': [this._data.d.package_desc],
        'test_desc': [this._data.d.packageTestlist.map(test => test.test_desc)]
    })
  }
  ngOnInit(): void {
    this.disable();
  }
  disable(){
    this.viewservicecharge.controls['service_name'].disable();
    this.viewservicecharge.controls['service_code'].disable();
    this.viewservicecharge.controls['service_charge'].disable();
    this.viewservicecharge.controls['package_desc'].disable();
    this.viewservicecharge.controls['test_desc'].disable();
  }
   }


