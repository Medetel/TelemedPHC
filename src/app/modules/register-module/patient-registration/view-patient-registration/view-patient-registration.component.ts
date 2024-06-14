import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Notification } from 'src/app/core/Notifications/Notification';
import { PatientRegistrationService } from '../patient-registration.service';

@Component({
  selector: 'app-view-patient-registration',
  templateUrl: './view-patient-registration.component.html',
  styleUrls: ['./view-patient-registration.component.scss']
})
export class ViewPatientRegistrationComponent implements OnInit {
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
  enable;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any, private service: PatientRegistrationService, private notif: Notification) { }
  patient = new FormGroup({
    PR_Id: new FormControl(''),
    PR_Photo: new FormControl(''),
    PR_PatientCode: new FormControl(''),
    PR_RemoteHospitalName_Id_FK: new FormControl(''),
    PR_FirstName: new FormControl(''),
    PR_LastName: new FormControl(''),
    PR_DOB: new FormControl(''),
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
    National_Health_Id: new FormControl(''),
    PR_OCU_Id_FK: new FormControl(''),
    PR_Income: new FormControl(''),
    PR_Insurance: new FormControl(''),
    PR_InsuranceCategory: new FormControl(''),
    pR_INU_Id_FK: new FormControl(''),
    PR_Insured_Sum: new FormControl(''),
    PR_MobileNumber: new FormControl(''),
    PR_Alternative_No: new FormControl(''),
    PR_LandlineNo: new FormControl(''),
    PR_Email: new FormControl(''),
    PR_Address: new FormControl(''),
    PR_Country_Id_FK: new FormControl(''),
    PR_S_Id_FK: new FormControl(''),
    PR_D_Id_FK: new FormControl(''),
    PR_Taluk_Id: new FormControl(''),
    PR_Gram_Id: new FormControl(''),
    PR_Postalcode: new FormControl(''),
    toppingsControl: new FormControl(''),

  })
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
  ngOnInit(): void {    
    this.get_state();   
    this.get_country();
    this.get_state();
    this.get_district();
    this.get_taluk();
    this.get_gram();
    this.get_discipline();
    this.get_network();
    this.get_nationality();
    this.get_religion();
    this.get_cast();
    this.get_identity();
    this.get_insurer();
    this.get_country();
    this.get_occupation();
    this.get_language();
    //this.get_insurerbyid(4); not used
    this.bind();
    this.disable();

    this.Image_Url =  this._data.d.pR_Image;
    
  }
 
  bind() {
    console.log('view data :' +JSON.stringify(this._data.d));
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
    this.patient.controls['PR_NAL_Id_FK'].setValue(this._data.d.nationality);
    this.patient.controls['PR_REG_Id_FK'].setValue(this._data.d.religion);
    this.patient.controls['PR_CAT_Id_FK'].setValue(this._data.d.caste);
    this.patient.controls['PR_MotherTongue'].setValue(this._data.d.language);
    this.patient.controls['PR_IDN_Id_FK'].setValue(this._data.d.doC_Name);
    this.patient.controls['PR_Identity_No'].setValue(this._data.d.pR_Identity_No);
    this.patient.controls['National_Health_Id'].setValue(this._data.d.national_Health_Id);
    this.patient.controls['PR_OCU_Id_FK'].setValue(this._data.d.occupation);
    this.patient.controls['PR_Income'].setValue(this._data.d.pR_Income);
    this.patient.controls['PR_Insurance'].setValue(this._data.d.pR_Insurance);
    this.patient.controls['PR_InsuranceCategory'].setValue(this._data.d.insurer_Category); //hard code -> LIFE and Health 
    this.patient.controls['pR_INU_Id_FK'].setValue(this._data.d.insurer); // dynamic data 
    // this.patient.controls['insurer'].setValue(this._data.d.insurer);
    this.patient.controls['PR_Insured_Sum'].setValue(this._data.d.pR_Insured_Sum);
    this.patient.controls['PR_MobileNumber'].setValue(this._data.d.pR_MobileNumber);
    this.patient.controls['PR_Alternative_No'].setValue(this._data.d.pR_Alternative_No);
    this.patient.controls['PR_LandlineNo'].setValue(this._data.d.pR_LandlineNo);
    this.patient.controls['PR_Email'].setValue(this._data.d.pR_Email);
    this.patient.controls['PR_Address'].setValue(this._data.d.pR_Address);
    this.patient.controls['PR_Country_Id_FK'].setValue(this._data.d.pR_Country_Name);
    this.patient.controls['PR_S_Id_FK'].setValue(this._data.d.pR_StateName);
    this.patient.controls['PR_D_Id_FK'].setValue(this._data.d.pR_District);
    this.patient.controls['PR_Taluk_Id'].setValue(this._data.d.taluk_name);
    this.patient.controls['PR_Gram_Id'].setValue(this._data.d.pR_Village);
    this.patient.controls['PR_Postalcode'].setValue(this._data.d.pR_Postalcode);
    if (this._data.d.pR_Insurance == "Yes") {
      this.enable = false;     
    }
    else {
      this.enable = true;
    }
   }

  disable(){
    this.patient.controls['PR_FirstName'].disable();
    this.patient.controls['PR_LastName'].disable();
    this.patient.controls['PR_DOB'].disable();
    this.patient.controls['PR_Age'].disable();
    this.patient.controls['PR_Gender'].disable();
    this.patient.controls['PR_MaritalStatus'].disable();
    this.patient.controls['PR_BloodGroup'].disable();
    this.patient.controls['PR_NAL_Id_FK'].disable();
    this.patient.controls['PR_REG_Id_FK'].disable();
    this.patient.controls['PR_CAT_Id_FK'].disable();
    this.patient.controls['PR_MotherTongue'].disable();
    this.patient.controls['PR_IDN_Id_FK'].disable();
    this.patient.controls['PR_Identity_No'].disable();
    this.patient.controls['National_Health_Id'].disable();
    this.patient.controls['PR_OCU_Id_FK'].disable();
    this.patient.controls['PR_Income'].disable();
    this.patient.controls['PR_Insurance'].disable();
    this.patient.controls['PR_InsuranceCategory'].disable();
    this.patient.controls['pR_INU_Id_FK'].disable();
    this.patient.controls['PR_Insured_Sum'].disable();
    this.patient.controls['PR_MobileNumber'].disable();
    this.patient.controls['PR_Alternative_No'].disable();
    this.patient.controls['PR_LandlineNo'].disable();
    this.patient.controls['PR_Email'].disable();
    this.patient.controls['PR_Address'].disable();
    this.patient.controls['PR_Country_Id_FK'].disable();
    this.patient.controls['PR_S_Id_FK'].disable();
    this.patient.controls['PR_D_Id_FK'].disable();
    this.patient.controls['PR_Taluk_Id'].disable();
    this.patient.controls['PR_Gram_Id'].disable();
    this.patient.controls['PR_Postalcode'].disable();
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
    this.service.Get_State(event)
      .subscribe((data) => {
        this.state = data
      })
  }
  statechange(event) {    
    this.service.Get_District(event)
      .subscribe((data) => {
        this.district = data
      })
  }
  distritchange(event) {
    this.service.Get_Taluk(event)
      .subscribe((data) => {
        this.taluk = data
      })
  }
  talukchange(event) {   
    this.service.Get_Gram_id(event)
      .subscribe((data) => {
        this.gram = data
      })
  }
  Insurance(event) {    
    if (event.value == 'Yes') {
      this.enable = false;
    }
    else
      this.enable = true;
  }
  InsuranceCategory(event) {    
    this.insurer = this.insuranceCategory.filter(x => x.insurer_Category == event.value);
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
}