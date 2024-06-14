import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Notification } from 'src/app/core/Notifications/Notification';
import { PharmacyService } from '../pharmacy.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pharmacy',
  templateUrl: './add-pharmacy.component.html',
  styleUrls: ['./add-pharmacy.component.scss']
})
export class AddPharmacyComponent implements OnInit {

  branch_hid: boolean = true;
  network_hid: boolean = false;
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
  pincode: any;
  type: any;
  catagory: any;
  selectfile: any;
  base64Image: any;
  selectedPhotos: any;
  Image_Url;
  constructor(private service: PharmacyService, private router: Router, private notif: Notification, private domSanitizer: DomSanitizer) { }
  pharmacy = new FormGroup({
    ph_Name: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
    ph_Code: new FormControl('', [Validators.pattern("^[a-zA-Z0-9 ]{1,5}$"), Validators.required, Validators.minLength(5), Validators.maxLength(5), this.nameValidators,]),
    GsTno: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.maxLength(15), Validators.minLength(15)]),
    PaNno: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.minLength(10), Validators.maxLength(10)]),
    regNo: new FormControl('', [Validators.pattern("^[a-zA-Z0-9 ]{1,10}$"), Validators.required, this.nameValidators]),

    ph_Branch: new FormControl(''),
    ph_Email: new FormControl('', [Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
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
    ph_Village: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
    ph_GR_Id: new FormControl(''),
    cat_id: new FormControl(''),
    T_Id: new FormControl(''),
    ph_AlterNumber: new FormControl('', [Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    ph_LandLineNo: new FormControl('', [Validators.pattern("[0-9]{5,11}$"), this.nameValidator, Validators.maxLength(11)]),
    MOUDocument: new FormControl(''),
    Ph_Logo: new FormControl(''),
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
  onselectfiles(fileInput: any) {
    this.selectfile = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(event.target.result);
      //this.Image_Url = this.base64Image     
    };
  }
  onSelectPhoto(fileInput: any) {
    this.selectedPhotos = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(event.target.result);
      this.Image_Url = this.base64Image
    };
  }


  nameValidatorss(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/,/0-9]/;
    // const spaceexp: RegExp =/[/\s/g, '']/

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }

  ngOnInit(): void {
    // this.Get_Hospital_dd();
    // this.Get_Catagory();
    this.get_country();
    this.get_pharmacy_type();
    this.get_pharmacy_cate();
    this.Image_Url = { url: '/asstes/images/profile.png' }
    //this.get_network();
  }

  save() {
    const formdata = new FormData();
    formdata.append('ph_Name', this.pharmacy.value.ph_Name);
    formdata.append('Ph_Logo', this.selectedPhotos); // here photo
    formdata.append('ph_Code', this.pharmacy.value.ph_Code);
    formdata.append('regNo', this.pharmacy.value.regNo);
    formdata.append('cat_id', this.pharmacy.value.cat_id);
    formdata.append('T_Id', this.pharmacy.value.T_Id);
    formdata.append('GsTno', this.pharmacy.value.GsTno);
    formdata.append('PaNno', this.pharmacy.value.PaNno);
    formdata.append('ph_Branch', this.pharmacy.value.ph_Branch == null ? 0 : this.pharmacy.value.ph_Branch);
    formdata.append('ph_Email', this.pharmacy.value.ph_Email);
    formdata.append('ph_MobileNumber', this.pharmacy.value.ph_MobileNumber);
    formdata.append('ph_Address', this.pharmacy.value.ph_Address);
    formdata.append('primaryOrBranch', this.pharmacy.value.primaryOrBranch);
    formdata.append('ph_COUN_Id', this.pharmacy.value.ph_COUN_Id_FK);
    formdata.append('ph_ST_Id_FK', this.pharmacy.value.ph_ST_Id_FK);
    formdata.append('ph_DI_Id_FK', this.pharmacy.value.ph_DI_Id_FK);
    formdata.append('ph_Village', this.pharmacy.value.ph_Village);
    formdata.append('ph_tl_Id', this.pharmacy.value.ph_tl_Id);
    formdata.append('ph_PostalCode', this.pharmacy.value.ph_PostalCode);
    formdata.append('ph_web_url', this.pharmacy.value.ph_web_url);
    formdata.append('ph_NE_Id', this.pharmacy.value.ph_NE_Id == null ? 0 : this.pharmacy.value.ph_NE_Id);
    formdata.append('ph_GR_Id', this.pharmacy.value.ph_GR_Id == null ? 0 : this.pharmacy.value.ph_GR_Id);
    formdata.append('ph_AlterNumber', this.pharmacy.value.ph_AlterNumber);
    formdata.append('MOUDocument', this.selectfile);
    formdata.append('ph_LandLineNo', this.pharmacy.value.ph_LandLineNo);

    this.service.Post_pharmacy(formdata)
      .subscribe((res) => {
        this.notif.successmsg("Pharmacy added successfully");
        this.router.navigate(['/base/master/pharmacy']);
      })

  }


  Phy_p_b(event) {
    if (event == 'Primary') {
      this.branch_hid = true;
      this.network_hid = false
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
    if (this.pharmacy.value.ph_COUN_Id !== event) {
      this.pharmacy.controls['ph_ST_Id_FK'].setValue('');
      this.pharmacy.controls['ph_DI_Id_FK'].setValue('');
      this.pharmacy.controls['ph_tl_Id'].setValue('');
    }
    this.gram = undefined
    this.taluk = undefined
    this.district = undefined
    this.state = undefined
    this.pharmacy.controls['ph_PostalCode'].reset();
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
      //   this.pharmacy.controls['ph_DI_Id_FK'].reset();
      //   this.pharmacy.controls['ph_tl_Id'].reset();
      });
  }
  distritchange(event) {
    if (this.pharmacy.value.ph_DI_Id_FK !== event) {
      this.pharmacy.controls['ph_tl_Id'].setValue('');
    }
    this.taluk = undefined
    this.service.Get_Taluk(event)
      .subscribe((data) => {
        this.taluk = data
      })
  }

  testempty: any = [];
  gramData: any = [];
  // talukchange(event) {   
  //   this.gram = undefined;
  //   this.service.Get_Gram_id(event)
  //     .subscribe((data) => {

  //       this.gram = data

  //     }
  //      ,(error:any)=>
  //     {

  //       this.gram=this.testempty;
  //       this.pharmacy.controls['ph_PostalCode'].reset();
  //     }
  //     );
  // }
  talukchange(event) {
    // Clear the village and pincode records
    this.pharmacy.controls['ph_GR_Id'].reset();
    this.pharmacy.controls['ph_PostalCode'].reset();

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
      })
  }
}