import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DoctorRegistrationService } from '../doctor-registration.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbDropdownItem } from '@ng-bootstrap/ng-bootstrap';
import { event } from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-doctor-registration',
  templateUrl: './add-doctor-registration.component.html',
  styleUrls: ['./add-doctor-registration.component.scss']
})
export class AddDoctorRegistrationComponent implements OnInit {
  [x: string]: any;
  imgs: boolean = true;
  signs: boolean = true;
  country: any;
  state: any;
  district: any;
  taluk: any;
  gram: any;
  hospitaldd: any;
  languagedd: any;
  qualificationdd: any;
  designationdd: any;
  disciplinedd: any;
  specialistdoctordd: any;
  specilizationdd: any;
  statedd: any;
  districtdd: any;
  selectedFiles: any;
  selectfile: any;
  selectedPhotos: any;
  selectedSigns: any;
  Image_Url;
  Sign_Url;
  gender = [
    { text: 'Male' },
    { text: 'Female' },
    { text: 'Others' },
  ]
  pincode: any;
  specs: any;
  base64Image: any;
  servcharge: any;
  servcode: any;
  chargedetail: any;
  //service_code:boolean = false;
  maxDate: any = new Date();


  constructor(private service: DoctorRegistrationService, private router: Router, private notif: Notification, private domSanitizer: DomSanitizer) { }

  doctor = new FormGroup({
    Doc_Signature_Doc: new FormControl(''),
    DO_Photo: new FormControl(''),
    Regno: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.maxLength(20)]),
    DO_FirstName: new FormControl('', [Validators.required, this.alphaValidator, this.spaceValidator]),
    DO_LastName: new FormControl('', [Validators.required, this.alphaValidator, this.spaceValidator]),
    DO_DOB: new FormControl(''),
    DO_Gender: new FormControl(''),
    DO_MobileNumber: new FormControl('', [Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    DO_Alernative_Numb: new FormControl('', [Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    DO_OfficialNumber: new FormControl('', [Validators.pattern("[0-9]{5,11}$"), this.nameValidator, Validators.maxLength(11)]),
    DO_Email: new FormControl('', [Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    PaNno: new FormControl('', [Validators.pattern("^[a-zA-Z0-9 ]{10}$"), Validators.minLength(10), Validators.maxLength(10), this.nameValidators]),
    DO_Address: new FormControl(''),
    DO_HO_Id_FK: new FormControl(''),
    DO_QU_Id_FK: new FormControl(''),
    DO_DE_Id_FK: new FormControl(''),
    DO_CD_Id_FK: new FormControl(''),
    DO_Spc_Id_FK: new FormControl(''),
    DO_SC_Id_FK: new FormControl(''),
    DO_Country_Id_FK: new FormControl(''),
    DO_ST_Id_FK: new FormControl(''),
    DO_DI_Id_FK: new FormControl(''),
    DO_Taluk_Id: new FormControl(''),
    DO_Gram_Id: new FormControl(''),
    DO_Village: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
    DO_PostalCode: new FormControl('', [Validators.pattern("[0-9]{6}$"), this.nameValidator, Validators.minLength(6), Validators.maxLength(6)]),
    DoctorLanguage: new FormControl(''),
    DO_MotherTongue: new FormControl(''),
    //uploadprofile:new FormControl(''),
    DO_Choose_Document: new FormControl(''),
    MOUDocument: new FormControl(''),
    service_name: new FormControl('', Validators.required),
    service_code: new FormControl('', Validators.required),
    charges: new FormControl(''),
    DO_SP_Id_FK: new FormControl(''),
    DO_NE_Id_FK: new FormControl('', [Validators.required]),
    //uploadphoto:new FormControl(''),

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

  nameValidatorss(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/,/0-9]/;

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }

  }

  alphaValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/,/0-9]/;
    if (control.value && nameRegexp.test(control.value)) {
      return { alphaCheck: true };
    }
  }
  spaceValidator(control: any): { [key: string]: boolean } {
    if ((control.value as string).indexOf('  ') >= 0 || control.value.startsWith(' ') || control.value.endsWith(' ')) {
      return { spaceCheck: true };
    }
  }
  /*
  public checkError = (controlName: string, errorName: string) => {
    return this.country.controls[controlName].hasError(errorName);
  }
  */

  onSelectFile(fileInput: any) {
    this.selectedFiles = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(event.target.result);
      //this.Image_Url = this.base64Image     
    };
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
      this.imgs = false;
    };
  }

  onSelectSig(fileInput: any) {
    this.selectedSigns = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(event.target.result);
      this.Sign_Url = this.base64Image
      this.signs = false;
    };
  }



  onToppingRemoved(topping: string) {
    const toppings = this.doctor.value.DoctorLanguage;
    this.removeFirst(toppings, topping);
    this.doctor.controls['DoctorLanguage'].setValue(toppings); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.get_hospitaldd();
    this.get_qualificationdd();
    this.get_designationdd();
    this.get_specilizationdd();
    this.get_country();
    this.get_discipline();
    this.get_specialistdoctordd();
    this.Get_language();
    this.getservicedd();
    this.get_network();
    this.Image_Url = { url: '/asstes/images/profile.png' }
    this.Sign_Url = { url: '/asstes/images/profile.png' }
    this.doctor.controls['charges'].disable();

  }




  save() {
    if (this.doctor.value.service_code == "" || this.doctor.value.service_code == null) {
      this.notif.errorsmsg("Service Code is required")
      return;
    }


    if (this.doctor.invalid) {
      return;
    }

    if (this.doctor.value.service_name == 7) {
      this.doctor.controls['service_code'].setValue("");
    }


    for (const key of Object.keys(this.doctor.controls)) {
      if (this.doctor.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        invalidControl.focus();
        break;
      }
    }

    const formdata = new FormData();
    const ass_DOB = new DatePipe('en-US').transform(this.doctor.value.DO_DOB, 'dd/MM/yyyy')
    formdata.append('Doc_Signature_Doc', this.selectedSigns);
    formdata.append('DO_Photo', this.selectedPhotos); // here photo
    formdata.append('DO_Choose_Document', this.selectedFiles);
    formdata.append('MOUDocument', this.selectfile);
    formdata.append('Regno', this.doctor.value.Regno);
    formdata.append('DO_FirstName', this.doctor.value.DO_FirstName);
    formdata.append('DO_LastName', this.doctor.value.DO_LastName);
    formdata.append('DO_DOB', ass_DOB);
    formdata.append('DO_CD_Id_FK', this.doctor.value.DO_CD_Id_FK);
    formdata.append('DO_Spc_Id_FK', this.doctor.value.DO_Spc_Id_FK);
    formdata.append('DO_Gender', this.doctor.value.DO_Gender);
    formdata.append('DO_MobileNumber', this.doctor.value.DO_MobileNumber);
    formdata.append('DO_Alernative_Numb', this.doctor.value.DO_Alernative_Numb);
    formdata.append('DO_OfficialNumber', this.doctor.value.DO_OfficialNumber);
    formdata.append('DO_Email', this.doctor.value.DO_Email);
    formdata.append('PaNno', this.doctor.value.PaNno);
    formdata.append('DO_Address', this.doctor.value.DO_Address);
    formdata.append('DO_HO_Id_FK', this.doctor.value.DO_HO_Id_FK);
    formdata.append('DO_QU_Id_FK', this.doctor.value.DO_QU_Id_FK);
    formdata.append('DO_DE_Id_FK', this.doctor.value.DO_DE_Id_FK);
    formdata.append('DO_SC_Id_FK', this.doctor.value.DO_SC_Id_FK);
    formdata.append('DO_Country_Id_FK', this.doctor.value.DO_Country_Id_FK);
    formdata.append('DO_ST_Id_FK', this.doctor.value.DO_ST_Id_FK);
    formdata.append('DO_DI_Id_FK', this.doctor.value.DO_DI_Id_FK);
    formdata.append('DO_Taluk_Id', this.doctor.value.DO_Taluk_Id);
    formdata.append('DO_Gram_Id', this.doctor.value.DO_Gram_Id);
    formdata.append('DO_Village', this.doctor.value.DO_Village);
    formdata.append('DO_PostalCode', this.doctor.value.DO_PostalCode);
    formdata.append('DO_Languages', this.doctor.value.DO_Languages);
    formdata.append('DO_MotherTongue', this.doctor.value.DO_MotherTongue);
    formdata.append('Services_FK', this.doctor.value.service_name);
    formdata.append('Price_Id_FK', this.doctor.value.service_code);
    formdata.append('Charges', this.pricedata);
    formdata.append('DO_SP_Id_FK', this.doctor.value.DO_SP_Id_FK);
    formdata.append('DO_NE_Id_FK', this.doctor.value.DO_NE_Id_FK);

    console.log("form data :", this.doctor.value);


    this.service.Post_Doctor(formdata)
      .subscribe((res) => {
        this.notif.successmsg("Doctor Added Successfully");
        this.router.navigate(['/base/registration/doctor']);

      })

  }
  get_hospitaldd() {
    this.service.Get_HospitalDD()
      .subscribe((data) => {
        this.hospitaldd = data
      })
  }

  getservicedd() {
    this.service.Get_Servicecharge_DD()
      .subscribe((data) => {
        this.servcharge = data
        this.servcharge = this.servcharge.filter(x => x.service_Id != 7)
      })

  }

  networkdd: any;
  get_network() {
    this.service.Get_network()
      .subscribe((data) => {
        this.networkdd = data
      })
  }

  servicechange($event) {
    this.servcode = null;
    this.chargedetail = null;
    this.doctor.controls['service_code'].reset();
    this.doctor.controls['charges'].reset();
    console.log('daats', $event)
    if ($event == 7) {
      //this.notif.errorsmsg("Please choose another service")
      this.doctor.controls['service_code'].disable();
    }
    else {
      this.doctor.controls['service_code'].enable();
    }



    //here get serice id and passd and dget the listdc of service code and populate in the ddl
    this.service.Get_Servicecode_DD($event)

      .subscribe((data) => {


        console.log('service data ' + JSON.stringify(data))
        this.servcode = data
        this.servcode = this.servcode.filter(u => u.status != 6)

      },
        (error) => {
          if (this.data == '[]') {
            this.doctor.controls['service_code'].disable();
          }
        }



      )
    this.doctor.controls['charges'].setValue('');
    this.pricedata = '';
  }


  codechange(event) {
    this.chargedetail = null;
    this.doctor.controls['charges'].reset();
    //here get serice code and passd and dget the service charge and display in charge text box
    this.service.Get_Servicecharge_Detail(event)
      .subscribe((data) => {
        console.log('service data ' + JSON.stringify(data))
        this.chargedetail = data
        this.pricedata = this.chargedetail.charges;
        this.doctor.controls['charges'].setValue(this.chargedetail.charges);
      })

  }

  discriptiondd: any;
  typescategory(event) {
    // this.Diagnosis.controls['DO_SD_Id_FK'].setValue(undefined);
    this.service.Get_Specialization_Desdd(event)
      .subscribe((data) => {
        this.discriptiondd = data
        this.Diagnosis.controls['DO_SP_Id_FK'].setValue(this.discriptiondd.sP_Id);
      })
  }


  get_qualificationdd() {
    this.service.Get_QualificationDD()
      .subscribe((data) => {
        this.qualificationdd = data
      })
  }
  get_designationdd() {
    this.service.Get_DesignationDD()
      .subscribe((data) => {
        this.designationdd = data
      })
  }

  get_specilizationdd() {
    this.service.Get_SpecializationDD()
      .subscribe((data) => {
        this.specs = data
      })
  }
  get_statedd() {
    this.service.Get_StateDD()
      .subscribe((data) => {
        this.statedd = data
      })
  }
  get_districtdd() {
    this.service.Get_DistrictDD()
      .subscribe((data) => {
        this.districtdd = data
      })
  }
  departmentdd: any;
  get_discipline() {
    this.service.Get_Discipline()
      .subscribe((data) => {
        this.departmentdd = data
      })
  }
  get_specialistdoctordd() {
    this.service.Get_specialistdocDD()
      .subscribe((data) => {
        this.specialistdoctordd = data
      })
  }
  get_country() {
    this.service.Get_country()
      .subscribe((data) => {
        this.country = data
      })

  }
  //    countrychange(event){
  //     this.gram = undefined
  //     this.taluk=undefined
  //     this.district = undefined
  //     this.state=undefined 
  //     this.doctor.controls['DO_PostalCode'].reset();
  //      this.service.Get_State(event)
  //      .subscribe((data)=>{
  //        this.state=data

  //        this.doctor.controls['DO_DI_Id_FK'].reset();
  //        this.doctor.controls['DO_Taluk_Id'].reset();
  //        this.doctor.controls['DO_Gram_Id'].reset();
  //        this.doctor.controls['DO_PostalCode'].reset();

  //      if(this.state.length==0){
  //        this.notif.errorsmsg("Data not found!")
  //      }

  //      })
  // }

  countrychange(event) {
    if (this.doctor.value.DO_Country_Id_FK !== event) {
      this.doctor.controls['DO_ST_Id_FK'].setValue('');
      this.doctor.controls['DO_DI_Id_FK'].setValue('');
      this.doctor.controls['DO_Taluk_Id'].setValue('');
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
    if (this.doctor.value.DO_ST_Id_FK !== event) {
      this.doctor.controls['DO_DI_Id_FK'].setValue('');
      this.doctor.controls['DO_Taluk_Id'].setValue('');
    }
    this.gram = undefined
    this.taluk = undefined
    this.district = undefined
    this.service.Get_District(event)
      .subscribe((data) => {
        this.district = data
        // }, (error: any) => {
        //   this.doctor.controls['DO_DI_Id_FK'].reset();
        //   this.doctor.controls['DO_Taluk_Id'].reset();
        // this.doctor.controls['DO_Gram_Id'].reset();
        // this.doctor.controls['DO_PostalCode'].reset();
      });
  }
  distritchange(event) {
    if (this.doctor.value.DO_DI_Id_FK !== event) {
      this.doctor.controls['DO_Taluk_Id'].setValue('');
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
  // talukchange(event){ 
  //   if (this.doctor.value.DO_Taluk_Id !== event) {
  //     this.doctor.controls['DO_Gram_Id'].setValue(''); // Reset village selection
  //     this.doctor.controls['DO_PostalCode'].setValue(''); // Reset postal code
  //     } 
  //   this.gram = undefined;   
  //   this.service.Get_Gram_id(event)
  //     .subscribe((data) => {

  //       this.gram = data 

  //     }
  //      ,(error:any)=>
  //     {

  //       this.gram=this.testempty;
  //       this.doctor.controls['DO_PostalCode'].reset();
  //     }
  //     );
  // }


  talukchange(event) {
    // Clear the village and pincode records
    this.doctor.controls['DO_Gram_Id'].reset();
    this.doctor.controls['DO_PostalCode'].reset();

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


  Get_language() {
    this.service.Get_Language()
      .subscribe((data) => {
        this.languagedd = data
      })
  }




  // discpchange(event) {
  //   this.service.Get_SpecializationDDby(event)
  //     .subscribe((data) => {
  //       this.specs = data
  //       this.doctor.controls['DO_SP_Id_FK'].reset();
  //     })
  // }

  selectpincode(gram_id) {
    this.pincode = this.gram.filter(x => x.gram_id == gram_id)
    this.doctor.controls['DO_PostalCode'].setValue(this.pincode[0].postal_Code)
  }
  disable() {
    this.doctor.controls['service_code'].disable();
  }

}
