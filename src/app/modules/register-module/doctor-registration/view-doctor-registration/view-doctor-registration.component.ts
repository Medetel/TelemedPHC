import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-view-doctor-registration',
  templateUrl: './view-doctor-registration.component.html',
  styleUrls: ['./view-doctor-registration.component.scss']
})
export class ViewDoctorRegistrationComponent implements OnInit {
  Image_Url: any;
  Sign_Url: any;
  Doc_Url: any;
  MOU_Url: any;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any, private sanitizer: DomSanitizer, private notify: Notification) { }
  doctor = new FormGroup({
    DO_Photo: new FormControl(''),
    DO_FirstName: new FormControl(''),
    DO_LastName: new FormControl(''),
    DO_DOB: new FormControl(''),
    DO_Gender: new FormControl(''),
    DO_MobileNumber: new FormControl(''),
    DO_Alernative_Numb: new FormControl(''),
    DO_OfficialNumber: new FormControl(''),
    DO_MotherTongue: new FormControl(''),
    Regno: new FormControl(''),
    PaNno: new FormControl(''),
    DO_Email: new FormControl(''),
    DO_Address: new FormControl(''),
    DO_HO_Id_FK: new FormControl(''),
    DO_QU_Id_FK: new FormControl(''),
    DO_DE_Id_FK: new FormControl(''),
    DO_CD_Id_FK: new FormControl(''),
    DO_SP_Id_FK: new FormControl(''),
    DO_Country: new FormControl('India'),
    DO_ST_Id_FK: new FormControl(''),
    DO_DI_Id_FK: new FormControl(''),
    DO_Taluk: new FormControl(''),
    DO_Village: new FormControl(''),
    DO_PostalCode: new FormControl(''),
    service_name: new FormControl(''),
    service_code: new FormControl(''),
    service_charge: new FormControl(''),
    DO_Spc_Id_FK: new FormControl(''),
    DO_SC_Id_FK: new FormControl(''),
    // DO_SD_Id_FK: new FormControl(''),
    DO_NE_Id_FK: new FormControl(''),




  })
  ngOnInit(): void {
    this.bind();
    this.disable();

    //this.Image_Url = 'data:image/jpeg;base64,' + this._data.d.imagebyte;
    //this.Image_Url= { url: `${environment.API_Base_URL}` +`Doctor/GetDoctor_Images?filename=${this._data.d.dO_Photo}`}
  }

  viewDocument(): void {
    if (this._data.d.mouDocument === 'https://telemedicinepvtapi.esdinfra.com/DoctorDocuments/') {
      this.notify.errorsmsg("No document uploaded")
    } else {
      window.open(this._data.d.mouDocument, '_blank');
    }
  }

  viewdocument(): void {
    if (this._data.d.dO_Choose_Document === 'https://telemedicinepvtapi.esdinfra.com/DoctorDocuments/') {
      this.notify.errorsmsg("No document uploaded")
    } else {
      window.open(this._data.d.dO_Choose_Document, '_blank');
    }
  }
  bind() {
    console.log('doctor data :' + JSON.stringify(this._data.d))
    //console.log('view data :' +JSON.stringify(this._data.d))
    this.Image_Url = this._data.d.dO_Image;
    this.Sign_Url = this._data.d.doc_Signature_Doc;
    // this.Doc_Url=this._data.d.dO_Choose_Document;
    // this.MOU_Url=this._data.d.mouDocument;

    //this.Image_Url = 'data:image/jpeg;base64,' + this._data.d.imagebyte;
    //console.log('img url :' +this.Image_Url)
    //this.Image_Url = this._data.d.imagebyte;

    this.doctor.controls['DO_FirstName'].setValue(this._data.d.dO_FirstName);
    this.doctor.controls['DO_LastName'].setValue(this._data.d.dO_LastName);
    this.doctor.controls['DO_DOB'].setValue(this._data.d.dO_DOB);
    this.doctor.controls['DO_CD_Id_FK'].setValue(this._data.d.dO_ClinicalDiscipline);
    this.doctor.controls['DO_Gender'].setValue(this._data.d.dO_Gender);
    this.doctor.controls['DO_MotherTongue'].setValue(this._data.d.language);
    this.doctor.controls['DO_MobileNumber'].setValue(this._data.d.dO_MobileNumber);
    this.doctor.controls['DO_Alernative_Numb'].setValue(this._data.d.dO_Alernative_Numb);
    this.doctor.controls['DO_OfficialNumber'].setValue(this._data.d.dO_OfficialNumber);
    this.doctor.controls['Regno'].setValue(this._data.d.regno);
    this.doctor.controls['PaNno'].setValue(this._data.d.paNno);
    this.doctor.controls['DO_Email'].setValue(this._data.d.dO_Email);
    this.doctor.controls['DO_Address'].setValue(this._data.d.dO_Address);
    // 
    if (this._data.d.dO_Type === 'Clinic') {
      // If dO_Type is 'Clinic', bind the clinicName
      this.doctor.controls['DO_HO_Id_FK'].setValue(this._data.d.clinicName);
    } else {
      // Otherwise, bind the hospital
      this.doctor.controls['DO_HO_Id_FK'].setValue(this._data.d.dO_Hospital);
      this.doctor.controls['DO_NE_Id_FK'].setValue(this._data.d.nE_Description);
    }
    this.doctor.controls['DO_QU_Id_FK'].setValue(this._data.d.dO_Qualification);
    this.doctor.controls['DO_DE_Id_FK'].setValue(this._data.d.dO_Designation);
    this.doctor.controls['DO_SP_Id_FK'].setValue(this._data.d.dO_Specialization);
    this.doctor.controls['DO_Country'].setValue(this._data.d.dO_Country_name);
    this.doctor.controls['DO_ST_Id_FK'].setValue(this._data.d.dO_StateName);
    this.doctor.controls['DO_DI_Id_FK'].setValue(this._data.d.dO_DistrictName);
    this.doctor.controls['DO_Taluk'].setValue(this._data.d.taluk_name);
    this.doctor.controls['DO_Village'].setValue(this._data.d.dO_Village);
    this.doctor.controls['DO_PostalCode'].setValue(this._data.d.dO_PostalCode);
    this.doctor.controls['DO_Photo'].setValue(this._data.d.DO_Photo);
    this.doctor.controls['service_name'].setValue(this._data.d.services);
    this.doctor.controls['service_code'].setValue(this._data.d.serviceCode);
    this.doctor.controls['service_charge'].setValue(this._data.d.charges);
    this.doctor.controls['DO_Spc_Id_FK'].setValue(this._data.d.sD_ClinicalSpecilist);
    this.doctor.controls['DO_SC_Id_FK'].setValue(this._data.d.spc_Name);
    this.doctor.controls['DO_SP_Id_FK'].setValue(this._data.d.sP_Specialization);

  }

  disable() {
    this.doctor.controls['DO_FirstName'].disable();
    this.doctor.controls['DO_LastName'].disable();
    this.doctor.controls['DO_DOB'].disable();
    this.doctor.controls['DO_CD_Id_FK'].disable();
    this.doctor.controls['DO_Gender'].disable();
    this.doctor.controls['DO_MotherTongue'].disable();
    this.doctor.controls['DO_MobileNumber'].disable();
    this.doctor.controls['DO_Alernative_Numb'].disable();
    this.doctor.controls['DO_OfficialNumber'].disable();
    this.doctor.controls['PaNno'].disable();
    this.doctor.controls['Regno'].disable();
    this.doctor.controls['DO_Email'].disable();
    this.doctor.controls['DO_Address'].disable();
    this.doctor.controls['DO_HO_Id_FK'].disable();
    this.doctor.controls['DO_QU_Id_FK'].disable();
    this.doctor.controls['DO_DE_Id_FK'].disable();
    this.doctor.controls['DO_SP_Id_FK'].disable();
    this.doctor.controls['DO_Country'].disable();
    this.doctor.controls['DO_ST_Id_FK'].disable();
    this.doctor.controls['DO_DI_Id_FK'].disable();
    this.doctor.controls['DO_Taluk'].disable();
    this.doctor.controls['DO_Village'].disable();
    this.doctor.controls['DO_PostalCode'].disable();
    this.doctor.controls['DO_Photo'].disable();
    this.doctor.controls['service_name'].disable();
    this.doctor.controls['service_code'].disable();
    this.doctor.controls['service_charge'].disable();
    this.doctor.controls['DO_Spc_Id_FK'].disable();
    this.doctor.controls['DO_SC_Id_FK'].disable();
    // this.doctor.controls['DO_SD_Id_FK'].disable();
    this.doctor.controls['DO_NE_Id_FK'].disable();


  }


}
