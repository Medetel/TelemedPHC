import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-network',
  templateUrl: './view-network.component.html',
  styleUrls: ['./view-network.component.scss']
})
export class ViewNetworkComponent implements OnInit {
  network:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder) { 
    this.network=this.fb.group({
      'nE_Description':[this._data.d.nE_Description],
      'nE_Code':[this._data.d.nE_Code]
    })
  }

  ngOnInit(): void {
    this.disable();
  }
  disable(){
    this.network.controls['nE_Description'].disable();
    this.network.controls['nE_Code'].disable();
  }
}
