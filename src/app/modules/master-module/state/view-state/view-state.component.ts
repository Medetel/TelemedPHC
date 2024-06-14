import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-state',
  templateUrl: './view-state.component.html',
  styleUrls: ['./view-state.component.scss']
})
export class ViewStateComponent implements OnInit {
  state:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder) { 
    this.state=this.fb.group({
      'country_name':[this._data.d.country_name],
      'state_name':[this._data.d.state_name],
      'state_code':[this._data.d.state_code]
    })
  }

  ngOnInit(): void {
    this.disable();
  }
  disable(){
    this.state.controls['country_name'].disable();
    this.state.controls['state_name'].disable();
    this.state.controls['state_code'].disable();
  }
}
