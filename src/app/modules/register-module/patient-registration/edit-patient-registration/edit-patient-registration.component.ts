import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { environment } from 'src/environments/environment';
import { PatientRegistrationService } from '../patient-registration.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-patient-registration',
  templateUrl: './edit-patient-registration.component.html',
  styleUrls: ['./edit-patient-registration.component.scss']
})
export class EditPatientRegistrationComponent implements OnInit {
  today=new Date();
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
  gram: any;
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
  enable ;
  base64Image: any;
  constructor(private dialogRef: MatDialogRef<EditPatientRegistrationComponent>,@Inject(MAT_DIALOG_DATA) private _data: any, private service: PatientRegistrationService, private notif: Notification,private domSanitizer: DomSanitizer) { }
  patient = new FormGroup({
    PR_Id: new FormControl(''),
    PR_Photo: new FormControl(''),
    PR_PatientCode: new FormControl(''),
    PR_RemoteHospitalName_Id_FK: new FormControl(''),
    PR_FirstName: new FormControl('', [Validators.required,this.alphaValidator,this.spaceValidator]),
    PR_LastName: new FormControl('', [this.alphaValidator,this.spaceValidator]),
    PR_DOB: new FormControl('',[Validators.required]),
    PR_Age: new FormControl(''),
    PR_Gender: new FormControl(''),
    PR_MaritalStatus: new FormControl(''),
    PR_BloodGroup: new FormControl(''),
    PR_NAL_Id_FK: new FormControl(''),
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
    PR_Insured_Sum: new FormControl('',[this.nameValidator]),
    PR_MobileNumber: new FormControl('',[Validators.pattern("[0-9]{10}$"),Validators.required, this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    PR_Alternative_No: new FormControl('',[Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    PR_LandlineNo: new FormControl('',[Validators.pattern("[0-9]{5,11}$"), this.nameValidator, Validators.maxLength(11)]),
    PR_Email: new FormControl('', [Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    PR_Address: new FormControl(''),
    PR_Country_Id_FK: new FormControl(''),
    PR_S_Id_FK: new FormControl(''),
    PR_D_Id_FK: new FormControl(''),
    PR_Taluk_Id: new FormControl(''),
    PR_Gram_Id: new FormControl(''),
    PR_Village: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
    PR_Postalcode: new FormControl('',[Validators.minLength(6), Validators.maxLength(6), this.nameValidator]),
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
  alphaValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/,/0-9]/;   
    if (control.value && nameRegexp.test(control.value)) {
      return { alphaCheck: true };
    }
  }
  spaceValidator(control: any): { [key: string]: boolean } {      
    if ((control.value as string).indexOf('  ') >= 0 || control.value.startsWith(' ') ||  control.value.endsWith(' ')) {
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
      this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(event.target.result);
      this.Image_Url = this.base64Image
     
    };
  }
  ngOnInit(): void {
     
    this.get_country(); 
    // this.get_state();   
    this.get_discipline();
    this.get_network();
    this.get_nationality();
    this.get_religion();
    this.get_cast();
    this.get_identity();
    this.get_insurer();
    // this.identitychange(this.patient.value.PR_IDN_Id_FK);
    // this.get_country();
    this.get_occupation();
    this.get_language();    
    this.bind();
     this.countrychange(this._data.d.pR_Country_Id_FK);
     this.statechange(this._data.d.pR_S_Id_FK);
    this.distritchange(this._data.d.pR_D_Id_FK);
    //this.talukchange(this._data.d.pR_Taluk_Id);
    this.get_insurerbyid(this._data.d.pR_INU_Id_FK);
    this.Image_Url = this._data.d.pR_Image;  
    // this.identitychange(this.patient.value.PR_IDN_Id_FK);
   
  }
  updateform() {  
    
    const formdata = new FormData();
    const Pr_DOB = new DatePipe('en-US').transform(this.patient.value.PR_DOB, 'dd/MM/yyyy')
    formdata.append('PR_Id', this.patient.value.PR_Id)
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
    formdata.append('PR_InsuranceCategory', this.patient.value.PR_InsuranceCategory==null ? '': this.patient.value.PR_InsuranceCategory ) //john
    formdata.append('PR_INU_Id_FK', this.patient.value.PR_INU_Id_FK==null ? 0 : this.patient.value.PR_INU_Id_FK)// this.patient.value.PR_INU_Id_FK john
    formdata.append('PR_Insured_Sum', this.patient.value.PR_Insured_Sum==null ? 0 : this.patient.value.PR_Insured_Sum) // this.patient.value.PR_Insured_Sum john
    formdata.append('PR_MobileNumber', this.patient.value.PR_MobileNumber)
    formdata.append('PR_Alternative_No', this.patient.value.PR_Alternative_No)
    formdata.append('PR_LandlineNo', this.patient.value.PR_LandlineNo)
    formdata.append('PR_Email', this.patient.value.PR_Email)
    formdata.append('PR_Address', this.patient.value.PR_Address)
    formdata.append('PR_Country_Id_FK', this.patient.value.PR_Country_Id_FK)
    formdata.append('PR_S_Id_FK', this.patient.value.PR_S_Id_FK)
    formdata.append('PR_D_Id_FK', this.patient.value.PR_D_Id_FK)
    formdata.append('PR_Taluk_Id', this.patient.value.PR_Taluk_Id)
    formdata.append('PR_Gram_Id', this.patient.value.PR_Gram_Id)
    formdata.append('PR_Village', this.patient.value.PR_Village)
    formdata.append('PR_Postalcode', this.patient.value.PR_Postalcode)
    console.log('edit1 :' +formdata)
    console.log('edit2 :' +JSON.stringify(this.patient.value))

    this.service.Put_Patient(formdata)
      .subscribe((res) => {
        this.notif.successmsg("Patient Updated Successfully")
        this.dialogRef.close();
        window.location.reload();
      })
  }

  bind() { 
      console.log('edit bind data :' +JSON.stringify(this._data.d))

    this.patient.controls['PR_Id'].setValue(this._data.d.pR_Id);
    this.patient.controls['PR_PatientCode'].setValue(this._data.d.pR_PatientCode);//no
    this.patient.controls['PR_RemoteHospitalName_Id_FK'].setValue(this._data.d.pR_RemoteHospitalName_Id_FK);
    this.patient.controls['PR_FirstName'].setValue(this._data.d.pR_FirstName);
    this.patient.controls['PR_LastName'].setValue(this._data.d.pR_LastName);
    this.patient.controls['PR_DOB'].setValue(this._data.d.pR_DOB);
    this.patient.controls['PR_Age'].setValue(this._data.d.pR_Age);
    this.patient.controls['PR_Gender'].setValue(this._data.d.pR_Gender);
    this.patient.controls['PR_MaritalStatus'].setValue(this._data.d.pR_MaritalStatus);
    this.patient.controls['PR_BloodGroup'].setValue(this._data.d.pR_BloodGroup);
    this.patient.controls['PR_NAL_Id_FK'].setValue(this._data.d.pR_NAL_Id_FK);
    this.patient.controls['PR_REG_Id_FK'].setValue(this._data.d.pR_REG_Id_FK);
    this.patient.controls['PR_CAT_Id_FK'].setValue(this._data.d.pR_CAT_Id_FK);
    this.patient.controls['PR_MotherTongue'].setValue(this._data.d.pR_MotherTongue);
    this.patient.controls['PR_IDN_Id_FK'].setValue(this._data.d.pR_IDN_Id_FK);
    this.patient.controls['PR_Identity_No'].setValue(this._data.d.pR_Identity_No);
    this.patient.controls['National_Health_Id'].setValue(this._data.d.national_Health_Id);
    this.patient.controls['PR_OCU_Id_FK'].setValue(this._data.d.pR_OCU_Id_FK);
    this.patient.controls['PR_Income'].setValue(this._data.d.pR_Income);
    this.patient.controls['PR_Insurance'].setValue(this._data.d.pR_Insurance);
    this.patient.controls['PR_INU_Id_FK'].setValue(this._data.d.PR_INU_Id_FK);
    this.patient.controls['PR_InsuranceCategory'].setValue(this._data.d.insurer_Category);
    this.patient.controls['PR_Insured_Sum'].setValue(this._data.d.pR_Insured_Sum);
    this.patient.controls['PR_MobileNumber'].setValue(this._data.d.pR_MobileNumber);
    this.patient.controls['PR_Alternative_No'].setValue(this._data.d.pR_Alternative_No);
    this.patient.controls['PR_LandlineNo'].setValue(this._data.d.pR_LandlineNo);
    this.patient.controls['PR_Email'].setValue(this._data.d.pR_Email);
    this.patient.controls['PR_Address'].setValue(this._data.d.pR_Address);
    this.patient.controls['PR_Country_Id_FK'].setValue(this._data.d.pR_Country_Id_FK);
    this.patient.controls['PR_S_Id_FK'].setValue(this._data.d.pR_S_Id_FK);
    this.patient.controls['PR_D_Id_FK'].setValue(this._data.d.pR_D_Id_FK);
    this.patient.controls['PR_Taluk_Id'].setValue(this._data.d.pR_Taluk_Id);
    this.patient.controls['PR_Gram_Id'].setValue(this._data.d.pR_Gram_Id==null ? 0 : this._data.d.pR_Gram_Id);
    this.patient.controls['PR_Village'].setValue(this._data.d.pR_Village);
    this.patient.controls['PR_Postalcode'].setValue(this._data.d.pR_Postalcode);
    if (this._data.d.pR_Insurance == "Yes") {
      this.enable = false;
    }
    else{
      this.enable = true;
    }
    
     
      
  }
  get_network() {
    this.service.Get_network()
      .subscribe((data) => {
        this.networkdd = data
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
  get_country() {
    this.service.Get_country()
      .subscribe((data) => {
        this.country = data
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
        //console.log('mix life and health data :' +JSON.stringify(this.insuranceCategory))     
      })
  }
  get_insurerbyid(id) {
    this.service.Get_insurer()
      .subscribe((data) => {
        this.insuranceCategory = data
        this.insurer = this.insuranceCategory.filter(x => x.id == id);
        this.patient.controls['PR_InsuranceCategory'].setValue(this.insurer[0].insurer_Category);
        this.patient.controls['PR_INU_Id_FK'].setValue(this.insurer[0].id);
       
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
  countrychange(event) {
    if (this.patient.value.PR_Country_Id_FK !== event) {
      this.patient.controls['PR_S_Id_FK'].setValue('');
      this.patient.controls['PR_D_Id_FK'].setValue('');
      this.patient.controls['PR_Taluk_Id'].setValue('');
    }
    this.taluk=undefined
    this.district = undefined
    this.state=undefined   
    this.service.Get_State(event)
      .subscribe((data) => {
        this.state = data        
        if (this.state.length == 0) {
          this.notif.errorsmsg("Data not found!");
        }
      })
  }
  statechange(event) { 
    if (this.patient.value.PR_S_Id_FK !== event) {
      this.patient.controls['PR_D_Id_FK'].setValue('');
      this.patient.controls['PR_Taluk_Id'].setValue('');
    }
    this.taluk=undefined
    this.district = undefined   
    this.service.Get_District(event)
      .subscribe((data) => {
        this.district = data
      // },(error:any)=>
      // { 
       
      //   this.patient.controls['PR_D_Id_FK'].setValue('');
      //   this.patient.controls['PR_Taluk_Id'].setValue('');
      });
  }
  
  distritchange(event) {
    if (this.patient.value.PR_D_Id_FK!== event) {
      this.patient.controls['PR_Taluk_Id'].setValue('');
      }
    this.gram = undefined
    this.taluk = undefined
    
    this.gram = undefined
    this.taluk=undefined
    this.service.Get_Taluk(event)
    
      .subscribe((data) => {
        this.taluk = data;
        //  this.patient.controls['PR_Gram_Id'].setValue("");
        //  this.patient.controls['PR_Postalcode'].setValue("");
        
        // if(this.patient.value.PR_Gram_Id!=null && this.patient.value.PR_Postalcode!=null)
        // {
        //   console.log(this.patient.value.PR_Gram_Id);
        
         
        // }
       
      });

      
  }
  testempty:any=[];
  gramData:any=[];
  // talukchange(event) {

  //   this.gram = undefined 
  
    
  //   this.service.Get_Gram_id(event)
  //     .subscribe((data) => {
  //       this.gram = data;
  //     }
      
  //     ,(error:any)=>
  //     {
       
  //       this.gram=this.testempty;
  //       this.patient.controls['PR_Postalcode'].setValue('');
  //     }
      
      
  //     );
  // }


  talukchange(event) {
    if (this.patient.value.PR_Taluk_Id !== event) {
    // this.patient.controls['PR_Gram_Id'].setValue(''); // Reset village selection
    // this.patient.controls['PR_Postalcode'].setValue(''); // Reset postal code
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

    
  

  

  Insurance(event) { 
    if (event.value == 'Yes') {
    this.enable = false;
    // this.patient.value.PR_InsuranceCategory = '';
    // this.patient.value.PR_INU_Id_FK = 0;
    // this.patient.value.PR_Insured_Sum = 0;
    this.patient.get('PR_InsuranceCategory').reset();
    this.patient.get('PR_INU_Id_FK').reset();
    this.insurer=null;
    this.patient.get('PR_Insured_Sum').reset();
    this.patient.get('PR_InsuranceCategory').setValidators([Validators.required]);
    this.patient.get('PR_INU_Id_FK').setValidators([Validators.required]);
      this.patient.get('PR_Insured_Sum').setValidators([Validators.required, this.nameValidator]);
     this.patient.get('PR_InsuranceCategory').updateValueAndValidity();
    this.patient.get('PR_INU_Id_FK').updateValueAndValidity();
    this.patient.get('PR_Insured_Sum').updateValueAndValidity();
    }
    else {
    this.enable = true;
    this.patient.value.PR_InsuranceCategory = '';
    this.patient.value.PR_INU_Id_FK = 0;
    this.patient.value.PR_Insured_Sum = 0;
    this.insurer=null;
    this.patient.get('PR_InsuranceCategory').clearValidators();
    this.patient.get('PR_INU_Id_FK').clearValidators();
    this.patient.get('PR_Insured_Sum').clearValidators();
    // this.patient.get('PR_InsuranceCategory').reset();
    // this.patient.get('PR_INU_Id_FK').reset();
    // this.patient.get('PR_Insured_Sum').reset();
    
    this.patient.get('PR_InsuranceCategory').updateValueAndValidity();
    this.patient.get('PR_INU_Id_FK').updateValueAndValidity();
    this.patient.get('PR_Insured_Sum').updateValueAndValidity();
    }
  }
  InsuranceCategory(event) {   
    //alert(event.value)
    
    this.patient.get('PR_INU_Id_FK').setValidators([Validators.required]);
    this.patient.get('PR_Insured_Sum').setValidators([Validators.required]);
    
    this.patient.get('PR_INU_Id_FK').updateValueAndValidity();
    this.patient.get('PR_Insured_Sum').updateValueAndValidity();
    this.insurer = this.insuranceCategory.filter(x => x.insurer_Category == event.value);
    this.patient.get('PR_INU_Id_FK').reset();
  }
  selectpincode(gram_id) {        
    this.pincode = this.gram.filter(x => x.gram_id == gram_id)   
    this.patient.controls['PR_Postalcode'].setValue(this.pincode[0].postal_Code)
  }

  get_statedd() {
    this.service.Get_StateDD()
      .subscribe((data) => {
        this.statedd = data
      })
  }
  
  get_discipline() {
    this.service.Get_Discipline()
      .subscribe((data) => {
        this.disciplinedd = data
      })
  }
  min:any;
  max:any;
  identitychange($event) {
    this.patient.controls['PR_Identity_No'].reset();
    this.patient.controls['PR_Identity_No'].clearValidators();
   
     if($event==1)
     {
      
      this.min=12
      this.max=12
      this.patient.controls['PR_Identity_No'].setValidators([Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(12)])//Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)])

    }
    else{
       this.patient.controls['PR_Identity_No'].setValidators([Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/), this.nameValidators, Validators.minLength(15)])
      this.min=15
      this.max=15
     }
    this.patient.controls['PR_Identity_No'].updateValueAndValidity();

  }
   
}