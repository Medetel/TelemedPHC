import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DiagnosticService } from '../diagnostic.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-diagnostic',
  templateUrl: './edit-diagnostic.component.html',
  styleUrls: ['./edit-diagnostic.component.scss']
})
export class EditDiagnosticComponent implements OnInit {

  imgs: boolean = true;
  branch_hid: boolean = true;
  network_hid: boolean = true;
  postal_code: any;
  country: any;
  state: any;
  district: any;
  taluk: any;
  gram: any;
  pincode: any;
  catagory: any;
  branch: any;
  diagnostictypedd: any;
  networkdd: any;
  countrydd: any;
  statedd: any;
  districtdd: any;
  selectedFiles: any;
  selectedPhotos: any;
  Image_Url;
  MOU_Url;
  base64Image: any;
  constructor(private dialogRef: MatDialogRef<EditDiagnosticComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private service: DiagnosticService, private notif: Notification, private domSanitizer: DomSanitizer) { }
  diagnostic = new FormGroup({
    dgstC_Name: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
    dgstC_Code: new FormControl('', [Validators.pattern("^[a-zA-Z0-9 ]{5}$"), Validators.required, Validators.minLength(1), Validators.maxLength(5), this.nameValidators,]),
    GsTno: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.maxLength(15), Validators.minLength(15)]),
    PaNno: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.minLength(10), Validators.maxLength(10)]),
    regNo: new FormControl('', [Validators.pattern("^[a-zA-Z0-9 ]{1,10}$"), Validators.required, this.nameValidators]),
    dgstC_Type_Id: new FormControl(''),
    dgstC_Branch: new FormControl(''),
    dgstC_Email: new FormControl('', [Validators.email, Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    dgstC_MobileNumber: new FormControl('', [Validators.pattern("[0-9]{10}$"), Validators.required, this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    dgstC_Address: new FormControl('', [Validators.required]),
    primaryOrBranch: new FormControl(''),
    dgstC_COUN_Id_FK: new FormControl(''),
    dgstC_ST_Id_FK: new FormControl(''),
    dgstC_DI_Id_FK: new FormControl(''),
    dgstC_TL_Id_FK: new FormControl(''),
    dgstC_PostalCode: new FormControl('', [this.nameValidator]),
    dgstC_web_url: new FormControl('', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
    dgstC_NE_Id: new FormControl(''),
    dgstC_GR_Id_FK: new FormControl(''),
    dgstC_AlterNumber: new FormControl(''),
    dgstC_LandLineNo: new FormControl('', [Validators.pattern("[0-9]{5,11}$"), this.nameValidator, Validators.maxLength(11)]),
    DGSTC_Logo: new FormControl(''),
    dgstC_Id: new FormControl(0),
    MouDocument: new FormControl(''),
    dgstC_Village: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
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
  selectfiles: any;
  onselectfiles(fileInput: any) {
    this.selectfiles = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(event.target.result);
      //this.Image_Url = this.base64Image

    };
  }

  // onSelectFiles(fileInput: any) {
  //   this.selectedFiles = <File>fileInput.target.files[0];
  //   //console.log("Mou Doc:",this.selectedFiles)
  //   var reader = new FileReader();
  //   reader.readAsDataURL(fileInput.target.files[0]);
  //   reader.onload = (event: any) => {
  //     this.base64Image = this.sanitizer.bypassSecurityTrustUrl(event.target.result);
  //     //this.Image_Url = this.base64Image

  //   };
  // }
  onSelectPhoto(fileInput: any) {
    this.selectedPhotos = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(event.target.result);
      this.Image_Url = this.base64Image
    };
  }
  ngOnInit(): void {
    this.bind();
    this.Get_Catagory();
    this.get_country();
    this.get_network();
    this.Get_diagnostic_type();
    this.Get_diagnostic_dd();
    this.countrychange(this._data.d.dgstC_COUN_Id_FK);
    this.statechange(this._data.d.dgstC_ST_Id_FK);
    this.distritchange(this._data.d.dgstC_DI_Id_FK);
    this.talukchange(this._data.d.dgstC_TL_Id_FK);
    if (this._data.d.primaryorBranch == 'Branch') {
      this.branch_hid = false;
    }
    if (this._data.d.primaryorBranch == 'Primary') {
      this.diagnostic.value.dgstC_NE_Id = 0;
      this.diagnostic.value.dgstC_Branch = 0;
      this.network_hid = false;
    }

  }
  bind() {
    this.diagnostic.controls['dgstC_Id'].setValue(this._data.d.dgstC_Id);
    this.diagnostic.controls['regNo'].setValue(this._data.d.regNo == 0 ? undefined : this._data.d.regNo);
    this.diagnostic.controls['dgstC_Name'].setValue(this._data.d.dgstC_Name);
    this.diagnostic.controls['dgstC_Code'].setValue(this._data.d.dgstC_Code);
    this.diagnostic.controls['dgstC_Type_Id'].setValue(this._data.d.dgstC_Type_Id);
    this.diagnostic.controls['dgstC_Branch'].setValue(this._data.d.dgstC_Branch);
    this.diagnostic.controls['dgstC_Email'].setValue(this._data.d.dgstC_Email == 0 ? undefined : this._data.d.dgstC_Email);
    this.diagnostic.controls['dgstC_MobileNumber'].setValue(this._data.d.dgstC_MobileNumber);
    this.diagnostic.controls['dgstC_Address'].setValue(this._data.d.dgstC_Address);
    this.diagnostic.controls['primaryOrBranch'].setValue(this._data.d.primaryOrBranch);
    this.diagnostic.controls['dgstC_COUN_Id_FK'].setValue(this._data.d.dgstC_COUN_Id_FK);
    this.diagnostic.controls['dgstC_ST_Id_FK'].setValue(this._data.d.dgstC_ST_Id_FK);
    this.diagnostic.controls['dgstC_DI_Id_FK'].setValue(this._data.d.dgstC_DI_Id_FK);
    this.diagnostic.controls['dgstC_TL_Id_FK'].setValue(this._data.d.dgstC_TL_Id_FK);
    this.diagnostic.controls['dgstC_PostalCode'].setValue(this._data.d.dgstC_PostalCode);
    this.diagnostic.controls['dgstC_web_url'].setValue(this._data.d.dgstC_web_url);
    this.diagnostic.controls['dgstC_NE_Id'].setValue(this._data.d.dgstC_NE_Id);
    this.diagnostic.controls['dgstC_GR_Id_FK'].setValue(this._data.d.dgstC_GR_Id_FK);
    this.diagnostic.controls['dgstC_AlterNumber'].setValue(this._data.d.dgstC_AlterNumber == 0 ? undefined : this._data.d.dgstC_AlterNumber);
    this.diagnostic.controls['dgstC_LandLineNo'].setValue(this._data.d.dgstC_LandLineNo == 0 ? undefined : this._data.d.dgstC_LandLineNo);
    this.diagnostic.controls['GsTno'].setValue(this._data.d.gsTno);
    this.diagnostic.controls['PaNno'].setValue(this._data.d.paNno);
    this.MOU_Url = this._data.d.mouDocument; //MOU
    this.Image_Url = this._data.d.dgstC_Image;  //photo   
    this.diagnostic.controls['dgstC_Village'].setValue(this._data.d.dgstC_Village);
  }

  updateform() {
    const formdata = new FormData();
    formdata.append('dgstC_Id', this.diagnostic.value.dgstC_Id);
    formdata.append('dgstC_Name', this.diagnostic.value.dgstC_Name);
    formdata.append('DGSTC_Logo', this.selectedPhotos);

    formdata.append('dgstC_Code', this.diagnostic.value.dgstC_Code);
    formdata.append('regNo', this.diagnostic.value.regNo == undefined ? 0 : this.diagnostic.value.regNo);
    formdata.append('dgstC_Type_Id', this.diagnostic.value.dgstC_Type_Id);
    formdata.append('dgstC_Branch', this.diagnostic.value.dgstC_Branch == null ? 0 : this.diagnostic.value.dgstC_Branch);
    formdata.append('dgstC_Email', this.diagnostic.value.dgstC_Email == undefined ? 0 : this.diagnostic.value.dgstC_Email);
    formdata.append('dgstC_MobileNumber', this.diagnostic.value.dgstC_MobileNumber);
    formdata.append('dgstC_Address', this.diagnostic.value.dgstC_Address);
    formdata.append('primaryOrBranch', this.diagnostic.value.primaryOrBranch);
    formdata.append('dgstC_COUN_Id_FK', this.diagnostic.value.dgstC_COUN_Id_FK);
    formdata.append('dgstC_ST_Id_FK', this.diagnostic.value.dgstC_ST_Id_FK);
    formdata.append('dgstC_DI_Id_FK', this.diagnostic.value.dgstC_DI_Id_FK);
    formdata.append('MouDocument', this.selectfiles);
    formdata.append('dgstC_TL_Id_FK', this.diagnostic.value.dgstC_TL_Id_FK);
    formdata.append('dgstC_PostalCode', this.diagnostic.value.dgstC_PostalCode);
    formdata.append('dgstC_web_url', this.diagnostic.value.dgstC_web_url);
    formdata.append('dgstC_NE_Id', this.diagnostic.value.dgstC_NE_Id == null ? 0 : this.diagnostic.value.dgstC_NE_Id);
    formdata.append('dgstC_GR_Id_FK', this.diagnostic.value.dgstC_GR_Id_FK == null ? 0 : this.diagnostic.value.dgstC_GR_Id_FK);
    formdata.append('dgstC_Village', this.diagnostic.value.dgstC_Village);
    formdata.append('dgstC_AlterNumber', this.diagnostic.value.dgstC_AlterNumber == undefined ? 0 : this.diagnostic.value.dgstC_AlterNumber);
    formdata.append('dgstC_LandLineNo', this.diagnostic.value.dgstC_LandLineNo == undefined ? 0 : this.diagnostic.value.dgstC_LandLineNo);
    formdata.append('GSTno', this.diagnostic.value.GsTno == undefined ? 0 : this.diagnostic.value.GsTno);
    formdata.append('PANno', this.diagnostic.value.PaNno == undefined ? 0 : this.diagnostic.value.PaNno);
    //formdata.append('dgstC_Logo', this.selectedFiles);   
    this.service.put_diagnostic(formdata)
      .subscribe((res) => {
        this.notif.successmsg("Diagnostic Updated Successfully")
        this.dialogRef.close();
        window.location.reload();
      })
  }

  Get_Catagory() {
    this.service.Get_Diag_Catagory()
      .subscribe((data) => {
        this.catagory = data
      })
  }

  Get_diagnostic_dd() {
    this.service.Get_diagnostic_dd()
      .subscribe((data) => {
        this.branch = data
      })
  }
  Get_diagnostic_type() {
    this.service.Get_diagnostic_type()
      .subscribe((data) => {
        this.diagnostictypedd = data
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


  dgstC_p_b(event) {

    if (event == 'Primary') {
      this.branch_hid = true;
      this.network_hid = false;
      this.diagnostic.controls['dgstC_Branch'].reset();
      this.diagnostic.controls['dgstC_Branch'].clearValidators();
      this.diagnostic.controls['dgstC_Branch'].updateValueAndValidity();
      this.diagnostic.controls['dgstC_NE_Id'].setValidators([Validators.required]);
      this.diagnostic.controls['dgstC_NE_Id'].updateValueAndValidity();
      this.get_network();
    }
    else {
      this.branch_hid = false;
      this.network_hid = true;
      this.diagnostic.controls['dgstC_NE_Id'].reset();
      this.diagnostic.controls['dgstC_NE_Id'].clearValidators();
      this.diagnostic.controls['dgstC_NE_Id'].updateValueAndValidity();
      this.diagnostic.controls['dgstC_Branch'].setValidators([Validators.required]);
      this.diagnostic.controls['dgstC_Branch'].updateValueAndValidity();
      this.Get_diagnostic_dd();

    }
  }
  countrychange(event) {
    if (this.diagnostic.value.dgstC_COUN_Id_FK !== event) {
      this.diagnostic.controls['dgstC_ST_Id_FK'].setValue('');
      this.diagnostic.controls['dgstC_DI_Id_FK'].setValue('');
      this.diagnostic.controls['dgstC_TL_Id_FK'].setValue('');
    }
    this.taluk = undefined
    this.district = undefined
    this.state = undefined
    this.service.Get_State(event)
      .subscribe((data) => {
        this.state = data
      })
  }
  statechange(event) {
    if (this.diagnostic.value.dgstC_ST_Id_FK !== event) {
      this.diagnostic.controls['dgstC_DI_Id_FK'].setValue('');
      this.diagnostic.controls['dgstC_TL_Id_FK'].setValue('');
    }
    this.taluk = undefined
    this.district = undefined
    this.service.Get_District(event)
      .subscribe((data) => {
        this.district = data
      // }, (error: any) => {

      //   this.diagnostic.controls['dgstC_DI_Id_FK'].setValue('');
      //   this.diagnostic.controls['dgstC_TL_Id_FK'].setValue('');
      });
  }
  distritchange(event) {
    if (this.diagnostic.value.dgstC_DI_Id_FK !== event) {
      this.diagnostic.controls['dgstC_TL_Id_FK'].setValue('');
    }
    this.gram = undefined
    this.taluk = undefined
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
    if (this.diagnostic.value.dgstC_TL_Id_FK !== event) {
      this.diagnostic.controls['dgstC_GR_Id_FK'].setValue(''); // Reset village selection
      this.diagnostic.controls['dgstC_PostalCode'].setValue(''); // Reset postal code
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
    this.diagnostic.controls['dgstC_PostalCode'].setValue(this.pincode[0].postal_Code)
  }
}
