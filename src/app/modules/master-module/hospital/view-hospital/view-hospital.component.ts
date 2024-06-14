import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-view-hospital',
  templateUrl: './view-hospital.component.html',
  styleUrls: ['./view-hospital.component.scss']
})
export class ViewHospitalComponent implements OnInit {
  hos_bran_hid: boolean = true;
  hos_netid: boolean = true;
  Image_Url;
  Image_Url1;
  MOU_Url;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any, private notify: Notification) { }
  hospital = new FormGroup({
    hos_HospitalName: new FormControl(''),
    hos_HospitalCode: new FormControl(''),
    hos_HospitalType: new FormControl(''),
    GsTno: new FormControl(''),
    PaNno: new FormControl(''),
    RegNo: new FormControl(''),
    Hos_cat_Id: new FormControl(''),
    hos_Branch: new FormControl(''),
    hos_HospitalEmail: new FormControl(''),
    hos_HospitalPhoneNo: new FormControl(''),
    hos_HospitalAddress: new FormControl(''),
    primaryorBranch: new FormControl(''),
    hos_Country: new FormControl(''),
    hos_ST_Id_FK: new FormControl(''),
    hos_DI_Id_FK: new FormControl(''),
    hos_Taluk: new FormControl(''),
    hos_PostalCode: new FormControl(''),
    Hos_web_url: new FormControl(''),
    hos_NE_Id_FK: new FormControl(''),
    hos_village: new FormControl(''),
    hos_Alterno: new FormControl(''),
    hos_Landline: new FormControl(''),
    hos_HospitalLogo: new FormControl(''),
  })
  ngOnInit(): void {
    this.disable();
    this.bind();
    this.Image_Url = this._data.d.hos_HospitalLogo;
    this.Image_Url1 = this._data.d.hos_NetworkLogo;

    // if (this._data.d.mouDocument === 'https://telemedicinepvtapi.esdinfra.com/Hospital/default_user.png') {
    //   this.notify.errorsmsg("No document uploaded")
    // } else {
    //   this.MOU_Url = this._data.d.mouDocument;
    // }  



    // this.Image_Url= { url: `${environment.API_Base_URL}` +`Hospital/GetHospital_Images?filename=${this._data.d.hos_HospitalLogo}`  }
    if (this._data.d.primaryorBranch == 'Primary') {
      //this.hos_bran_hid=true;
      this.hos_bran_hid = true;
    }
    else {
      this.hos_bran_hid = false;
    }

    if (this._data.d.primaryorBranch == 'Branch') {
      //this.hos_bran_hid=true;
      this.hos_netid = true;
    }
    else {
      this.hos_netid = false;
    }
  }

  viewDocument(): void {
    if (this._data.d.mouDocument === 'https://telemedicinepvtapi.esdinfra.com/Hospital/default_user.png') {
      this.notify.errorsmsg("No document uploaded")
    } else {
      window.open(this._data.d.mouDocument, '_blank');
    }
  }
  
  bind() {
    this.hospital.controls['PaNno'].setValue(this._data.d.paNno);
    this.hospital.controls['GsTno'].setValue(this._data.d.gsTno);
    this.hospital.controls['RegNo'].setValue(this._data.d.regNo);
    this.hospital.controls['hos_HospitalName'].setValue(this._data.d.hos_HospitalName);
    this.hospital.controls['Hos_cat_Id'].setValue(this._data.d.catName);
    this.hospital.controls['hos_HospitalCode'].setValue(this._data.d.hos_HospitalCode);
    this.hospital.controls['hos_HospitalType'].setValue(this._data.d.typeName);
    this.hospital.controls['hos_Branch'].setValue(this._data.d.hos_BranchName);
    this.hospital.controls['hos_HospitalEmail'].setValue(this._data.d.hos_HospitalEmail);
    this.hospital.controls['hos_HospitalPhoneNo'].setValue(this._data.d.hos_HospitalPhoneNo);
    this.hospital.controls['hos_HospitalAddress'].setValue(this._data.d.hos_HospitalAddress);
    this.hospital.controls['primaryorBranch'].setValue(this._data.d.primaryorBranch);
    this.hospital.controls['hos_Country'].setValue(this._data.d.hos_Country_name);
    this.hospital.controls['hos_ST_Id_FK'].setValue(this._data.d.hos_state_name);
    this.hospital.controls['hos_DI_Id_FK'].setValue(this._data.d.hos_district_name);
    this.hospital.controls['hos_Taluk'].setValue(this._data.d.taluk_name);
    this.hospital.controls['hos_PostalCode'].setValue(this._data.d.hos_PostalCode);
    //new
    this.hospital.controls['Hos_web_url'].setValue(this._data.d.hos_web_url);
    this.hospital.controls['hos_NE_Id_FK'].setValue(this._data.d.nE_Description);
    this.hospital.controls['hos_village'].setValue(this._data.d.hos_Village);
    //this.hospital.controls['hos_village'].setValue(this._data.d.gram_name);
    this.hospital.controls['hos_Alterno'].setValue(this._data.d.hos_Alterno);
    this.hospital.controls['hos_Landline'].setValue(this._data.d.hos_Landline);
    // this.MOU_Url=this._data.d.mouDocument;
  }
  disable() {
    this.hospital.controls['PaNno'].disable();
    this.hospital.controls['GsTno'].disable();
    this.hospital.controls['RegNo'].disable();
    this.hospital.controls['hos_HospitalName'].disable();
    this.hospital.controls['Hos_cat_Id'].disable();
    this.hospital.controls['hos_HospitalCode'].disable();
    this.hospital.controls['hos_HospitalType'].disable();
    this.hospital.controls['hos_Branch'].disable();
    this.hospital.controls['hos_HospitalEmail'].disable();
    this.hospital.controls['hos_HospitalPhoneNo'].disable();
    this.hospital.controls['hos_HospitalAddress'].disable();
    this.hospital.controls['primaryorBranch'].disable();
    this.hospital.controls['hos_Country'].disable();
    this.hospital.controls['hos_ST_Id_FK'].disable();
    this.hospital.controls['hos_DI_Id_FK'].disable();
    this.hospital.controls['hos_Taluk'].disable();
    this.hospital.controls['hos_PostalCode'].disable();
    //new
    this.hospital.controls['Hos_web_url'].disable();
    this.hospital.controls['hos_NE_Id_FK'].disable();
    this.hospital.controls['hos_village'].disable();
    this.hospital.controls['hos_Alterno'].disable();
    this.hospital.controls['hos_Landline'].disable();
  }
}
