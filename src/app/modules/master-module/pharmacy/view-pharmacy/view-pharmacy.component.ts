import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PharmacyService } from '../pharmacy.service';

@Component({
  selector: 'app-view-pharmacy',
  templateUrl: './view-pharmacy.component.html',
  styleUrls: ['./view-pharmacy.component.scss']
})
export class ViewPharmacyComponent implements OnInit {
  MOU_Url: any;
  type: any;
  catagory: any;
  Image_Url: any;

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any, private service: PharmacyService) { }
  pharmacy = new FormGroup({
    ph_Name: new FormControl(''),
    ph_Code: new FormControl(''),
    Hos_cat_Id: new FormControl(''),
    Hos_Type_Id: new FormControl(''),
    gsTnoOrPANno: new FormControl(''),
    regNo: new FormControl(''),
    gst: new FormControl(''),
    pan: new FormControl(''),
    ph_Branch: new FormControl(''),
    ph_Email: new FormControl(''),
    ph_MobileNumber: new FormControl(''),
    ph_Address: new FormControl(''),
    primaryOrBranch: new FormControl(''),
    ph_COUN_Id_FK: new FormControl(''),
    ph_ST_Id_FK: new FormControl(''),
    ph_DI_Id_FK: new FormControl(''),
    ph_tl_Id: new FormControl(''),
    ph_PostalCode: new FormControl(''),
    ph_web_url: new FormControl(''),
    ph_NE_Id: new FormControl(''),
    ph_Village: new FormControl(''),
    ph_AlterNumber: new FormControl(''),
    ph_LandLineNo: new FormControl(''),
    Ph_Logo: new FormControl(''),

  })

  ngOnInit(): void {
    this.bind();
    this.disable();
    this.get_pharmacy_type();
    this.get_pharmacy_cate();
  }

  bind() {
    //alert('Data:'+JSON.stringify(this._data.d))  

    this.pharmacy.controls['regNo'].setValue(this._data.d.regNo);
    this.pharmacy.controls['ph_Name'].setValue(this._data.d.ph_Name);
    this.MOU_Url = this._data.d.mouDocument;
    this.pharmacy.controls['Hos_cat_Id'].setValue(this._data.d.name);
    this.pharmacy.controls['Hos_Type_Id'].setValue(this._data.d.type);
    this.Image_Url = this._data.d.ph_Image;


    this.pharmacy.controls['ph_Code'].setValue(this._data.d.ph_Code);
    this.pharmacy.controls['ph_Branch'].setValue(this._data.d.ph_Branch);
    this.pharmacy.controls['gst'].setValue(this._data.d.gsTno);
    this.pharmacy.controls['pan'].setValue(this._data.d.paNno);
    this.pharmacy.controls['ph_Email'].setValue(this._data.d.ph_Email);
    this.pharmacy.controls['ph_MobileNumber'].setValue(this._data.d.ph_MobileNumber);
    this.pharmacy.controls['ph_Address'].setValue(this._data.d.ph_Address);
    this.pharmacy.controls['primaryOrBranch'].setValue(this._data.d.primaryOrBranch);
    this.pharmacy.controls['ph_COUN_Id_FK'].setValue(this._data.d.countries_name);
    this.pharmacy.controls['ph_ST_Id_FK'].setValue(this._data.d.ph_state_name);
    this.pharmacy.controls['ph_DI_Id_FK'].setValue(this._data.d.ph_district_name);
    this.pharmacy.controls['ph_tl_Id'].setValue(this._data.d.taluk_Name);
    this.pharmacy.controls['ph_PostalCode'].setValue(this._data.d.ph_PostalCode);
    this.pharmacy.controls['ph_web_url'].setValue(this._data.d.ph_web_url);
    this.pharmacy.controls['ph_NE_Id'].setValue(this._data.d.nE_Description);
    this.pharmacy.controls['ph_Village'].setValue(this._data.d.ph_Village);
    this.pharmacy.controls['ph_AlterNumber'].setValue(this._data.d.ph_AlterNumber);
    this.pharmacy.controls['ph_LandLineNo'].setValue(this._data.d.ph_LandLineNo);
    console.log('Category', this.pharmacy.value.Hos_cat_Id)
    console.log('Type', this.pharmacy.value.Hos_Type_Id)
  }
  disable() {
    this.pharmacy.controls['regNo'].disable();
    this.pharmacy.controls['ph_Name'].disable();
    this.pharmacy.controls['ph_Code'].disable();
    this.pharmacy.controls['Hos_cat_Id'].disable();
    this.pharmacy.controls['Hos_Type_Id'].disable();
    this.pharmacy.controls['gst'].disable();
    this.pharmacy.controls['pan'].disable();
    this.pharmacy.controls['ph_Branch'].disable();
    this.pharmacy.controls['ph_Email'].disable();
    this.pharmacy.controls['ph_MobileNumber'].disable();
    this.pharmacy.controls['ph_Address'].disable();
    this.pharmacy.controls['primaryOrBranch'].disable();
    this.pharmacy.controls['ph_COUN_Id_FK'].disable();
    this.pharmacy.controls['ph_ST_Id_FK'].disable();
    this.pharmacy.controls['ph_DI_Id_FK'].disable();
    this.pharmacy.controls['ph_tl_Id'].disable();
    this.pharmacy.controls['ph_PostalCode'].disable();
    this.pharmacy.controls['ph_web_url'].disable();
    this.pharmacy.controls['ph_NE_Id'].disable();
    this.pharmacy.controls['ph_Village'].disable();
    this.pharmacy.controls['ph_AlterNumber'].disable();
    this.pharmacy.controls['ph_LandLineNo'].disable();
  }
  get_pharmacy_type() {
    this.service.Get_Pharmacy_type()
      .subscribe((data) => {
        this.type = data
      })
  }
  get_pharmacy_cate() {
    this.service.Get_Pharmacy_cate()
      .subscribe((data) => {
        this.catagory = data
        console.log("Edit cat", this.catagory)

      })
  }
}
