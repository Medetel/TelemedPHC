import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Notification } from 'src/app/core/Notifications/Notification';
import { PHCManualAppointService } from '../../phc-manual-appoint.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-phc-manual-appoinment',
  templateUrl: './edit-phc-manual-appoinment.component.html',
  styleUrls: ['./edit-phc-manual-appoinment.component.scss']
})
export class EditPhcManualAppoinmentComponent implements OnInit {
  doctordd:any;
  minDate:any=new Date();
  pat:any;
  pat_id?:any;
  appid:number;
  Image_Url ;
  complaint:any =[];
  complaint1: any = [];
  symptoms:any =[];
  symptoms1:any =[];
  today=new Date();
  complaintselected: any;
  symptomsselected: any;
  diseasesselected: any;
  medicationsselected: any;
  allergy: any;
  allergysignsselected: any;
  patient_name: any;
  patient_id: any;
  patient_dob: any;
  patient_age: any;
  patient_gender: any;
  hospitaldd: any;
  diseases: any=[];
  diseases1: any = [];
  medication: any = [];
  medication1: any = [];

  //saheb
  lipid:any;
  total_cholesterol:any;
  hdl_cholesterol:any;
  triglycerides:any;
  ldl: any;
  constructor(private dialogRef: MatDialogRef<EditPhcManualAppoinmentComponent >,@Inject(MAT_DIALOG_DATA) private _data: any,private service:PHCManualAppointService,private notif:Notification) { }
  @ViewChild('multiUserSearch') multiUserSearchInput: ElementRef;
  @ViewChild('multiUserSearch1') multiUserSearchInput1: ElementRef;
  @ViewChild('multiUserSearch2') multiUserSearchInput2: ElementRef;
  @ViewChild('multiUserSearch3') multiUserSearchInput3: ElementRef;
    patient = new FormGroup({
      pR_Id:new FormControl('')
    })
    fixappointment=new FormGroup({
      phc_Appt_Id:new FormControl(''),
      appt_PatientId_FK:new FormControl(''),
      appt_DateTime:new FormControl(this.today),
      select_toTime:new FormControl(''),
      select_FrmTime:new FormControl(''),
      select_day:new FormControl(''),
      complaint:new FormControl(''),
      diseasesDtl:new FormControl(''),
      symptoms: new FormControl(''),
      underMedication: new FormControl(''),
      height:new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      weight:new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      hemoglobin:new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      tempInFahrenheit:new FormControl(''),
      tempInCelsius:new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      //bloodPressure:new FormControl('', [Validators.pattern("^[0-9]{1,3}/[0-9]{1,3}$")]),^[0-9]+/[0-9]+$
      bloodPressure: new FormControl('', [Validators.pattern("^[0-9/]*$")]),
      sugar:new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      pulseRate: new FormControl('', [Validators.pattern("^[0-9/]*$")]),
      respiratoryRate:new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      ecg:new FormControl(''),
      oxygenSaturation:new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      allergySigns_DTL:new FormControl(''),
      // underSugarMedication:new FormControl(''),
      // underBPMedication:new FormControl(''),
      hos_Id:new FormControl(''),

      //saheb     
    lp_total_cholesterol: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    lp_triglycerides: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    lp_hdl_cholesterol: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    lp_ldl: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      pA_BMI: new FormControl({ value: null })

    })
  ngOnInit(): void {
    this.onHeightWeightChange();
    this.bind();
    this.Patient();
    this.complaintselected = this.fixappointment.value.complaint
    this.symptomsselected = this.fixappointment.value.symptoms
    this.diseasesselected = this.fixappointment.value.diseasesDtl
    this.allergysignsselected = this.fixappointment.value.allergySigns_DTL
    this.medicationsselected = this.fixappointment.value.underMedication
    this.Get_complaint();
    this.Get_symptoms();
    this.Get_Diseases();
    this.Get_Allergy();
    this.Get_hospital();
    this.Get_medication();
    this.Image_Url =this._data.d.pR_Image;
  }

  calculateBMI() {
    const height = this.fixappointment.get('height').value;
    const weight = this.fixappointment.get('weight').value;

    if (height && weight) {
      // Calculate BMI using the formula: BMI = weight (kg) / (height (m) * height (m))
      const heightInMeters = height / 100; // Convert height from cm to meters
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2); // Rounded to 2 decimal places

      this.fixappointment.get('pA_BMI').setValue(bmi);
    } else {
      this.fixappointment.get('pA_BMI').setValue(''); // Clear BMI when height or weight is empty
    }
  }

  onHeightWeightChange() {
    this.fixappointment.get('height').valueChanges.subscribe(() => {
      this.calculateBMI();
    });

    this.fixappointment.get('weight').valueChanges.subscribe(() => {
      this.calculateBMI();
    });
  }

  nameValidators(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?/\s/g,''/a-zA-Z]/;
    // const spaceexp: RegExp =/[/\s/g, '']/
  
    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  } 

  onAllergySelectionChange(): void {
    const selectedOption = this.fixappointment.value.allergySigns_DTL;


    const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.al_Name === "Other than Listed");

    if (noneOptionSelected) {
      //this.fixappointment.get('allergySigns_DTL').setValue(['None']);
      this.isOptionDisabled(noneOptionSelected);
    }
  }

  isOptionDisabled(option: any): boolean {
    const selectedOption = this.fixappointment.value.allergySigns_DTL;
    if (selectedOption == '') {
      return;
    }
    const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.al_Name === "Other than Listed");
    if (noneOptionSelected) {
      return option.al_Name != "Other than Listed" && noneOptionSelected;
    }
    else {
      return option.al_Name == "Other than Listed"
    }
  }


  isOptionDisabled1(option: any): boolean {
    const selectedOption = this.fixappointment.value.diseasesDtl;
    if (selectedOption == '') {
    return;
    }
    const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.diseases_Name === "Other than Listed");
    if (noneOptionSelected) {
      return option.diseases_Name != "Other than Listed" && noneOptionSelected;
    }
    else {
      return option.diseases_Name == "Other than Listed"
    }
   
   
    }
    
    isOptionDisabled2(option: any): boolean {
    const selectedOption = this.fixappointment.value.symptoms;
    if (selectedOption == '') {
    return;
    }
      const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.smst_Name === "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)");
    if (noneOptionSelected) {
      return option.smst_Name != "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)" && noneOptionSelected;
    }
    else {
      return option.smst_Name == "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)"
    }
   
   
    }
   
    isOptionDisabled3(option: any): boolean {
    const selectedOption = this.fixappointment.value.complaint;
    if (selectedOption == '') {
    return;
    }
      const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.cmst_Name === "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)");
    if (noneOptionSelected) {
      return option.cmst_Name != "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)" && noneOptionSelected;
    }
    else {
      return option.cmst_Name == "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)"
    }
   
   
    }



  isOptionDisabledm(option: any): boolean {
    const selectedOption = this.fixappointment.value.underMedication;
    if (selectedOption == '') {
      return;
    }
    const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.medic_name === "Other than Listed");
    if (noneOptionSelected) {
      return option.medic_name != "Other than Listed" && noneOptionSelected;
    }
    else {
      return option.medic_name == "Other than Listed"
    }


  }

  public objectComparisonFunctioncomplaint = function (option, value): boolean {
    return option.cmst_Id === value.cmst_Id;
  }
  public objectComparisonFunctionsymptoms = function (option, value): boolean {
    return option.smst_Id === value.smst_Id;
  }
  public objectComparisonFunctionPresentIlleness = function (option, value): boolean {
    return option.id === value.id;
  }
  public objectComparisonFunctionallergysigns = function (option, value): boolean {
    return option.al_Id === value.al_Id;
  }
  public objectComparisonFunctionmedications = function (option, value): boolean {
    return option.medic_id === value.medic_id;
  }

  onToppingRemovedcomplaint(topping: string) {
    const toppings = this.fixappointment.value.complaint;
    this.removeFirst(toppings, topping);
    this.fixappointment.controls['complaint'].setValue(toppings);
  }
  onToppingRemovedsymptoms(topping: string) {
    const toppings = this.fixappointment.value.symptoms;
    this.removeFirst(toppings, topping);
    this.fixappointment.controls['symptoms'].setValue(toppings);
  }
  onToppingRemoveddiseases(topping: string) {
    const toppings = this.fixappointment.value.diseasesDtl;
    this.removeFirst(toppings, topping);
    this.fixappointment.controls['diseasesDtl'].setValue(toppings);
  }
  onToppingRemovedallergysigns(topping: string) { 
    const toppings = this.fixappointment.value.allergySigns_DTL;
    this.removeFirst(toppings, topping);
    this.fixappointment.controls['allergySigns_DTL'].setValue(toppings);
  }
  onToppingRemovedm(topping: string) {
    const toppings = this.fixappointment.value.underMedication;
    this.removeFirst(toppings, topping);
    this.fixappointment.controls['underMedication'].setValue(toppings); // To trigger change detection
  }
  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  onInputChange() {
    console.log(this.multiUserSearchInput.nativeElement.value);
    const searchInput = this.multiUserSearchInput.nativeElement.value ?
      this.multiUserSearchInput.nativeElement.value.toLowerCase() : '';
    this.complaint = this.complaint1.filter(c => {
      const name: string = c.cmst_Name.toLowerCase();
      return name.indexOf(searchInput) > -1;

    });
  }

  onInputChange1() {
    console.log(this.multiUserSearchInput1.nativeElement.value);
    const searchInput1 = this.multiUserSearchInput1.nativeElement.value ?
      this.multiUserSearchInput1.nativeElement.value.toLowerCase() : '';
    this.symptoms = this.symptoms1.filter(c => {
      const name: string = c.smst_Name.toLowerCase();
      return name.indexOf(searchInput1) > -1;

    });
  }

  onInputChange2() {
    console.log(this.multiUserSearchInput2.nativeElement.value);
    const searchInput2 = this.multiUserSearchInput2.nativeElement.value ?
      this.multiUserSearchInput2.nativeElement.value.toLowerCase() : '';
    this.diseases = this.diseases1.filter(c => {
      const name: string = c.diseases_Name.toLowerCase();
      return name.indexOf(searchInput2) > -1;

    });


  }

  onInputChange3() {
    console.log(this.multiUserSearchInput3.nativeElement.value);
    const searchInput3 = this.multiUserSearchInput3.nativeElement.value ?
      this.multiUserSearchInput3.nativeElement.value.toLowerCase() : '';
    this.medication = this.medication1.filter(c => {
      const name: string = c.medic_name.toLowerCase();
      return name.indexOf(searchInput3) > -1;

    });
  }
  resetSearchInput(inputElement: ElementRef<HTMLInputElement>) {
    inputElement.nativeElement.value = '';
    }
    
    resetComplaintSearchInput() {
    this.resetSearchInput(this.multiUserSearchInput);
    this.complaint = this.complaint1; // Reset the filtered complaint list to the original list
    }
    
    resetSymptomsSearchInput() {
    this.resetSearchInput(this.multiUserSearchInput1);
    this.symptoms = this.symptoms1; // Reset the filtered symptoms list to the original list
    }
    
    resetDiseasesSearchInput() {
    this.resetSearchInput(this.multiUserSearchInput2);
    this.diseases = this.diseases1; // Reset the filtered present illnesses list to the original list
    }
  
  resetMedicationSearchInput() {
    this.resetSearchInput(this.multiUserSearchInput3);
    this.medication = this.medication1; // Reset the filtered medication list to the original list
  }

  bind(){
    this.fixappointment.patchValue({
      phc_Appt_Id: this._data.d.phc_Appt_Id,
      complaint: this._data.d.complaintslist,
      symptoms: this._data.d.symptomslist,
      underMedication: this._data.d.medicationlist,
      diseasesDtl: this._data.d.diseaseslist,
      allergySigns_DTL: this._data.d.allergylist,
      appt_DateTime: this._data.d.appt_DateTime,
      select_toTime: this._data.d.select_toTime,
      hos_Id: this._data.d.hos_Id,
      select_FrmTime: this._data.d.select_FrmTime,
      select_day: this._data.d.select_date,
      height: this._data.d.appt_PA_Height,
      weight: this._data.d.appt_PA_Weight,
      lp_total_cholesterol:this._data.d.lp_total_cholesterol,
      lp_triglycerides:this._data.d.lp_triglycerides,
      lp_hdl_cholesterol:this._data.d.lp_hdl_cholesterol,
      lp_ldl:this._data.d.lp_ldl,
      tempInCelsius: this._data.d.appt_PA_TempInCelsius,
      bloodPressure: this._data.d.appt_PA_BloodPressure,
      sugar: this._data.d.appt_PA_Sugar,
      pulseRate: this._data.d.appt_PA_PulseRate,
      respiratoryRate: this._data.d.appt_PA_RespiratoryRate,
      ecg: this._data.d.ecg,
      oxygenSaturation: this._data.d.appt_PA_OxygenSaturation,
      hemoglobin:this._data.d.appt_PA_Hemoglobin,
      // underBPMedication:this._data.d.underBPMedication,
      // underSugarMedication:this._data.d.underSugarMedication,
      appt_PatientId_FK:this._data.d.appt_PatientId_FK,

    });
  }
 
  Get_Diseases(){
    this.service.Get_Diseases()
    .subscribe((data)=>{
        this.diseases = data
        this.diseases1 = data
    })
  }
  Get_complaint(){
    this.service.Get_Compliant()
    .subscribe((data)=>{
      this.complaint = data
      this.complaint1 = data
    })
  }
  Get_symptoms(){
    this.service.Get_Symptoms()
    .subscribe((data)=>{
      this.symptoms = data
      this.symptoms1 = data
    })
  }

  Get_Allergy() {
    this.service.Get_allergy()
      .subscribe((data) => {
        this.allergy = data
      })
  }

  Get_hospital(){
    this.service.Get_hospital()
    .subscribe((data) => {
      this.hospitaldd = data
    })
  }

  Get_medication() {
    this.service.Get_Medication()
      .subscribe((data) => {
        this.medication = data
        this.medication1 = data
      })
  }
  
  updateform() {
    //this.fixappointment.controls['select_day'].setValue('2022-06-10');   
    if (!this.fixappointment.value.diseasesDtl || this.fixappointment.value.diseasesDtl.length === 0) {
      this.fixappointment.value.diseasesDtl = [{ diseases_Id: 0, diseases_Name: 'Default Present Illness' }];
    }
    this.service.Put_phcappmt(this.fixappointment.value)
    .subscribe((res)=>{
      this.notif.successmsg("Appointment Updated Successfully")
      this.dialogRef.close();
        window.location.reload();
    })
  }

  Patient(){
    this.patient_name=this._data.d.appt_P_Name;
    this.patient_id=this._data.d.appt_P_Code;
    this.patient_dob=this._data.d.appt_P_DOB;
    this.patient_age=this._data.d.appt_P_Age;
    this.patient_gender=this._data.d.appt_P_Gender;
  }

}
