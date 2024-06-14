import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { ManualAppointmentService } from '../manual-appointment.service';
import { MatDialog } from '@angular/material/dialog';
import { PreviousRecordsdialogComponent } from '../../previous-recordsdialog/previous-recordsdialog.component';

@Component({
  selector: 'app-appointmentadd',
  templateUrl: './appointmentadd.component.html',
  styleUrls: ['./appointmentadd.component.scss']
})
export class AppointmentaddComponent implements OnInit {

  doctordd:any;
  pat:any;
  pat_id?:any;
  appid:number;
  Image_Url ;
  complaint:any;
  symptoms:any;
  Diseases:any;
  today = new Date();
  allergy: any;
  minDate:any= new Date();
    constructor(private service:ManualAppointmentService,public dialog: MatDialog, private notif:Notification,private router: Router) { }
    patient = new FormGroup({
      pR_Id:new FormControl('',[this.nameValidator])
    })
    fixappointment=new FormGroup({
      appt_PatientId_FK:new FormControl(''),
      appt_DateTime:new FormControl(this.today),
      select_toTime:new FormControl(''),
      appt_DO_Id_FK:new FormControl(''),
      select_FrmTime:new FormControl(''),
      select_day:new FormControl(''),
      complaint:new FormControl(''),
      diseasesDtl:new FormControl(''),
      symptoms:new FormControl(''),
      allergySigns_DTL:new FormControl(''),
      height:new FormControl('',[Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      weight:new FormControl('',[Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      hemoglobin:new FormControl('',[Validators.pattern("^\\S{0}.{0,10}\\S{1}$"), this.nameValidators]),
      underSugarMedication:new FormControl(''),
      underBPMedication:new FormControl(''),
      tempInFahrenheit:new FormControl(''),
      tempInCelsius:new FormControl('',[Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      bpmm:new FormControl('',[Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      bphg:new FormControl('',[Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]), 
      bloodPressure:new FormControl('',[Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      sugar:new FormControl('',[Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      pulseRate:new FormControl('',[Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      respiratoryRate:new FormControl('',[Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators]),
      ecg:new FormControl(''),
      oxygenSaturation:new FormControl('',[Validators.pattern("^\\S{0}.{0,7}\\S{1}$"), this.nameValidators])

    })
    test(data){
     
    }
    nameValidators(control: any): { [key: string]: boolean } {
      const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?/\s/g,''/a-zA-Z]/;
    
      if (control.value && nameRegexp.test(control.value)) {
        return { invalidName: true };
      }
    } 
    
    nameValidator(control: any): { [key: string]: boolean } {
      const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\s/g,''/a-zA-Z]/;    
    
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
  onToppingRemoveda(topping: string) {
    const toppings = this.fixappointment.value.allergySigns_DTL;
    this.removeFirst(toppings, topping);
    this.fixappointment.controls['allergySigns_DTL'].setValue(toppings); // To trigger change detection
  }

  openDialog() {
    if(this.patient.value==undefined)
    {
      //alert("Please enter the patient details")
    }
    const dialogRef = this.dialog.open(PreviousRecordsdialogComponent);
    dialogRef.afterClosed().subscribe(result => {    
      if(result==true)
      {
        this.router.navigate(['/base/task/manualappointment/previous-record/'+ this.patient.value.pR_Id]);
      }
      else{
        this.router.navigate(['/base/task/manualappointment']);
      }
    });
  }
    ngOnInit(): void {
      this.Get_Doctor();
      this.Get_complaint();
      this.Get_symptoms();
      this.Get_Diseases();
      this.Get_Allergy();
    }
  Get_Doctor(){
    this.service.Get_Doctor()
    .subscribe((data)=>{
      this.doctordd=data
    })
  }
  Get_Diseases(){
    this.service.Get_Diseases()
    .subscribe((data)=>{
        this.Diseases = data
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
  Get_Allergy(){
    this.service.Get_Allergy()
    .subscribe((data)=>{
      this.allergy = data
    })
  }
  patientget(){
    this.service.Get_patient_by_id(this.patient.value.pR_Id)
    .subscribe((data)=>{
      this.pat=data
      if(this.pat.length>0)
      {
        this.appid=data[0].pR_Id
        this.Image_Url = 'data:image/jpeg;base64,' + this.pat[0].pR_Photobyte;        
        this.fixappointment.controls['appt_PatientId_FK'].setValue(this.appid)
      }
      else{
        this.notif.errorsmsg("Patient details not found")
      }  
    })
  }
  updateform(){     
    this.fixappointment.value.bloodPressure=this.fixappointment.value.bpmm+'/'+this.fixappointment.value.bphg;
    
    this.service.Post_Appointment(this.fixappointment.value)
    .subscribe(
      res=>this.notif.successmsg("Record saved successfully"),
      err => this.notif.errorsmsg("Error while saving/please select patient"),
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
        
      })
  }
}
