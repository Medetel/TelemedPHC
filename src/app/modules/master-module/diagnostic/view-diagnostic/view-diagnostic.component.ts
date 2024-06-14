import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiagnosticService } from '../diagnostic.service';

@Component({
  selector: 'app-view-diagnostic',
  templateUrl: './view-diagnostic.component.html',
  styleUrls: ['./view-diagnostic.component.scss']
})
export class ViewDiagnosticComponent implements OnInit {

  Image_Url;
  MOU_Url;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any, private service: DiagnosticService) { }
  diagnostic = new FormGroup({
    dgstC_Name: new FormControl(''),
    dgstC_Code: new FormControl(''),
    gstNoOrPANno: new FormControl(''),
    regNo: new FormControl(''),
    dgstC_Type_Id: new FormControl(''),
    dgstC_Branch: new FormControl(''),
    dgstC_Email: new FormControl(''),
    dgstC_MobileNumber: new FormControl(''),
    dgstC_Address: new FormControl(''),
    primaryOrBranch: new FormControl(''),
    dgstC_COUN_Id_FK: new FormControl(''),
    dgstC_ST_Id_FK: new FormControl(''),
    dgstC_DI_Id_FK: new FormControl(''),
    dgstC_TL_Id_FK: new FormControl(''),
    dgstC_PostalCode: new FormControl(''),
    dgstC_web_url: new FormControl(''),
    dgstC_NE_Id: new FormControl(''),
    dgstC_Village: new FormControl(''),
    dgstC_AlterNumber: new FormControl(''),
    dgstC_LandLineNo: new FormControl(''),
    DGSTC_Logo: new FormControl(''),

  })

  ngOnInit(): void {
    this.bind();
    this.disable();
  }

  bind() {

    this.diagnostic.controls['gstNoOrPANno'].setValue(this._data.d.gstNoOrPANno);
    this.diagnostic.controls['regNo'].setValue(this._data.d.regNo == 0 ? undefined : this._data.d.regNo);
    this.diagnostic.controls['dgstC_Name'].setValue(this._data.d.dgstC_Name);
    this.diagnostic.controls['dgstC_Code'].setValue(this._data.d.dgstC_Code);
    this.diagnostic.controls['dgstC_Type_Id'].setValue(this._data.d.type);
    this.diagnostic.controls['dgstC_Branch'].setValue(this._data.d.branch_name);
    this.diagnostic.controls['dgstC_Email'].setValue(this._data.d.dgstC_Email);
    this.diagnostic.controls['dgstC_MobileNumber'].setValue(this._data.d.dgstC_MobileNumber);
    this.diagnostic.controls['dgstC_Address'].setValue(this._data.d.dgstC_Address);
    this.diagnostic.controls['primaryOrBranch'].setValue(this._data.d.primaryOrBranch);
    this.diagnostic.controls['dgstC_COUN_Id_FK'].setValue(this._data.d.country_name);
    this.diagnostic.controls['dgstC_ST_Id_FK'].setValue(this._data.d.state_name);
    this.diagnostic.controls['dgstC_DI_Id_FK'].setValue(this._data.d.district_name);
    this.diagnostic.controls['dgstC_TL_Id_FK'].setValue(this._data.d.taluk_name);
    this.diagnostic.controls['dgstC_PostalCode'].setValue(this._data.d.dgstC_PostalCode);
    this.diagnostic.controls['dgstC_web_url'].setValue(this._data.d.dgstC_web_url);
    this.diagnostic.controls['dgstC_NE_Id'].setValue(this._data.d.nE_Description);
    this.diagnostic.controls['dgstC_Village'].setValue(this._data.d.dgstC_Village);
    this.diagnostic.controls['dgstC_AlterNumber'].setValue(this._data.d.dgstC_AlterNumber == 0 ? undefined : this._data.d.dgstC_AlterNumber);
    this.diagnostic.controls['dgstC_LandLineNo'].setValue(this._data.d.dgstC_LandLineNo == 0 ? undefined : this._data.d.dgstC_LandLineNo);
    this.MOU_Url = this._data.d.mouDocument;
    this.Image_Url = this._data.d.dgstC_Image;
  }
  disable() {
    this.diagnostic.controls['gstNoOrPANno'].disable();
    this.diagnostic.controls['regNo'].disable();
    this.diagnostic.controls['dgstC_Name'].disable();
    this.diagnostic.controls['dgstC_Code'].disable();
    this.diagnostic.controls['dgstC_Type_Id'].disable();
    this.diagnostic.controls['dgstC_Branch'].disable();
    this.diagnostic.controls['dgstC_Email'].disable();
    this.diagnostic.controls['dgstC_MobileNumber'].disable();
    this.diagnostic.controls['dgstC_Address'].disable();
    this.diagnostic.controls['primaryOrBranch'].disable();
    this.diagnostic.controls['dgstC_COUN_Id_FK'].disable();
    this.diagnostic.controls['dgstC_ST_Id_FK'].disable();
    this.diagnostic.controls['dgstC_DI_Id_FK'].disable();
    this.diagnostic.controls['dgstC_TL_Id_FK'].disable();
    this.diagnostic.controls['dgstC_PostalCode'].disable();
    this.diagnostic.controls['dgstC_web_url'].disable();
    this.diagnostic.controls['dgstC_NE_Id'].disable();
    this.diagnostic.controls['dgstC_Village'].disable();
    this.diagnostic.controls['dgstC_AlterNumber'].disable();
    this.diagnostic.controls['dgstC_LandLineNo'].disable();
  }

}
