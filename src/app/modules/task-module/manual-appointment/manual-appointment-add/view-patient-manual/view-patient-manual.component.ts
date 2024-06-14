import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-patient-manual',
  templateUrl: './view-patient-manual.component.html',
  styleUrls: ['./view-patient-manual.component.scss']
})
export class ViewPatientManualComponent implements OnInit {

  Image_Url ;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any) { }
  patient = new FormGroup({
    PR_Photo:new FormControl(''),
    PR_PatientCode:new FormControl(''),
    PR_RemoteHospitalName_Id_FK:new FormControl(''),
    PR_FirstName:new FormControl(''),
    PR_LastName:new FormControl(''),
    PR_DOB:new FormControl(''),
    PR_Age:new FormControl(''),
    PR_Gender:new FormControl(''),
    PR_MobileNumber:new FormControl(''),
    PR_Alternative_No:new FormControl(''),
    PR_LandlineNo:new FormControl(''),
    PR_Email:new FormControl(''),
    PR_Address:new FormControl(''),
    PR_MaritalStatus:new FormControl(''),
    PR_FatherName:new FormControl(''),
    PR_Religion:new FormControl(''),
    PR_Nationality:new FormControl(''),
    PR_Caste:new FormControl(''),
    PR_BloodGroup:new FormControl(''),
    PR_MotherTongue:new FormControl(''),
    PR_Occupation:new FormControl(''),
    PR_Income:new FormControl(''),
    PR_Insurance:new FormControl(''),
    PR_PassportNo:new FormControl(''),
    PR_Country:new FormControl('India'),
    PR_S_Id_FK:new FormControl(''),
    PR_D_Id_FK:new FormControl(''),
    PR_Taluk:new FormControl(''),
    PR_Village:new FormControl(''),
    PR_Postalcode:new FormControl(''),

  })
  ngOnInit(): void {
    this.bind();
    this.disable();
    this.Image_Url= { url: `${environment.API_Base_URL}` +`Patient/GetPatient_Images?filename=${this._data.d.pR_Photo}`}
  }
  bind(){
    this.patient.controls['PR_PatientCode'].setValue(this._data.d.pR_PatientCode);
    this.patient.controls ['PR_RemoteHospitalName_Id_FK'].setValue(this._data.d.pR_RemoteHospitalName);
    this.patient.controls ['PR_FirstName'].setValue(this._data.d.pR_FirstName);
    this.patient.controls ['PR_LastName'].setValue(this._data.d.pR_LastName);
    this.patient.controls['PR_DOB'].setValue(this._data.d.pR_DOB);
    this.patient.controls['PR_Age'].setValue(this._data.d.pR_Age);
    this.patient.controls['PR_Gender'].setValue(this._data.d.pR_Gender);
    this.patient.controls['PR_MobileNumber'].setValue(this._data.d.pR_MobileNumber);
    this.patient.controls['PR_Alternative_No'].setValue(this._data.d.pR_Alternative_No);
    this.patient.controls['PR_LandlineNo'].setValue(this._data.d.pR_LandlineNo);
    this.patient.controls['PR_Email'].setValue(this._data.d.pR_Email);
    this.patient.controls['PR_Address'].setValue(this._data.d.pR_Address);
    this.patient.controls['PR_MaritalStatus'].setValue(this._data.d.pR_MaritalStatus);
    this.patient.controls['PR_FatherName'].setValue(this._data.d.pR_FatherName);
    this.patient.controls['PR_Religion'].setValue(this._data.d.pR_Religion);
    this.patient.controls['PR_Nationality'].setValue(this._data.d.pR_Nationality);
    this.patient.controls['PR_Caste'].setValue(this._data.d.pR_Caste);
    this.patient.controls['PR_BloodGroup'].setValue(this._data.d.pR_BloodGroup);
    this.patient.controls['PR_MotherTongue'].setValue(this._data.d.pR_MotherTongue);
    this.patient.controls['PR_Occupation'].setValue(this._data.d.pR_Occupation);
    this.patient.controls['PR_Income'].setValue(this._data.d.pR_Income);
    this.patient.controls['PR_Insurance'].setValue(this._data.d.pR_Insurance);
    this.patient.controls['PR_PassportNo'].setValue(this._data.d.pR_PassportNo);
    this.patient.controls['PR_Country'].setValue(this._data.d.pR_Country);
    this.patient.controls['PR_S_Id_FK'].setValue(this._data.d.pR_StateName);
    this.patient.controls['PR_D_Id_FK'].setValue(this._data.d.pR_District);
    this.patient.controls['PR_Taluk'].setValue(this._data.d.pR_Taluk);
    this.patient.controls['PR_Village'].setValue(this._data.d.pR_Village);
    this.patient.controls['PR_Postalcode'].setValue(this._data.d.pR_Postalcode);
  }
  disable(){
    this.patient.controls['PR_PatientCode'].disable();
    this.patient.controls ['PR_RemoteHospitalName_Id_FK'].disable();
    this.patient.controls ['PR_FirstName'].disable();
    this.patient.controls ['PR_LastName'].disable();
    this.patient.controls['PR_DOB'].disable();
    this.patient.controls['PR_Age'].disable();
    this.patient.controls['PR_Gender'].disable();
    this.patient.controls['PR_MobileNumber'].disable();
    this.patient.controls['PR_Alternative_No'].disable();
    this.patient.controls['PR_LandlineNo'].disable();
    this.patient.controls['PR_Email'].disable();
    this.patient.controls['PR_Address'].disable();
    this.patient.controls['PR_MaritalStatus'].disable();
    this.patient.controls['PR_FatherName'].disable();
    this.patient.controls['PR_Religion'].disable();
    this.patient.controls['PR_Nationality'].disable();
    this.patient.controls['PR_Caste'].disable();
    this.patient.controls['PR_BloodGroup'].disable();
    this.patient.controls['PR_MotherTongue'].disable();
    this.patient.controls['PR_Occupation'].disable();
    this.patient.controls['PR_Income'].disable();
    this.patient.controls['PR_Insurance'].disable();
    this.patient.controls['PR_PassportNo'].disable();
    this.patient.controls['PR_Country'].disable();
    this.patient.controls['PR_S_Id_FK'].disable();
    this.patient.controls['PR_D_Id_FK'].disable();
    this.patient.controls['PR_Taluk'].disable();
    this.patient.controls['PR_Village'].disable();
    this.patient.controls['PR_Postalcode'].disable();
  }


}
