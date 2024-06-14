import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DrugserviceService } from '../../drugs/drugservice.service';

@Component({
  selector: 'app-view-diagnostictest',
  templateUrl: './view-diagnostictest.component.html',
  styleUrls: ['./view-diagnostictest.component.scss']
})
export class ViewDiagnostictestComponent implements OnInit {
  diagnostictest: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb:FormBuilder,public service: DrugserviceService) {
    this.diagnostictest=this.fb.group({
      'dT_Code':[this._data.d.dT_Code],
      'dT_Type':[this._data.d.type_Name],
      'dT_Category':[this._data.d.cat_Name],
      'dT_Desc':[this._data.d.dT_Desc],
      })
   }

  ngOnInit(): void {
    this.disable();
  }

  disable(){
    this.diagnostictest.controls['dT_Code'].disable();
    this.diagnostictest.controls['dT_Type'].disable();
    this.diagnostictest.controls['dT_Category'].disable();
    this.diagnostictest.controls['dT_Desc'].disable();
  }

}
