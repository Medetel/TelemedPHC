import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { environment } from 'src/environments/environment';
import { HospitalService } from '../hospital.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-edit-hospital',
  templateUrl: './edit-hospital.component.html',
  styleUrls: ['./edit-hospital.component.scss']
})
export class EditHospitalComponent implements OnInit {
  branch_hid: boolean = true;
  network_hid: boolean = true;
  branch: any;
  country: any;
  state: any;
  district: any;
  taluk: any;
  gram: any;
  pincode: any;
  catagory: any;
  hospitaltypedd: any;
  networkdd: any;
  countrydd: any;
  statedd: any;
  districtdd: any;
  selectFiles: any;
  MOU_Url;
  selectedPhotos: any;
  selectedPhotos1: any;
  
  Image_Url;
  Image_Url1;
  base64Image: any;
  constructor(private dialogRef: MatDialogRef<EditHospitalComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private service: HospitalService,
    private notif: Notification, private sanitizer: DomSanitizer) { }
  hospital = new FormGroup({
    hos_Id: new FormControl(''),
    hos_HospitalName: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
    //hos_HospitalCode: new FormControl('', [Validators.pattern("^[a-zA-Z0-9 ]$"), Validators.maxLength(10), this.nameValidators]),
    hos_HospitalCode: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.maxLength(10),Validators.required]),
    GsTno: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.maxLength(15), Validators.minLength(15)]),
    PaNno: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.minLength(10), Validators.maxLength(10)]),
    RegNo: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.maxLength(20)]),
    Hos_cat_Id: new FormControl(''),
    Hos_Type_Id: new FormControl(''),
    hos_Branch: new FormControl(''),
    hos_HospitalEmail: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    hos_HospitalPhoneNo: new FormControl('', [Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    hos_HospitalAddress: new FormControl(''),
    primaryorBranch: new FormControl(''),
    Hos_Country_Id_FK: new FormControl(''),
    Hos_ST_Id_FK: new FormControl(''),
    Hos_DI_Id_FK: new FormControl(''),
    Hos_Taluk_Id: new FormControl(''),
    hos_PostalCode: new FormControl('', [Validators.pattern("[0-9]{6}$"), this.nameValidator, Validators.minLength(6), Validators.maxLength(6)]),
    Hos_web_url: new FormControl('', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
    hos_NE_Id_FK: new FormControl(''),
    Hos_Gram_Id: new FormControl(''),
    Hos_Village: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
    Hos_Alterno: new FormControl('', [Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    hos_Landline: new FormControl('', [Validators.pattern("[0-9]{5,11}$"), this.nameValidator, Validators.minLength(5), Validators.maxLength(11)]),
    hos_HospitalLogo: new FormControl(''),
    Hos_NetworkLogo: new FormControl(''),
    MOUDocument: new FormControl(''),
  })
  nameValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\s/g,''/a-zA-Z]/;
    // const spaceexp: RegExp =/[/\s/g, '']/

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }
  nameValidators(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/, ''/]/;
    // const spaceexp: RegExp =/[/\s/g, '']/

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }
  nameValidatorss(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/,/0-9]/;
    // const spaceexp: RegExp =/[/\s/g, '']/

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }

  onselectfiles(fileInput: any) {
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
  onSelectPhoto1(fileInput1: any) {
    this.selectedPhotos1 = <File>fileInput1.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput1.target.files[0]);
    reader.onload = (event: any) => {
      this.base64Image = this.sanitizer.bypassSecurityTrustUrl(event.target.result);
      this.Image_Url1 = this.base64Image
    };
  }


  ngOnInit(): void {
    this.bind();
    this.get_country();
    this.Get_Catagory();
    this.get_network();
    this.Get_hospitaltype();
    this.Get_Hospital_dd();
    this.countrychange(this._data.d.hos_Country_Id_FK)
    this.statechange(this._data.d.hos_ST_Id_FK)
    this.distritchange(this._data.d.hos_DI_Id_FK)
    //this.talukchange(this._data.d.hos_Taluk_Id)

    this.Image_Url = this._data.d.hos_Image;
    if (this._data.d.primaryorBranch == 'Branch') {
      this.branch_hid = false;
    }
    if (this._data.d.primaryorBranch == 'Primary') {
      this.hospital.value.hos_NE_Id_FK = 0;
      this.hospital.value.hos_Branch = 0;
      this.network_hid = false;
    }

  }
  Get_Hospital_dd() {
    this.service.Get_hospital_dd()
      .subscribe((data) => {
        this.branch = data
      })
  }
  Get_hospitaltype() {
    this.service.Get_hospital_type()
      .subscribe((data) => {
        this.hospitaltypedd = data
      })
  }


  viewDocument(): void {
    if (this._data.d.mouDocument === 'https://telemedicinepvtapi.esdinfra.com/Hospital/default_user.png') {
      this.notif.errorsmsg("No document uploaded")
    } else {
      window.open(this._data.d.mouDocument, '_blank');
    }
  }

  bind() {

    this.hospital.controls['hos_Id'].setValue(this._data.d.hos_Id);
    this.hospital.controls['hos_HospitalName'].setValue(this._data.d.hos_HospitalName);
    this.hospital.controls['hos_HospitalCode'].setValue(this._data.d.hos_HospitalCode);
    this.hospital.controls['PaNno'].setValue(this._data.d.paNno == null ? '' : this._data.d.paNno);
    this.hospital.controls['GsTno'].setValue(this._data.d.gsTno == null ? '' : this._data.d.gsTno);
    this.hospital.controls['RegNo'].setValue(this._data.d.regNo == null ? '' : this._data.d.regNo);
    this.hospital.controls['Hos_cat_Id'].setValue(this._data.d.hos_cat_Id);
    this.hospital.controls['Hos_Type_Id'].setValue(this._data.d.hos_Type_Id);
    this.hospital.controls['hos_Branch'].setValue(this._data.d.hos_Branch);
    this.hospital.controls['hos_HospitalEmail'].setValue(this._data.d.hos_HospitalEmail);
    this.hospital.controls['hos_HospitalPhoneNo'].setValue(this._data.d.hos_HospitalPhoneNo);
    this.hospital.controls['hos_HospitalAddress'].setValue(this._data.d.hos_HospitalAddress);
    this.hospital.controls['primaryorBranch'].setValue(this._data.d.primaryorBranch);
    this.hospital.controls['Hos_Country_Id_FK'].setValue(this._data.d.hos_Country_Id_FK);
    this.hospital.controls['Hos_ST_Id_FK'].setValue(this._data.d.hos_ST_Id_FK);
    this.hospital.controls['Hos_DI_Id_FK'].setValue(this._data.d.hos_DI_Id_FK);
    this.hospital.controls['Hos_Taluk_Id'].setValue(this._data.d.hos_Taluk_Id);
    this.hospital.controls['hos_PostalCode'].setValue(this._data.d.hos_PostalCode);
    //new
    this.hospital.controls['Hos_web_url'].setValue(this._data.d.hos_web_url);
    this.hospital.controls['hos_NE_Id_FK'].setValue(this._data.d.hos_NE_Id_FK);
    this.hospital.controls['Hos_Gram_Id'].setValue(this._data.d.hos_Gram_Id == null ? 0 : this._data.d.hos_Gram_Id);
    this.hospital.controls['Hos_Village'].setValue(this._data.d.hos_Village);
    this.hospital.controls['Hos_Alterno'].setValue(this._data.d.hos_Alterno == null ? '' : this._data.d.hos_Alterno);
    this.hospital.controls['hos_Landline'].setValue(this._data.d.hos_Landline == null ? '' : this._data.d.hos_Landline);
    // this.Image_Url = 'data:image/jpeg;base64,' + this._data.d.hos_HospitalLogo;
    // this.MOU_Url=this._data.d.mouDocument;
    this.Image_Url = this._data.d.hos_HospitalLogo;
    this.Image_Url1 = this._data.d.hos_NetworkLogo;
  }
  updateform() {
    const formdata = new FormData();
    formdata.append('Hos_Id', this.hospital.value.hos_Id);
    formdata.append('Hos_HospitalCode', this.hospital.value.hos_HospitalCode);
    formdata.append('Hos_HospitalName', this.hospital.value.hos_HospitalName);
    formdata.append('PaNno', this.hospital.value.PaNno);
    formdata.append('GsTno', this.hospital.value.GsTno);
    formdata.append('RegNo', this.hospital.value.RegNo);
    formdata.append('Hos_cat_Id', this.hospital.value.Hos_cat_Id);
    formdata.append('Hos_Type_Id', this.hospital.value.Hos_Type_Id);
    formdata.append('Hos_Branch', this.hospital.value.hos_Branch == null ? 0 : this.hospital.value.hos_Branch);
    formdata.append('Hos_HospitalEmail', this.hospital.value.hos_HospitalEmail);
    formdata.append('Hos_HospitalPhoneNo', this.hospital.value.hos_HospitalPhoneNo);
    formdata.append('Hos_HospitalAddress', this.hospital.value.hos_HospitalAddress);
    formdata.append('PrimaryorBranch', this.hospital.value.primaryorBranch);
    formdata.append('Hos_Country_Id_FK', this.hospital.value.Hos_Country_Id_FK);
    formdata.append('Hos_ST_Id_FK', this.hospital.value.Hos_ST_Id_FK);
    formdata.append('Hos_DI_Id_FK', this.hospital.value.Hos_DI_Id_FK);
    formdata.append('Hos_Taluk_Id', this.hospital.value.Hos_Taluk_Id);
    formdata.append('Hos_PostalCode', this.hospital.value.hos_PostalCode);
    //new
    formdata.append('Hos_web_url', this.hospital.value.Hos_web_url);
    formdata.append('Hos_NE_Id_FK', this.hospital.value.hos_NE_Id_FK == null ? 0 : this.hospital.value.hos_NE_Id_FK);
    formdata.append('Hos_Gram_Id', this.hospital.value.Hos_Gram_Id);
    formdata.append('Hos_Village', this.hospital.value.Hos_Village);
    formdata.append('Hos_Alterno', this.hospital.value.Hos_Alterno);
    formdata.append('Hos_Landline', this.hospital.value.hos_Landline);
    // formdata.append('Hos_HospitalLogo', this.selectedFiles);
    formdata.append('MOUDocument', this.selectFiles);
    formdata.append('hos_HospitalLogo', this.selectedPhotos);
    formdata.append('Hos_NetworkLogo', this.selectedPhotos1);

    this.service.Put_hospital(formdata)
      .subscribe((res) => {
        this.notif.successmsg("Hospital Updated Successfully")
        this.dialogRef.close();
        window.location.reload();
      })
  }

  change_branch(value) {
    this.service.Get_branch_id(value)
      .subscribe((data) => {
        let s = data[0].hos_NE_Id_FK
        this.hospital.controls['hos_NE_Id_FK'].setValue(s)

      })
  }
  hos_p_b(event) {

    if (event == 'Primary') {
      this.branch_hid = true;
      this.network_hid = false;
      this.hospital.controls['hos_Branch'].reset();
      this.hospital.controls['hos_Branch'].clearValidators();
      this.hospital.controls['hos_Branch'].updateValueAndValidity();
      this.hospital.controls['hos_NE_Id_FK'].setValidators([Validators.required]);
      this.hospital.controls['hos_NE_Id_FK'].updateValueAndValidity();
      this.hospital.controls['hos_NE_Id_FK'].setValue('');
      this.get_network();
    }
    else {
      this.branch_hid = false;
      this.network_hid = true;
      this.hospital.controls['hos_NE_Id_FK'].reset();
      this.hospital.controls['hos_NE_Id_FK'].clearValidators();
      this.hospital.controls['hos_NE_Id_FK'].updateValueAndValidity();
      this.hospital.controls['hos_Branch'].setValidators([Validators.required]);
      this.hospital.controls['hos_Branch'].updateValueAndValidity();
      this.hospital.controls['hos_Branch'].setValue('');
      this.get_branch();
    }
  }
  Get_Catagory() {
    this.service.Get_Catagory()
      .subscribe((data) => {
        this.catagory = data
      })
  }
  get_network() {
    this.service.Get_network()
      .subscribe((data) => {
        this.networkdd = data
      })
  }
  get_branch() {
    this.service.Get_branch()
      .subscribe((data) => {
        this.branch = data
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
    if (this.hospital.value.Hos_Country_Id_FK !== event) {
      this.hospital.controls['Hos_ST_Id_FK'].setValue('');
      this.hospital.controls['Hos_DI_Id_FK'].setValue('');
      this.hospital.controls['Hos_Taluk_Id'].setValue('');
    }

    this.state = undefined;
    this.district = undefined;
    this.taluk = undefined;
    this.gram = undefined;

    this.service.Get_State(event)
      .subscribe((data) => {
        this.state = data;
        if (this.state.length == 0) {
          this.notif.errorsmsg("Data not found!");
        }
        // if (this.state == '') {
        //   this.hospital.controls['Hos_ST_Id_FK'].setValue('');
        //   this.hospital.controls['Hos_DI_Id_FK'].setValue('');
        //   this.hospital.controls['Hos_Taluk_Id'].setValue('');
        // }
      });
  }
  statechange(event) {
    if (this.hospital.value.Hos_ST_Id_FK !== event) {
      this.hospital.controls['Hos_DI_Id_FK'].setValue('');
      this.hospital.controls['Hos_Taluk_Id'].setValue('');
    }
    this.taluk = undefined
    this.district = undefined
    this.service.Get_District(event)
      .subscribe((data) => {
        this.district = data
      // }, (error: any) => {

      //   this.hospital.controls['Hos_DI_Id_FK'].setValue('');
      //   this.hospital.controls['Hos_Taluk_Id'].setValue('');
      });
  }
  distritchange(event) {
    if (this.hospital.value.Hos_DI_Id_FK !== event) {
      this.hospital.controls['Hos_Taluk_Id'].setValue('');
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
    // Clear the village and pincode records
    if (this.hospital.value.Hos_Taluk_Id !== event) {
      // this.hospital.controls['Hos_Gram_Id'].setValue('');
      // this.hospital.controls['hos_PostalCode'].setValue('');
    }
    this.gram = undefined;
    this.service.Get_Gram_id(event)
      .subscribe((data) => {
        this.gram = data;
      },
        (error: any) => {
          // Handle error if needed
          this.gram = [];
        });
  }

  selectpincode(gram_id) {

    this.pincode = this.gram.filter(x => x.gram_id == gram_id)
    this.hospital.controls['hos_PostalCode'].setValue(this.pincode[0].postal_Code)
  }
}
