import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DiagnosticService } from '../diagnostic.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-diagnostic',
  templateUrl: './add-diagnostic.component.html',
  styleUrls: ['./add-diagnostic.component.scss']
})
export class AddDiagnosticComponent implements OnInit {

  imgs: boolean = true;
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
  diagnostictypedd: any;
  networkdd: any;
  countrydd: any;
  statedd: any;
  districtdd: any;
  selectfile: any;
  Image_Url;
  selectedPhotos: any;
  pincode: any;
  base64Image: any;

  constructor(private service: DiagnosticService, private router: Router, private notif: Notification, private domSanitizer: DomSanitizer) { }

  diagnostic = new FormGroup({
    dgstC_Name: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
    dgstC_Code: new FormControl('', [Validators.pattern("^[a-zA-Z0-9 ]{5}$"), Validators.required, Validators.minLength(1), Validators.maxLength(5), this.nameValidators]),
    GsTno: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.maxLength(15), Validators.minLength(15)]),
    PaNno: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.minLength(10), Validators.maxLength(10)]),
    regNo: new FormControl('', [Validators.pattern("^[a-zA-Z0-9 ]{1,10}$"), Validators.required, this.nameValidators]),
    dgstC_Type_Id: new FormControl(''),
    DGSTC_Logo: new FormControl(''),
    dgstC_Branch: new FormControl(''),
    dgstC_Email: new FormControl('', [Validators.email, Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    dgstC_MobileNumber: new FormControl('', [Validators.pattern("[0-9]{10}$"), Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    dgstC_Address: new FormControl('', [Validators.required]),
    primaryOrBranch: new FormControl(''),
    dgstC_COUN_Id_FK: new FormControl(''),
    dgstC_ST_Id_FK: new FormControl(''),
    dgstC_DI_Id_FK: new FormControl(''),
    dgstC_TL_Id_FK: new FormControl(''),
    dgstC_PostalCode: new FormControl('', [Validators.pattern("[0-9]{6}$"), Validators.minLength(6), Validators.maxLength(6)]),
    dgstC_web_url: new FormControl('', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
    dgstC_NE_Id: new FormControl(''),
    // dgstC_GR_Id_FK: new FormControl(''),
    dgstC_AlterNumber: new FormControl('', [Validators.pattern("[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]),
    dgstC_LandLineNo: new FormControl('', [Validators.pattern("[0-9]{5,11}$"), Validators.minLength(11), Validators.maxLength(11)]),
    dgstC_Logo: new FormControl(''),
    MOUDocument: new FormControl(''),
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


  ngOnInit(): void {
    this.Get_diagnostic_dd();
    this.get_country();
    this.get_network();
    this.Get_diagnostic_type();
    this.Image_Url = { url: '/asstes/images/profile.png' }
  }

  save() {
    const formdata = new FormData();
    formdata.append('dgstC_Name', this.diagnostic.value.dgstC_Name);
    formdata.append('dgstC_Code', this.diagnostic.value.dgstC_Code);
    formdata.append('DGSTC_Logo', this.selectedPhotos);
    formdata.append('gstNoOrPANno', this.diagnostic.value.gstNoOrPANno);
    //new
    formdata.append('GsTno', this.diagnostic.value.GsTno);
    formdata.append('PaNno', this.diagnostic.value.PaNno);
    formdata.append('regNo', this.diagnostic.value.regNo);
    formdata.append('dgstC_Type_Id', this.diagnostic.value.dgstC_Type_Id);
    formdata.append('dgstC_Branch', this.diagnostic.value.dgstC_Branch == null ? 0 : this.diagnostic.value.dgstC_Branch);
    formdata.append('dgstC_Email', this.diagnostic.value.dgstC_Email);
    formdata.append('dgstC_MobileNumber', this.diagnostic.value.dgstC_MobileNumber);
    formdata.append('dgstC_Address', this.diagnostic.value.dgstC_Address);
    formdata.append('primaryOrBranch', this.diagnostic.value.primaryOrBranch);
    formdata.append('dgstC_COUN_Id_FK', this.diagnostic.value.dgstC_COUN_Id_FK);
    formdata.append('dgstC_ST_Id_FK', this.diagnostic.value.dgstC_ST_Id_FK);
    formdata.append('dgstC_DI_Id_FK', this.diagnostic.value.dgstC_DI_Id_FK);
    formdata.append('dgstC_TL_Id_FK', this.diagnostic.value.dgstC_TL_Id_FK);
    formdata.append('dgstC_PostalCode', this.diagnostic.value.dgstC_PostalCode);
    formdata.append('dgstC_web_url', this.diagnostic.value.dgstC_web_url);
    formdata.append('dgstC_NE_Id', this.diagnostic.value.dgstC_NE_Id == null ? 0 : this.diagnostic.value.dgstC_NE_Id);
    formdata.append('dgstC_GR_Id_FK', this.diagnostic.value.dgstC_GR_Id_FK == null ? 0 : this.diagnostic.value.dgstC_GR_Id_FK);
    formdata.append('dgstC_AlterNumber', this.diagnostic.value.dgstC_AlterNumber);
    formdata.append('dgstC_LandLineNo', this.diagnostic.value.dgstC_LandLineNo);
    formdata.append('dgstC_Village', this.diagnostic.value.dgstC_Village);
    formdata.append('MOUDocument', this.selectfile);
    // formdata.append('dgstC_Logo', this.selectedFiles);   
    this.service.Post_diagnostic(formdata)
      .subscribe((res) => {
        this.notif.successmsg("Diagnostic Added Successfully");
        this.router.navigate(['/base/master/diagnostic']);
      })
    // this.diagnostic.reset();
  }


  // change_branch(value) {

  //   this.service.Get_branch_id(value)
  //     .subscribe((data) => {
  //       if (data == undefined) {
  //         this.get_network();
  //       }
  //       this.networkdd = data
  //       let s = data[0].dgstC_NE_Id
  //       this.diagnostic.controls['dgstC_NE_Id'].setValue(s)

  //     })
  // }


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
  // get_branch() {
  //   this.service.Get_branch()
  //     .subscribe((data) => {
  //       this.branch = data
  //     })
  // }
  get_country() {
    this.service.Get_country()
      .subscribe((data) => {
        this.country = data
      })
  }
  hos_p_b(event) {

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
  // countrychange(event) {
  //   this.gram = undefined
  //   this.taluk=undefined
  //   this.district = undefined
  //   this.state=undefined
  //   this.diagnostic.controls['dgstC_PostalCode'].reset();
  //   this.service.Get_State(event)
  //     .subscribe((data) => {
  //       this.state = data

  //       this.diagnostic.controls['dgstC_DI_Id_FK'].reset();
  //       this.diagnostic.controls['dgstC_TL_Id_FK'].reset();
  //       this.diagnostic.controls['dgstC_GR_Id_FK'].reset();
  //       this.diagnostic.controls['dgstC_PostalCode'].reset();

  //     if(this.state.length==0){
  //       this.notif.errorsmsg("Data not found!")
  //     }

  //   })

  // }


  countrychange(event) {
    if (this.diagnostic.value.dgstC_COUN_Id_FK !== event) {
      this.diagnostic.controls['dgstC_ST_Id_FK'].setValue('');
      this.diagnostic.controls['dgstC_DI_Id_FK'].setValue('');
      this.diagnostic.controls['dgstC_TL_Id_FK'].setValue('');
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
      //   this.diagnostic.controls['dgstC_DI_Id_FK'].reset();
      //   this.diagnostic.controls['dgstC_TL_Id_FK'].reset();
      });
  }
  distritchange(event) {
    if (this.diagnostic.value.dgstC_DI_Id_FK !== event) {
      this.diagnostic.controls['dgstC_TL_Id_FK'].setValue('');
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

  //        this.gram = this.testempty;
  //        this.diagnostic.controls['dgstC_GR_Id_FK'].reset();
  //       this.diagnostic.controls['dgstC_PostalCode'].reset();
  //     }
  //     );
  // }

  talukchange(event) {
    // Clear the village and pincode records
    this.diagnostic.controls['dgstC_GR_Id_FK'].reset();
    this.diagnostic.controls['dgstC_PostalCode'].reset();

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
    this.diagnostic.controls['dgstC_PostalCode'].setValue(this.pincode[0].postal_Code)
  }

}
