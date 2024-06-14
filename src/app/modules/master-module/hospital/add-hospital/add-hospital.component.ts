import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Notification } from 'src/app/core/Notifications/Notification';
import { HospitalService } from '../hospital.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.scss']
})
export class AddHospitalComponent implements OnInit {
  imgs: boolean = true;
  imgs1: boolean = true;
  branch_hid: boolean = true;
  network_hid: boolean = true;
  postal_code: any;
  country: any;
  state: any;
  district: any;
  taluk: any;
  gram: any;
  catagory: any;
  branch: any;
  hospitaltypedd: any;
  networkdd: any;
  // countrydd: any;
  statedd: any;
  districtdd: any;
  Image_Url;
  Image_Url1;
  pincode: any;
  selectfile: any;
  base64Image: any;
  domSanitizer: any;
  selectedPhotos: any;
  selectedPhotos1:any;
  MOUDocument: any;
  el: any;
  constructor(private service: HospitalService, private router: Router, private notif: Notification) { }
  hospital = new FormGroup({
    hos_HospitalName: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
    hos_HospitalCode: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.maxLength(10), Validators.required]),
    GsTno: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.maxLength(15), Validators.minLength(15)]),
    PaNno: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.minLength(10), Validators.maxLength(10)]),
    RegNo: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.maxLength(20)]),
    Hos_cat_Id: new FormControl(''),
    Hos_Type_Id: new FormControl(''),
    hos_Branch: new FormControl(''),
    hos_HospitalEmail: new FormControl('', [Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    hos_HospitalPhoneNo: new FormControl('', [Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10), Validators.required]),
    hos_HospitalAddress: new FormControl(''),
    primaryorBranch: new FormControl(''),
    Hos_Country_Id_FK: new FormControl(''),
    Hos_ST_Id_FK: new FormControl(''),
    Hos_DI_Id_FK: new FormControl(''),
    Hos_Taluk_Id: new FormControl(''),
    Hos_Village: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
    hos_PostalCode: new FormControl('', [Validators.pattern("[0-9]{6}$"), this.nameValidator, Validators.minLength(6), Validators.maxLength(6)]),
    Hos_web_url: new FormControl('', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
    hos_NE_Id_FK: new FormControl(''),
    // Hos_Gram_Id: new FormControl(''),
    hos_Alterno: new FormControl('', [Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
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
  public checkError = (controlName: string, errorName: string) => {
    return this.country.controls[controlName].hasError(errorName);
  }
  onSelectFile(fileInput: any) {
    this.selectedPhotos = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.Image_Url = { url: event.target.result }
      this.imgs = false;
    };
  }
  onSelectFile1(fileInput1: any) {
    this.selectedPhotos1 = <File>fileInput1.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput1.target.files[0]);
    reader.onload = (event: any) => {
      this.Image_Url1 = { url: event.target.result }
      this.imgs1 = false;
    };
  }
  onselectfiles(fileInput: any) {
    this.selectfile = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(event.target.result);
      this.Image_Url = this.base64Image
    };
  }
  ngOnInit(): void {
    this.Get_Hospital_dd();
    this.Get_Catagory();
    this.get_country();
    this.get_network();
    this.Get_hospitaltype();
    this.Image_Url = { url: '' }
    this.Image_Url1 = { url: '' }
  }
  save() {
    const formdata = new FormData();
    formdata.append('hos_HospitalName', this.hospital.value.hos_HospitalName);
    formdata.append('hos_HospitalCode', this.hospital.value.hos_HospitalCode);
    formdata.append('PaNno', this.hospital.value.PaNno);
    formdata.append('GsTno', this.hospital.value.GsTno);
    formdata.append('RegNo', this.hospital.value.RegNo);
    formdata.append('Hos_cat_Id', this.hospital.value.Hos_cat_Id);
    formdata.append('Hos_Type_Id', this.hospital.value.Hos_Type_Id);
    formdata.append('hos_Branch', this.hospital.value.hos_Branch == null ? 0 : this.hospital.value.hos_Branch);
    formdata.append('hos_HospitalEmail', this.hospital.value.hos_HospitalEmail);
    formdata.append('hos_HospitalPhoneNo', this.hospital.value.hos_HospitalPhoneNo);
    formdata.append('hos_HospitalAddress', this.hospital.value.hos_HospitalAddress);
    formdata.append('primaryorBranch', this.hospital.value.primaryorBranch);
    formdata.append('Hos_Country_Id_FK', this.hospital.value.Hos_Country_Id_FK);
    formdata.append('Hos_ST_Id_FK', this.hospital.value.Hos_ST_Id_FK);
    formdata.append('Hos_DI_Id_FK', this.hospital.value.Hos_DI_Id_FK);
    formdata.append('Hos_Taluk_Id', this.hospital.value.Hos_Taluk_Id);
    formdata.append('hos_PostalCode', this.hospital.value.hos_PostalCode);
    //new
    formdata.append('Hos_web_url', this.hospital.value.Hos_web_url);
    formdata.append('hos_NE_Id_FK', this.hospital.value.hos_NE_Id_FK == null ? 0 : this.hospital.value.hos_NE_Id_FK);
    formdata.append('Hos_Village', this.hospital.value.Hos_Village);
    // formdata.append('Hos_Gram_Id', this.hospital.value.Hos_Gram_Id==null ? 0 : this.hospital.value.Hos_Gram_Id);
    formdata.append('hos_Alterno', this.hospital.value.hos_Alterno);
    formdata.append('hos_Landline', this.hospital.value.hos_Landline);
    formdata.append('hos_HospitalLogo', this.selectedPhotos);
    formdata.append('Hos_NetworkLogo', this.selectedPhotos1);
    formdata.append('MOUDocument', this.selectfile);
    this.service.Post_hospital(formdata)
      .subscribe((res) => {
        this.notif.successmsg("Hospital Added Successfully");
        //this.hospital.reset();  
        this.router.navigate(['/base/master/hospital']);

      })

    // this.hospital.reset(); 
  }

  change_branch(value) {

    this.service.Get_branch_id(value)
      .subscribe((data) => {
        if (data == undefined) {
          this.get_network();
        }
        this.networkdd = data
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
      this.get_branch();

    }
  }
  Get_Hospital_dd() {
    this.service.Get_hospital_dd()
      .subscribe((data) => {
        this.branch = data
      })
  }
  Get_Catagory() {
    this.service.Get_Catagory()
      .subscribe((data) => {
        this.catagory = data
      })
  }
  Get_hospitaltype() {
    this.service.Get_hospital_type()
      .subscribe((data) => {
        this.hospitaltypedd = data
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
      },
        (error: any) => {
          // Handle error if needed
        });
  }
  statechange(event) {
    if (this.hospital.value.Hos_ST_Id_FK !== event) {
      this.hospital.controls['Hos_DI_Id_FK'].setValue('');
      this.hospital.controls['Hos_Taluk_Id'].setValue('');
    }
    this.gram = undefined
    this.taluk = undefined
    this.district = undefined
    this.service.Get_District(event)
      .subscribe((data) => {
        this.district = data

      // }, (error: any) => {
      //   this.hospital.controls['Hos_DI_Id_FK'].reset();
      //   this.hospital.controls['Hos_Taluk_Id'].reset();
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
    // this.hospital.controls['Hos_Gram_Id'].reset();
    // this.hospital.controls['hos_PostalCode'].reset();

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
