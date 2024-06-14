import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-gram',
  templateUrl: './view-gram.component.html',
  styleUrls: ['./view-gram.component.scss']
})
export class ViewGramComponent implements OnInit {
  gram:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder) { 
    this.gram=this.fb.group({
      'gram_code':[this._data.d.gram_code],
      'cntry_name':[this._data.d.cntry_name],
      'state_name':[this._data.d.state_name],
      'dist_name':[this._data.d.dist_name],
      'taluk_name':[this._data.d.taluk_name],
      'gram_name':[this._data.d.gram_name],
      'postal_Code':[this._data.d.postal_Code]
    })
  }
  ngOnInit(): void {
    this.disable();
    // console.log('view :' +JSON.stringify(this._data.d))
  }
  disable(){
    this.gram.controls['gram_code'].disable();
    this.gram.controls['gram_name'].disable();
    this.gram.controls['cntry_name'].disable();
    this.gram.controls['state_name'].disable();
    this.gram.controls['dist_name'].disable();
    this.gram.controls['taluk_name'].disable();
    this.gram.controls['postal_Code'].disable();
  }
}