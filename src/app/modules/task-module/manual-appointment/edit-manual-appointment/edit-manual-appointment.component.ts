import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { ManualAppointmentService } from '../manual-appointment.service';

@Component({
  selector: 'app-edit-manual-appointment',
  templateUrl: './edit-manual-appointment.component.html',
  styleUrls: ['./edit-manual-appointment.component.scss']
})
export class EditManualAppointmentComponent implements OnInit {
  doctordd:any;
  pat:any;
  pat_id?:any;
  appid:number;
  Image_Url ;
  complaint:any;
  symptoms:any;
  diseases: any;
  selected: any;
  today =new Date();
  complaintselected: any;
  symptomsselected: any;
  diseasesselected: any;
  allergy: any;
  allergysignsselected: any;
  patient_name: any;
  patient_id: any;
  patient_dob: any;
  patient_age: any;
  patient_gender: any;

  constructor(private dialogRef: MatDialogRef<EditManualAppointmentComponent>,@Inject(MAT_DIALOG_DATA) private _data: any, private service:ManualAppointmentService,private notif:Notification) { }
    patient = new FormGroup({
      pR_Id:new FormControl('')
    })
    fixappointment=new FormGroup({
      appt_Id:new FormControl(''),
      appt_PatientId_FK:new FormControl(''),
      appt_DateTime:new FormControl(this.today),
      select_toTime:new FormControl(''),
      appt_DO_Id_FK:new FormControl(''),
      select_FrmTime:new FormControl(''),
      select_day:new FormControl(''),
      complaint:new FormControl(''),
      diseasesDtl:new FormControl(''),
      symptoms: new FormControl(''),
      allergySigns_DTL: new FormControl(''),
      height:new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      weight:new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      tempInFahrenheit:new FormControl(''),
      tempInCelsius:new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      bloodPressure:new FormControl(''),
      sugar:new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      pulseRate:new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      respiratoryRate:new FormControl('',[Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      ecg:new FormControl(''),
      oxygenSaturation:new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      hemoglobin:new FormControl('',[Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      underSugarMedication:new FormControl(''),
      underBPMedication:new FormControl(''),
    })
    ngOnInit(): void {   
    this.bind();   
    this.complaintselected = this.fixappointment.value.complaint
    this.symptomsselected = this.fixappointment.value.symptoms
    this.diseasesselected = this.fixappointment.value.diseasesDtl
    this.allergysignsselected = this.fixappointment.value.allergySigns_DTL
    this.Get_Doctor();
    this.Get_complaint();
    this.Get_symptoms();
    this.Get_Diseases();
    this.Get_Allergy();
    this.Patient();
    this.Image_Url = 'data:image/jpeg;base64,' + this._data.d.pR_Photobyte;
  }

  nameValidatorBP(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?/\s/g,''/a-zA-Z]/;
   
    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }

  nameValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?/\s/g,''/a-zA-Z]/;
   
    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }

  nameValidators(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?/\s/g,''/a-zA-Z]/;   
  
    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  } 
  public objectComparisonFunctioncomplaint = function (option, value): boolean {
    return option.cpT_Id === value.cpT_Id;
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
  bind(){
    this.fixappointment.patchValue({
      appt_Id: this._data.d.appt_Id,
      complaint: this._data.d.complaintslist,
      symptoms: this._data.d.symptomslist,
      diseasesDtl: this._data.d.diseaseslist,
      allergySigns_DTL: this._data.d.allergylist,
      appt_DateTime: this._data.d.appt_DateTime,
      select_toTime: this._data.d.select_toTime,
      appt_DO_Id_FK: this._data.d.appt_DO_Id_FK,
      select_FrmTime: this._data.d.select_FrmTime,
      select_day: this._data.d.select_date,
      height: this._data.d.appt_PA_Height,
      weight: this._data.d.appt_PA_Weight,
      tempInCelsius: this._data.d.appt_PA_TempInCelsius,
      bloodPressure: this._data.d.appt_PA_BloodPressure,
      sugar: this._data.d.appt_PA_Sugar,
      pulseRate: this._data.d.appt_PA_PulseRate,
      respiratoryRate: this._data.d.appt_PA_RespiratoryRate,
      ecg: this._data.d.ecg,
      oxygenSaturation: this._data.d.appt_PA_OxygenSaturation,
      hemoglobin:this._data.d.appt_PA_Hemoglobin,
      underBPMedication:this._data.d.underBPMedication,
      underSugarMedication:this._data.d.underSugarMedication,
      appt_PatientId_FK:this._data.d.appt_PatientId_FK,
    });
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
  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  Get_Diseases(){
    this.service.Get_Diseases()
    .subscribe((data)=>{
        this.diseases = data
    })
  }
  Get_complaint(){
    this.service.Get_Compliant()
    .subscribe((data)=>{
      this.complaint = data
    })
  }
  Get_symptoms(){
    this.service.Get_Symptoms()
    .subscribe((data)=>{
      this.symptoms = data
    })
  }
  Get_Allergy() {
    this.service.Get_Allergy()
      .subscribe((data) => {
        this.allergy = data
      })
  }
  Get_Doctor(){
    this.service.Get_Doctor()
    .subscribe((data)=>{
      this.doctordd=data      
    })
  }
  patientget(){
    this.service.Get_patient_by_id(this.patient.value.pR_Id)
    .subscribe((data)=>{
      this.pat=data
      this.appid=data[0].pR_Id
      this.Image_Url = 'data:image/jpeg;base64,' + this.pat[0].pR_Photobyte;   
      this.fixappointment.controls['appt_PatientId_FK'].setValue(this.appid)
    })
  }

  updateform() {    
    this.service.Put_Appoinment(this.fixappointment.value)
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