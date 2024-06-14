import { DatePipe } from '@angular/common';
import { AbstractControl, MinLengthValidator } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Notification } from 'src/app/core/Notifications/Notification';
import { PatientRegistrationService } from '../patient-registration.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-patient-registration',
  templateUrl: './add-patient-registration.component.html',
  styleUrls: ['./add-patient-registration.component.scss']
})
export class AddPatientRegistrationComponent implements OnInit {
  today = new Date();
  hospitaldd: any;
  qualificationdd: any;
  networkdd: any;
  designationdd: any;
  disciplinedd: any;
  specilizationdd: any;
  statedd: any;
  districtdd: any;
  selectedFiles: any;
  Image_Url;
  gender = [
    { text: 'Male' },
    { text: 'Female' },
    { text: 'Others' },
  ]
  country: any;
  state: any;
  taluk: any;
  gram: any = [];
  pincode: any;
  district: any;
  nationality: any;
  religion: any;
  caste: any;
  identity: any;
  insuranceCategory: any;
  insurer: any;
  occupation: any;
  language: any;
  enable = true;
  constructor(private service: PatientRegistrationService, private router: Router, private notif: Notification) { }
  patient = new FormGroup({
    PR_Photo: new FormControl(''),
    PR_PatientCode: new FormControl(''),
    PR_RemoteHospitalName_Id_FK: new FormControl(''),
    PR_FirstName: new FormControl('', [Validators.required, this.alphaValidator, this.spaceValidator]),
    PR_LastName: new FormControl('', [ this.alphaValidator, this.spaceValidator]),
    PR_DOB: new FormControl(''),
    PR_Age: new FormControl(''),
    PR_Gender: new FormControl(''),
    PR_MaritalStatus: new FormControl(''),
    PR_BloodGroup: new FormControl(''),
    PR_NAL_Id_FK: new FormControl(1),
    PR_REG_Id_FK: new FormControl(''),
    PR_CAT_Id_FK: new FormControl(''),
    PR_MotherTongue: new FormControl(''),
    PR_IDN_Id_FK: new FormControl(''),
    PR_Identity_No: new FormControl(''),
    National_Health_Id: new FormControl('', [Validators.min(0)]),
    PR_OCU_Id_FK: new FormControl(''),
    PR_Income: new FormControl(''),
    PR_Insurance: new FormControl(''),
    PR_InsuranceCategory: new FormControl(''),
    PR_INU_Id_FK: new FormControl(''),
    PR_Insured_Sum: new FormControl('', [this.nameValidator]),
    PR_MobileNumber: new FormControl('', [Validators.pattern("[0-9]{10}$"), Validators.required, this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    PR_Alternative_No: new FormControl('', [Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    PR_LandlineNo: new FormControl('', [Validators.pattern("[0-9]{11}$"), this.nameValidator, Validators.maxLength(11)]),
    PR_Email: new FormControl('', [Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    PR_Address: new FormControl(''),
    PR_Country_Id_FK: new FormControl(''),
    PR_S_Id_FK: new FormControl(''),
    PR_D_Id_FK: new FormControl(''),
    PR_Taluk_Id: new FormControl(''),
    PR_Gram_Id: new FormControl(''),
    PR_Village: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
    PR_Postalcode: new FormControl('', [Validators.minLength(6), Validators.maxLength(6), Validators.required, this.nameValidator]),
    toppingsControl: new FormControl(''),
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
  identity_no(control: AbstractControl) {
    const name1: RegExp = /^([a-zA-Z0-9]+)(!a-zA-Z)$/;
    const name2: RegExp = /[!^a-zA-Z]/;
    if (control.value && name1.test(control.value)) {
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





  dobchange(event) {
    if (event.value) {
      const convertAge = new Date(event.value);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      this.patient.controls['PR_Age'].setValue(age)
    }
  }
  onSelectFile(fileInput: any) {
    this.selectedFiles = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.Image_Url = { url: event.target.result }
    };
  }

  onToppingRemoved(topping: string) {
    const toppings = this.patient.value.toppingsControl;
    this.removeFirst(toppings, topping);
    this.patient.controls['toppingsControl'].setValue(toppings); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.get_network();
    this.get_nationality();
    this.get_religion();
    this.get_cast();
    this.get_identity();
    this.get_insurer();
    this.get_country();
    this.get_occupation();
    this.get_language();
    this.Image_Url = { url: '/asstes/images/profile.png' }
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
        if (this.country.length === 1) {
          this.patient.controls['PR_Country_Id_FK'].setValue(this.country[0].cntry_id);
          this.countrychange(this.country[0].cntry_id);
        }
      })
  }
  get_nationality() {
    this.service.Get_nationality()
      .subscribe((data) => {
        this.nationality = data
      })
  }
  get_religion() {
    this.service.Get_religion()
      .subscribe((data) => {
        this.religion = data
      })
  }
  get_cast() {
    this.service.Get_cast()
      .subscribe((data) => {
        this.caste = data
      })
  }
  get_identity() {
    this.service.Get_identity()
      .subscribe((data) => {
        this.identity = data
      })
  }
  get_insurer() {
    this.service.Get_insurer()
      .subscribe((data) => {
        this.insuranceCategory = data
      })
  }
  get_occupation() {
    this.service.Get_occupation()
      .subscribe((data) => {
        this.occupation = data
      })
  }
  get_language() {
    this.service.Get_language()
      .subscribe((data) => {
        this.language = data
      })
  }
  min: any;
  max: any;
  identitychange($event) {
    this.patient.controls['PR_Identity_No'].reset();
    this.patient.controls['PR_Identity_No'].clearValidators();
    if ($event == 1) {

      this.min = 12
      this.max = 12
      this.patient.controls['PR_Identity_No'].setValidators([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.minLength(12)])//Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)])

    }
    else if ($event != 1) {
      this.patient.controls['PR_Identity_No'].setValidators([Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/), this.nameValidators, Validators.minLength(15)])
      this.min = 15
      this.max = 15
    }

  }

  // countrychange(event) {   
  //   this.service.Get_State(event)
  //     .subscribe((data) => {
  //       this.state = data
  //       if(this.state==''){
  //         this.patient.controls['PR_D_Id_FK'].reset();
  //         this.patient.controls['PR_Taluk_Id'].reset();
  //         this.patient.controls['PR_Gram_Id'].reset();
  //         this.patient.controls['PR_Postalcode'].reset();
  //       }

  //     })

  // }
  countrychange(event) {
    if (this.patient.value.PR_Country_Id_FK !== event) {
      this.patient.controls['PR_S_Id_FK'].setValue('');
      this.patient.controls['PR_D_Id_FK'].setValue('');
      this.patient.controls['PR_Taluk_Id'].setValue('');
    }

    this.state = undefined;
    this.district = undefined;
    this.taluk = undefined;
    this.gram = undefined;

    this.service.Get_State(event)
      .subscribe((data) => {
        this.state = data;
        if (this.state.length === 1) {
          this.patient.controls['PR_S_Id_FK'].setValue(this.state[0].stat_id);
          this.statechange(this.state[0].stat_id);
        }
        else if (this.state.length == 0) {
          this.notif.errorsmsg("Data not found!");
        }
      },
        (error: any) => {
          // Handle error if needed
        });
  }

  statechange(event) {
    if (this.patient.value.PR_S_Id_FK !== event) {
      this.patient.controls['PR_D_Id_FK'].setValue('');
      this.patient.controls['PR_Taluk_Id'].setValue('');
    }
    this.service.Get_District(event)
      .subscribe((data) => {
        this.district = data

      // }, (error: any) => {
      //   this.patient.controls['PR_D_Id_FK'].reset();
      //   this.patient.controls['PR_Taluk_Id'].reset();
            });
  }
  distritchange(event) {
    if (this.patient.value.PR_D_Id_FK !== event) {
      this.patient.controls['PR_Taluk_Id'].setValue('');
    }
    this.service.Get_Taluk(event)
      .subscribe((data) => {
        this.taluk = data
      })

  }
  testempty: any = [];
  gramData: any = [];
  talukchange(event) {
    // Clear the village and pincode records
    this.patient.controls['PR_Gram_Id'].reset();
    this.patient.controls['PR_Postalcode'].reset();

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

  selectpincode2(event) {

    // console.log ("pincode1 +" +event.target.value)
    // console.log ("pincode2 +" +JSON.stringify(event))
    /*
    this.service.Get_Gram_id(event)
      .subscribe((data) => {
        this.gram = data       
      },(error:any)=>
      {
        this.patient.controls['PR_Postalcode'].reset();
      });
      */


  }
  selectpincode(gram_id) {
    this.pincode = this.gram.filter(x => x.gram_id == gram_id)
    this.patient.controls['PR_Postalcode'].setValue(this.pincode[0].postal_Code)
  }

  Insurance(event) {
    if (event.value == 'Yes') {
      this.enable = false;
      this.patient.get('PR_InsuranceCategory').reset();
      this.patient.get('PR_INU_Id_FK').reset();
      this.patient.get('PR_Insured_Sum').reset();
      this.patient.get('PR_InsuranceCategory').setValidators([Validators.required]);
      this.patient.get('PR_INU_Id_FK').setValidators([Validators.required]);
      this.patient.get('PR_Insured_Sum').setValidators([Validators.required, this.nameValidator]);
      this.patient.get('PR_InsuranceCategory').updateValueAndValidity();
      this.patient.get('PR_INU_Id_FK').updateValueAndValidity();
      this.patient.get('PR_Insured_Sum').updateValueAndValidity();

    }
    else if (event.value == 'No') {
      this.enable = true;


      this.patient.get('PR_InsuranceCategory').reset();
      this.patient.get('PR_INU_Id_FK').reset();
      this.patient.get('PR_Insured_Sum').reset();
      this.patient.get('PR_InsuranceCategory').clearValidators();
      this.patient.get('PR_INU_Id_FK').clearValidators();
      this.patient.get('PR_Insured_Sum').clearValidators();
      this.patient.controls['PR_InsuranceCategory'].setValue('');
      this.patient.controls['PR_INU_Id_FK'].setValue(0);
      this.patient.controls['PR_Insured_Sum'].setValue(0);
      this.patient.get('PR_InsuranceCategory').updateValueAndValidity();
      this.patient.get('PR_INU_Id_FK').updateValueAndValidity();
      this.patient.get('PR_Insured_Sum').updateValueAndValidity();
    }



  }
  InsuranceCategory(event) {
    this.patient.get('PR_INU_Id_FK').setValidators([Validators.required]);
    this.patient.get('PR_Insured_Sum').setValidators([Validators.required, this.nameValidator]);

    this.patient.get('PR_INU_Id_FK').updateValueAndValidity();
    this.patient.get('PR_Insured_Sum').updateValueAndValidity();
    this.insurer = this.insuranceCategory.filter(x => x.insurer_Category == event.value);
    this.patient.get('PR_INU_Id_FK').reset();
  }

  save() {

    const formdata = new FormData();
    const Pr_DOB = new DatePipe('en-US').transform(this.patient.value.PR_DOB, 'dd/MM/yyyy')
    // formdata.append('assi_userid_fk', this.patient.value.assi_userid_fk)
    formdata.append('PR_Photo', this.selectedFiles)
    formdata.append('PR_PatientCode', this.patient.value.PR_PatientCode)
    formdata.append('PR_RemoteHospitalName_Id_FK', this.patient.value.PR_RemoteHospitalName_Id_FK)
    formdata.append('PR_FirstName', this.patient.value.PR_FirstName)
    formdata.append('PR_LastName', this.patient.value.PR_LastName)
    formdata.append('PR_DOB', Pr_DOB)
    formdata.append('PR_Age', this.patient.value.PR_Age)
    formdata.append('PR_Gender', this.patient.value.PR_Gender)
    formdata.append('PR_MaritalStatus', this.patient.value.PR_MaritalStatus)
    formdata.append('PR_BloodGroup', this.patient.value.PR_BloodGroup)
    formdata.append('PR_NAL_Id_FK', this.patient.value.PR_NAL_Id_FK)
    formdata.append('PR_REG_Id_FK', this.patient.value.PR_REG_Id_FK)
    formdata.append('PR_CAT_Id_FK', this.patient.value.PR_CAT_Id_FK)
    formdata.append('PR_MotherTongue', this.patient.value.PR_MotherTongue)
    formdata.append('PR_IDN_Id_FK', this.patient.value.PR_IDN_Id_FK)
    formdata.append('PR_Identity_No', this.patient.value.PR_Identity_No)
    formdata.append('National_Health_Id', this.patient.value.National_Health_Id)
    formdata.append('PR_OCU_Id_FK', this.patient.value.PR_OCU_Id_FK)
    formdata.append('PR_Income', this.patient.value.PR_Income)
    formdata.append('PR_Insurance', this.patient.value.PR_Insurance)
    formdata.append('PR_InsuranceCategory', this.patient.value.PR_InsuranceCategory)
    formdata.append('PR_INU_Id_FK', this.patient.value.PR_INU_Id_FK)//change
    formdata.append('PR_Insured_Sum', this.patient.value.PR_Insured_Sum)
    formdata.append('PR_MobileNumber', this.patient.value.PR_MobileNumber)
    formdata.append('PR_Alternative_No', this.patient.value.PR_Alternative_No)
    formdata.append('PR_LandlineNo', this.patient.value.PR_LandlineNo)
    formdata.append('PR_Email', this.patient.value.PR_Email)
    formdata.append('PR_Address', this.patient.value.PR_Address)
    formdata.append('PR_Country_Id_FK', this.patient.value.PR_Country_Id_FK)
    formdata.append('PR_S_Id_FK', this.patient.value.PR_S_Id_FK)
    formdata.append('PR_D_Id_FK', this.patient.value.PR_D_Id_FK)
    formdata.append('PR_Taluk_Id', this.patient.value.PR_Taluk_Id)
    // formdata.append('PR_Gram_Id', this.patient.value.PR_Gram_Id)
    formdata.append('PR_Gram_Id', this.patient.value.PR_Gram_Id == null ? 0 : this.patient.value.PR_Gram_Id)
    formdata.append('PR_Village', this.patient.value.PR_Village)
    formdata.append('PR_Postalcode', this.patient.value.PR_Postalcode)
    

    console.log("Data:", this.patient.value)
    this.service.Post_Patient(formdata)
      .subscribe((res) => {
        this.notif.successmsg("Patient Added Successfully");
        this.router.navigate(['/base/registration/patient']);
      })
  }
}