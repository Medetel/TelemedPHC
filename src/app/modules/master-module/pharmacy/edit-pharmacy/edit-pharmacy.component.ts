import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { PharmacyService } from '../pharmacy.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-pharmacy',
  templateUrl: './edit-pharmacy.component.html',
  styleUrls: ['./edit-pharmacy.component.scss']
})
export class EditPharmacyComponent implements OnInit {
  branch_hid: boolean = true;
  network_hid: boolean = true;
  postal_code: any;
  country: any;
  state: any;
  district: any;
  taluk: any;
  gram: any;
  branch: any;
  networkdd: any;
  countrydd: any;
  statedd: any;
  districtdd: any;
  selectFiles: any;
  MOU_Url: any;
  pincode: any;
  type: any;
  catagory: any;
  base64Image: any;
  //sanitizer: any;
  selectedPhotos: any;
  Image_Url;

  constructor(private dialogRef: MatDialogRef<EditPharmacyComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private notif: Notification, private service: PharmacyService, private sanitizer: DomSanitizer) { }

  pharmacy = new FormGroup({
    ph_Id: new FormControl(''),
    ph_Name: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
    ph_Code: new FormControl('', [Validators.pattern("^[a-zA-Z0-9 ]{1,5}$"), Validators.required, Validators.minLength(5), Validators.maxLength(5), this.nameValidators,]),
    GsTno: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.maxLength(15), Validators.minLength(15)]),
    PaNno: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.minLength(10), Validators.maxLength(10)]),
    regNo: new FormControl('', [Validators.pattern("^[a-zA-Z0-9 ]{1,10}$"), Validators.required, this.nameValidators]),
    ph_Branch: new FormControl(''),
    ph_Village: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
    ph_Email: new FormControl('', [Validators.email]),
    ph_MobileNumber: new FormControl('', [Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    ph_Address: new FormControl(''),
    primaryOrBranch: new FormControl(''),
    ph_COUN_Id_FK: new FormControl(''),
    ph_ST_Id_FK: new FormControl(''),
    ph_DI_Id_FK: new FormControl(''),
    ph_tl_Id: new FormControl(''),
    ph_PostalCode: new FormControl('', [Validators.pattern("[0-9]{6}$"), this.nameValidator, Validators.minLength(6), Validators.maxLength(6)]),
    ph_web_url: new FormControl('', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
    ph_NE_Id: new FormControl(''),
    ph_GR_Id: new FormControl(''),
    cat_id: new FormControl(''),
    T_Id: new FormControl(''),
    Ph_Logo: new FormControl(''),
    ph_AlterNumber: new FormControl('', [Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    ph_LandLineNo: new FormControl('', [Validators.pattern("[0-9]{5,11}$"), this.nameValidator, Validators.maxLength(11)]),
  })

  nameValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\s/g,''/a-zA-Z]/;

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }
  nameValidators(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/, ''/]/;

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }
  onSelectFile(fileInput: any) {
    this.selectFiles = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.base64Image = this.sanitizer.bypassSecurityTrustUrl(event.target.result);
      //this.Image_Url = this.base64Image

    };
  }
  onSelectPhoto(fileInput: any) {
    this.selectedPhotos = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.base64Image = this.sanitizer.bypassSecurityTrustUrl(event.target.result);
      this.Image_Url = this.base64Image
    };
  }
  nameValidatorss(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/,/0-9]/;

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }

  ngOnInit(): void {
    this.bind();
    this.get_country();
    this.get_pharmacy_type();
    this.get_pharmacy_cate();
    this.get_network();
    this.countrychange(this._data.d.ph_COUN_Id_FK);
    this.statechange(this._data.d.ph_ST_Id_FK);
    this.distritchange(this._data.d.ph_DI_Id_FK);
    this.talukchange(this._data.d.ph_tl_Id);

  }

  bind() {
    console.log(JSON.stringify(this._data))
    this.pharmacy.controls['ph_Id'].setValue(this._data.d.ph_Id);
    this.pharmacy.controls['ph_Code'].setValue(this._data.d.ph_Code);
    this.pharmacy.controls['GsTno'].setValue(this._data.d.gsTno == null ? '' : this._data.d.gsTno);
    this.pharmacy.controls['PaNno'].setValue(this._data.d.paNno == null ? '' : this._data.d.paNno);
    this.pharmacy.controls['regNo'].setValue(this._data.d.regNo == null ? '' : this._data.d.regNo);
    this.pharmacy.controls['ph_Name'].setValue(this._data.d.ph_Name);
    this.pharmacy.controls['cat_id'].setValue(this._data.d.cat_id);
    this.pharmacy.controls['T_Id'].setValue(this._data.d.t_Id);
    this.MOU_Url = this._data.d.mouDocument;
    this.Image_Url = this._data.d.ph_Image;

    this.pharmacy.controls['ph_Branch'].setValue(this._data.d.ph_Branch);
    this.pharmacy.controls['ph_Email'].setValue(this._data.d.ph_Email);
    this.pharmacy.controls['ph_MobileNumber'].setValue(this._data.d.ph_MobileNumber);
    this.pharmacy.controls['ph_Address'].setValue(this._data.d.ph_Address);
    this.pharmacy.controls['primaryOrBranch'].setValue(this._data.d.primaryOrBranch);
    if (this._data.d.primaryOrBranch == 'Branch') {
      this.branch_hid = false;
      this.network_hid = true
      this.get_branch();
    }
    else {
      this.branch_hid = true;
      this.network_hid = false
      this.get_network();
    }
    this.pharmacy.controls['ph_COUN_Id_FK'].setValue(this._data.d.ph_COUN_Id_FK);
    this.pharmacy.controls['ph_Village'].setValue(this._data.d.ph_Village);
    this.pharmacy.controls['ph_ST_Id_FK'].setValue(this._data.d.ph_ST_Id_FK);
    this.pharmacy.controls['ph_DI_Id_FK'].setValue(this._data.d.ph_DI_Id_FK);
    this.pharmacy.controls['ph_tl_Id'].setValue(this._data.d.ph_tl_Id);
    this.pharmacy.controls['ph_PostalCode'].setValue(this._data.d.ph_PostalCode);
    this.pharmacy.controls['ph_web_url'].setValue(this._data.d.ph_web_url);
    this.pharmacy.controls['ph_NE_Id'].setValue(this._data.d.ph_NE_Id);
    this.pharmacy.controls['ph_GR_Id'].setValue(this._data.d.ph_GR_Id);
    this.pharmacy.controls['ph_AlterNumber'].setValue(this._data.d.ph_AlterNumber == 0 ? undefined : this._data.d.ph_AlterNumber);
    this.pharmacy.controls['ph_LandLineNo'].setValue(this._data.d.ph_LandLineNo == 0 ? undefined : this._data.d.ph_LandLineNo);
  }

  updateForm() {
    const formdata = new FormData();
    formdata.append('ph_Id', this.pharmacy.value.ph_Id);
    formdata.append('Ph_Logo', this.selectedPhotos);
    formdata.append('ph_Name', this.pharmacy.value.ph_Name);
    formdata.append('ph_Code', this.pharmacy.value.ph_Code);
    formdata.append('GsTno', this.pharmacy.value.GsTno)
    formdata.append('PaNno', this.pharmacy.value.PaNno);
    formdata.append('regNo', this.pharmacy.value.regNo);
    formdata.append('cat_id', this.pharmacy.value.cat_id);
    formdata.append('T_Id', this.pharmacy.value.T_Id);
    formdata.append('ph_Branch', this.pharmacy.value.ph_Branch == null ? 0 : this.pharmacy.value.ph_Branch);
    formdata.append('ph_Email', this.pharmacy.value.ph_Email);
    formdata.append('ph_MobileNumber', this.pharmacy.value.ph_MobileNumber);
    formdata.append('ph_Address', this.pharmacy.value.ph_Address);
    formdata.append('primaryOrBranch', this.pharmacy.value.primaryOrBranch);
    formdata.append('ph_COUN_Id', this.pharmacy.value.ph_COUN_Id_FK);
    formdata.append('ph_ST_Id_FK', this.pharmacy.value.ph_ST_Id_FK);
    formdata.append('ph_DI_Id_FK', this.pharmacy.value.ph_DI_Id_FK);
    formdata.append('ph_tl_Id', this.pharmacy.value.ph_tl_Id);
    formdata.append('ph_Village', this.pharmacy.value.ph_Village);
    formdata.append('ph_PostalCode', this.pharmacy.value.ph_PostalCode);
    formdata.append('ph_web_url', this.pharmacy.value.ph_web_url);
    formdata.append('ph_NE_Id', this.pharmacy.value.ph_NE_Id == null ? 0 : this.pharmacy.value.ph_NE_Id);
    formdata.append('ph_GR_Id', this.pharmacy.value.ph_GR_Id == null ? 0 : this.pharmacy.value.ph_GR_Id);
    formdata.append('MOUDocument', this.selectFiles);
    formdata.append('ph_AlterNumber', this.pharmacy.value.ph_AlterNumber == undefined ? 0 : this.pharmacy.value.ph_AlterNumber);
    formdata.append('ph_LandLineNo', this.pharmacy.value.ph_LandLineNo == undefined ? 0 : this.pharmacy.value.ph_LandLineNo);

    this.service.Put_pharmacy(formdata)
      .subscribe((res) => {
        this.notif.successmsg("Pharmacy updated successfully")
        this.dialogRef.close();
        window.location.reload();
      })
  }


  Phy_p_b(event) {

    if (event == 'Primary') {
      this.branch_hid = true;
      this.network_hid = false;
      this.pharmacy.controls['ph_Branch'].reset();
      this.pharmacy.controls['ph_Branch'].clearValidators();
      this.pharmacy.controls['ph_Branch'].updateValueAndValidity();
      this.pharmacy.controls['ph_NE_Id'].setValidators([Validators.required]);
      this.pharmacy.controls['ph_NE_Id'].updateValueAndValidity();
      this.get_network();
    }
    else { //branch
      this.branch_hid = false;
      this.network_hid = true;
      this.pharmacy.controls['ph_NE_Id'].reset();
      this.pharmacy.controls['ph_NE_Id'].clearValidators();
      this.pharmacy.controls['ph_NE_Id'].updateValueAndValidity();
      this.pharmacy.controls['ph_Branch'].setValidators([Validators.required]);
      this.pharmacy.controls['ph_Branch'].updateValueAndValidity();
      this.get_branch();

    }
  }

  get_branch() {
    this.service.Get_branch()
      .subscribe((data) => {
        this.branch = data
        console.log('branch  data :' + JSON.stringify(this.branch))
      })
  }
  get_network() {
    this.service.Get_network()
      .subscribe((data) => {
        this.networkdd = data
      })
  }
  get_country() {
    this.service.Get_country()
      .subscribe((data) => {
        this.country = data
      })
  }
  get_state() {
    this.service.Get_state_f()
      .subscribe((data) => {
        this.state = data
      })
  }
  get_district() {
    this.service.Get_alldistrict()
      .subscribe((data) => {
        this.district = data
      })
  }
  get_taluk() {
    this.service.Get_allTaluk()
      .subscribe((data) => {
        this.taluk = data
      })
  }
  get_gram() {
    this.service.Get_allgram()
      .subscribe((data) => {
        this.gram = data
      })
  }
  countrychange(event) {
    if (this.pharmacy.value.ph_COUN_Id !== event) {
      this.pharmacy.controls['ph_ST_Id_FK'].setValue('');
      this.pharmacy.controls['ph_DI_Id_FK'].setValue('');
      this.pharmacy.controls['ph_tl_Id'].setValue('');
    }
    this.taluk = undefined
    this.district = undefined
    this.state = undefined
    this.service.Get_State(event)
      .subscribe((data) => {
        this.state = data
        if (this.state.length == 0) {
          this.notif.errorsmsg("Data not found!")
        }
      })
  }
  statechange(event) {
    if (this.pharmacy.value.ph_ST_Id_FK !== event) {
      this.pharmacy.controls['ph_DI_Id_FK'].setValue('');
      this.pharmacy.controls['ph_tl_Id'].setValue('');
    }
    this.taluk = undefined
    this.district = undefined
    this.service.Get_District(event)
      .subscribe((data) => {
        this.district = data

      // }, (error: any) => {

      //   this.pharmacy.controls['ph_DI_Id_FK'].setValue('');
      //   this.pharmacy.controls['ph_tl_Id'].setValue('');
      });
  }
  distritchange(event) {
    if (this.pharmacy.value.ph_DI_Id_FK !== event) {
      this.pharmacy.controls['ph_tl_Id'].setValue('');
    }
    this.gram = undefined
    this.taluk = undefined
    this.service.Get_Taluk(event)
      .subscribe((data) => {
        this.taluk = data
      })
  }

  testempty: any = [];
  gramData: any = [];
  talukchange(event) {
    if (this.pharmacy.value.ph_tl_Id !== event) {
      this.pharmacy.controls['ph_GR_Id'].setValue(''); // Reset village selection
      this.pharmacy.controls['ph_PostalCode'].setValue(''); // Reset postal code
    }

    this.gram = undefined;
    this.service.Get_Gram_id(event)
      .subscribe(
        (data) => {
          this.gram = data;
        },
        (error) => {
          this.gram = this.testempty;
        }
      );
  }
  selectpincode(gram_id) {
    this.pincode = this.gram.filter(x => x.gram_id == gram_id)
    this.pharmacy.controls['ph_PostalCode'].setValue(this.pincode[0].postal_Code)
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
