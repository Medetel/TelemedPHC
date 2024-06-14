import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { invalid } from 'moment';
import { Notification } from 'src/app/core/Notifications/Notification';
import { PHCManualAppointService } from '../../phc-manual-appoint.service';

@Component({
  selector: 'app-add-phc-manual-appointment',
  templateUrl: './add-phc-manual-appointment.component.html',
  styleUrls: ['./add-phc-manual-appointment.component.scss']
})
export class AddPhcManualAppointmentComponent implements OnInit {
  public errorApi = false;
  doctordd: any;
  pat: any;
  pat_id?: any;
  appid: number;
  Image_Url;
  complaint: any;
  symptoms: any;
  Diseases: any;
  today = new Date();
  hospitaldd: any;
  Allergy: any;
  mindate:any=new Date();
  constructor(private service: PHCManualAppointService, private notif: Notification) { }
  patient = new FormGroup({
    pR_Id: new FormControl('', [this.nameValidator])
  })
  fixappointment = new FormGroup({
    appt_PatientId_FK: new FormControl(''),
    appt_DateTime: new FormControl(this.today),
    select_toTime: new FormControl(''),
    hos_Id: new FormControl(''),
    select_FrmTime: new FormControl(''),
    select_day: new FormControl(''),
    complaint: new FormControl(''),
    allergySigns_DTL: new FormControl(''),
    underBPMedication: new FormControl(''),
    underSugarMedication: new FormControl(''),
    diseasesDtl: new FormControl(''),
    symptoms: new FormControl(''),
    height: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    weight: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    hemoglobin:new FormControl('',[Validators.pattern("^\\S{0}.{0,10}\\S{1}$"), this.nameValidators]),
    tempInFahrenheit: new FormControl(''),
    tempInCelsius: new FormControl('',[Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    bloodPressure: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    sugar: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    pulseRate: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    respiratoryRate: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    ecg: new FormControl(''),
    oxygenSaturation: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    bpmm: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
    bphg: new FormControl('', [Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),

  })
  test(data) {
    
  }
  nameValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\s/g,''/a-zA-Z]/;
    
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


  onToppingRemoved(topping: string) {
    const toppings = this.fixappointment.value.complaint;
    this.removeFirst(toppings, topping);
    this.fixappointment.controls['complaint'].setValue(toppings); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  onToppingRemoveds(topping: string) {
    const toppings = this.fixappointment.value.symptoms;
    this.removeFirst(toppings, topping);
    this.fixappointment.controls['symptoms'].setValue(toppings); // To trigger change detection
  }
  onToppingRemovedd(topping: string) {
    const toppings = this.fixappointment.value.diseasesDtl;
    this.removeFirst(toppings, topping);
    this.fixappointment.controls['diseasesDtl'].setValue(toppings); // To trigger change detection
  }
  ngOnInit(): void {
    // this.Get_Doctor();
    this.Get_complaint();
    this.Get_symptoms();
    this.Get_Diseases();
    this.Get_hospital();
    this.Get_allergy();
  }
  // Get_Doctor() {
  //   this.service.Get_Doctor()
  //     .subscribe((data) => {
  //       this.doctordd = data
  //     })
  // }
  Get_Diseases() {
    this.service.Get_Diseases()
      .subscribe((data) => {
        this.Diseases = data
      })
  }
  Get_complaint() {
    this.service.Get_Compliant()
      .subscribe((data) => {
        this.complaint = data
      })
  }
  Get_symptoms() {
    this.service.Get_Symptoms()
      .subscribe((data) => {
        this.symptoms = data
      })
  }
  patientget() {
    this.service.Get_patient_by_id(this.patient.value.pR_Id)
      .subscribe(
        (data) => {
        this.pat = data
        if(this.pat.length>0)
        {
          this.appid = data[0].pR_Id
          this.Image_Url = 'data:image/jpeg;base64,' + this.pat[0].pR_Photobyte;
          this.fixappointment.controls['appt_PatientId_FK'].setValue(this.appid)         
        }
        else{
          this.notif.errorsmsg("Patient details not found")
        }
      })
           
      } 
    
  updateform() {
    this.fixappointment.value.bloodPressure = this.fixappointment.value.bpmm + '/' + this.fixappointment.value.bphg;
   
    this.service.Post_Appointment(this.fixappointment.value)
      .subscribe( 
        res =>this.notif.successmsg("Record saved successfully"),
        err =>this.notif.errorsmsg("Error while saving/ select patient")

      )
      
      this.fixappointment.reset();
      this.patient.reset();
      this.clearPatientInfo();
      
  }

  clearPatientInfo() {
    var pid =0;
    this.service.Get_patient_by_id(pid)
      .subscribe((data) => {
        this.pat = data
        this.appid = data[0].pR_Id
        this.Image_Url = 'data:image/jpeg;base64,' + this.pat[0].pR_Photobyte;
        this.fixappointment.controls['appt_PatientId_FK'].setValue(this.appid)
        //this.fixappointment.value.appt_PatientId_FK=this.appid
      })
  }
  Get_hospital() {
    this.service.Get_hospital()
      .subscribe((data) => {
        this.hospitaldd = data
      })
  }
  Get_allergy() {
    this.service.Get_allergy()
      .subscribe((data) => {
        this.Allergy = data
      })
  }
}