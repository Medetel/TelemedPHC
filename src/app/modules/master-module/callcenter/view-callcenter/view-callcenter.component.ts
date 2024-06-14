import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-callcenter',
  templateUrl: './view-callcenter.component.html',
  styleUrls: ['./view-callcenter.component.scss']
})
export class ViewCallcenterComponent implements OnInit {
  Image_Url;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any) { }
  callcenter = new FormGroup({
    Call_Ag_Photo: new FormControl(''),
    Call_Ag_FirstName: new FormControl(''),
    Call_Ag_LastName: new FormControl(''),
    Call_Ag_DOB: new FormControl(''),
    Call_Ag_code: new FormControl(''),
    Call_Ag_Gender: new FormControl(''),
    Call_Ag_MobileNumber: new FormControl(''),
    Call_Ag_AlternativeNumber: new FormControl(''),
    Call_Ag_LandLineNumber: new FormControl(''),
    Call_Ag_Email: new FormControl(''),
    Call_Ag_Address: new FormControl(''),
    Call_Ag_Hos_Id: new FormControl(''),
    Call_Ag_Qua_Id: new FormControl(''),
    Call_Ag_Des_Id: new FormControl(''),
    // Assi_skill_id: new FormControl(''),
    Call_Ag_Country_Id: new FormControl(''),
    Call_Ag_ST_Id: new FormControl(''),
    Call_Ag_DI_Id: new FormControl(''),
    taluk_Id_Fk: new FormControl(''),
    gram_Id_Fk: new FormControl(''),
    Call_Ag_Village: new FormControl(''),
    Call_Ag_PostalCode: new FormControl(''),
    Call_Ag_Skill_Desc: new FormControl(''),

  })
  ngOnInit(): void {
    this.disable();
    this.bind();
    this.Image_Url = this._data.d.call_Ag_Image;
  }

  bind() {
    const ass_DOB = new DatePipe('en-US').transform(this._data.d.call_Ag_DOB, 'dd/MM/yyyy')
    this.callcenter.controls['Call_Ag_FirstName'].setValue(this._data.d.call_Ag_FirstName);
    this.callcenter.controls['Call_Ag_LastName'].setValue(this._data.d.call_Ag_LastName);
    this.callcenter.controls['Call_Ag_DOB'].setValue(ass_DOB);
    this.callcenter.controls['Call_Ag_code'].setValue(this._data.d.call_Ag_code);
    this.callcenter.controls['Call_Ag_Gender'].setValue(this._data.d.call_Ag_Gender);
    this.callcenter.controls['Call_Ag_MobileNumber'].setValue(this._data.d.call_Ag_MobileNumber);
    this.callcenter.controls['Call_Ag_AlternativeNumber'].setValue(this._data.d.call_Ag_AlternativeNumber === 'null' ? '' : this._data.d.call_Ag_AlternativeNumber);
    this.callcenter.controls['Call_Ag_LandLineNumber'].setValue(this._data.d.call_Ag_LandLineNumber === 'null' ? '' : this._data.d.call_Ag_LandLineNumber);
    this.callcenter.controls['Call_Ag_Email'].setValue(this._data.d.call_Ag_Email);
    this.callcenter.controls['Call_Ag_Address'].setValue(this._data.d.call_Ag_Address);
    this.callcenter.controls['Call_Ag_Hos_Id'].setValue(this._data.d.call_Ag_Hos_HospitalName);
    this.callcenter.controls['Call_Ag_Qua_Id'].setValue(this._data.d.call_Ag_qualification);
    this.callcenter.controls['Call_Ag_Des_Id'].setValue(this._data.d.call_Ag_Designation);
    this.callcenter.controls['Call_Ag_Country_Id'].setValue(this._data.d.call_Ag_Country_name);
    this.callcenter.controls['Call_Ag_ST_Id'].setValue(this._data.d.state_name);
    this.callcenter.controls['Call_Ag_DI_Id'].setValue(this._data.d.district_name);
    this.callcenter.controls['taluk_Id_Fk'].setValue(this._data.d.taluk_name);
    // this.callcenter.controls['gram_Id_Fk'].setValue(this._data.d.gram_Id_Fk);
    this.callcenter.controls['Call_Ag_Village'].setValue(this._data.d.call_Ag_Village);
    this.callcenter.controls['Call_Ag_PostalCode'].setValue(this._data.d.call_Ag_PostalCode);
    this.callcenter.controls['Call_Ag_Skill_Desc'].setValue(this._data.d.call_Ag_Skill_Desc);
  }

  disable() {
    this.callcenter.controls['Call_Ag_FirstName'].disable();
    this.callcenter.controls['Call_Ag_LastName'].disable();
    this.callcenter.controls['Call_Ag_DOB'].disable();
    this.callcenter.controls['Call_Ag_code'].disable();
    this.callcenter.controls['Call_Ag_Gender'].disable();
    this.callcenter.controls['Call_Ag_MobileNumber'].disable();
    this.callcenter.controls['Call_Ag_AlternativeNumber'].disable();
    this.callcenter.controls['Call_Ag_LandLineNumber'].disable();
    this.callcenter.controls['Call_Ag_Email'].disable();
    this.callcenter.controls['Call_Ag_Address'].disable();
    this.callcenter.controls['Call_Ag_Hos_Id'].disable();
    this.callcenter.controls['Call_Ag_Qua_Id'].disable();
    this.callcenter.controls['Call_Ag_Des_Id'].disable();
    this.callcenter.controls['Call_Ag_Country_Id'].disable();
    this.callcenter.controls['Call_Ag_ST_Id'].disable();
    this.callcenter.controls['Call_Ag_DI_Id'].disable();
    this.callcenter.controls['taluk_Id_Fk'].disable();
    // this.callcenter.controls['gram_Id_Fk'].disable();
    this.callcenter.controls['Call_Ag_Village'].disable();
    this.callcenter.controls['Call_Ag_PostalCode'].disable();
    this.callcenter.controls['Call_Ag_Skill_Desc'].disable();
  }
}
