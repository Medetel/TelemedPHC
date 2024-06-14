import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-assistant',
  templateUrl: './view-assistant.component.html',
  styleUrls: ['./view-assistant.component.scss']
})
export class ViewAssistantComponent implements OnInit {
  Image_Url;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any) { }
  assistant = new FormGroup({
    Assi_Photo: new FormControl(''),
    Assi_FirstName: new FormControl(''),
    Assi_LastName: new FormControl(''),
    Assi_DOB: new FormControl(''),
    Assi_code: new FormControl(''),
    Assi_Gender: new FormControl(''),
    Assi_MobileNumber: new FormControl(''),
    Assi_AlternativeNumber: new FormControl(''),
    Assi_LandLineNumber: new FormControl(''),
    Assi_Email: new FormControl(''),
    Assi_Address: new FormControl(''),
    Assi_Hos_Id_FK: new FormControl(''),
    Assi_Qua_Id_FK: new FormControl(''),
    Assi_Des_Id_FK: new FormControl(''),
    Assi_Skill_Desc: new FormControl(''),
    Assi_Country_Id_FK: new FormControl(''),
    Assi_ST_Id_FK: new FormControl(''),
    Assi_DI_Id_FK: new FormControl(''),
    Taluk_Id_Fk: new FormControl(''),
    Gram_Id_Fk: new FormControl(''),
    Assi_PostalCode: new FormControl('')
  })
  ngOnInit(): void {
    this.disable();
    this.bind();   
    this.Image_Url = this._data.d.assi_Image; 
  }
  
  bind() {
    const ass_DOB = new DatePipe('en-US').transform(this._data.d.assi_DOB, 'dd/MM/yyyy')
    this.assistant.controls['Assi_FirstName'].setValue(this._data.d.assi_FirstName);
    this.assistant.controls['Assi_LastName'].setValue(this._data.d.assi_LastName);
    this.assistant.controls['Assi_DOB'].setValue(ass_DOB);
    this.assistant.controls['Assi_code'].setValue(this._data.d.assi_code);
    this.assistant.controls['Assi_Gender'].setValue(this._data.d.assi_Gender);
    this.assistant.controls['Assi_MobileNumber'].setValue(this._data.d.assi_MobileNumber);
    this.assistant.controls['Assi_AlternativeNumber'].setValue(this._data.d.assi_AlternativeNumber === 'null' ? '' :this._data.d.assi_AlternativeNumber);
    this.assistant.controls['Assi_LandLineNumber'].setValue(this._data.d.assi_LandLineNumber === 'null' ? '' :this._data.d.assi_LandLineNumber);
    this.assistant.controls['Assi_Email'].setValue(this._data.d.assi_Email);
    this.assistant.controls['Assi_Address'].setValue(this._data.d.assi_Address);
    this.assistant.controls['Assi_Hos_Id_FK'].setValue(this._data.d.assi_Hos_HospitalName);
    this.assistant.controls['Assi_Qua_Id_FK'].setValue(this._data.d.assi_qualification);
    this.assistant.controls['Assi_Des_Id_FK'].setValue(this._data.d.assi_Designation);
    this.assistant.controls['Assi_Skill_Desc'].setValue(this._data.d.assi_Skill_Desc);
    this.assistant.controls['Assi_Country_Id_FK'].setValue(this._data.d.assi_Country_name);
    this.assistant.controls['Assi_ST_Id_FK'].setValue(this._data.d.state_name);
    this.assistant.controls['Assi_DI_Id_FK'].setValue(this._data.d.district_name);
    this.assistant.controls['Taluk_Id_Fk'].setValue(this._data.d.taluk_name);
    //this.assistant.controls['Gram_Id_Fk'].setValue(this._data.d.gram_name);
    this.assistant.controls['Gram_Id_Fk'].setValue(this._data.d.assi_Village);
    this.assistant.controls['Assi_PostalCode'].setValue(this._data.d.assi_PostalCode);
  }

  disable() {
    this.assistant.controls['Assi_FirstName'].disable();
    this.assistant.controls['Assi_LastName'].disable();
    this.assistant.controls['Assi_DOB'].disable();
    this.assistant.controls['Assi_code'].disable();
    this.assistant.controls['Assi_Gender'].disable();
    this.assistant.controls['Assi_MobileNumber'].disable();
    this.assistant.controls['Assi_AlternativeNumber'].disable();
    this.assistant.controls['Assi_LandLineNumber'].disable();
    this.assistant.controls['Assi_Email'].disable();
    this.assistant.controls['Assi_Address'].disable();
    this.assistant.controls['Assi_Hos_Id_FK'].disable();
    this.assistant.controls['Assi_Qua_Id_FK'].disable();
    this.assistant.controls['Assi_Des_Id_FK'].disable();
    this.assistant.controls['Assi_Skill_Desc'].disable();
    this.assistant.controls['Assi_Country_Id_FK'].disable();
    this.assistant.controls['Assi_ST_Id_FK'].disable();
    this.assistant.controls['Assi_DI_Id_FK'].disable();
    this.assistant.controls['Taluk_Id_Fk'].disable();
    this.assistant.controls['Gram_Id_Fk'].disable();
    this.assistant.controls['Assi_PostalCode'].disable();
  }
}
