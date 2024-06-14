import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-country',
  templateUrl: './view-country.component.html',
  styleUrls: ['./view-country.component.scss']
})
export class ViewCountryComponent implements OnInit {
  country:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder) { 
    this.country=this.fb.group({
      'country_name':[this._data.d.country_name],
      'country_code':[this._data.d.country_code]
    })
  }

  ngOnInit(): void {
    this.disable();
  }
  disable(){
    this.country.controls['country_name'].disable();
    this.country.controls['country_code'].disable();
  }
  
}
