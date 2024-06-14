import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { data } from 'jquery';
import { environment } from 'src/environments/environment';
import { ManualAppointmentService } from '../../manual-appointment/manual-appointment.service';
import { CounsultationService } from '../counsultation.service';
import { MatDialog } from '@angular/material/dialog';
import { ClosureComponent } from './closure/closure.component';
import { CloseComponent } from './close/close.component';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent implements OnInit {
  Image_Url;
 // buttonDisabled: boolean=true;
  consult_id: number;
  patient_name: any;
  patient_gender: any;
  patient_age: any;
  patient_lname: any;
  patient_code: any;
  patient_dob: any;
  patient_photo: any;
  patient_mobile: any;
  consult_date: any;
  consult_time: any;
  app_id: any;
  app_details: any;
  app_day: any;
  app_f_time: any;
  app_t_time: any;
  patient_id: any;
  con_id:any;
  constructor(private route: ActivatedRoute, private service: CounsultationService, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      id = +params['id'];
      this.consult_id = id;
      this.con_id=id;     
    });
    this.get_consult(this.consult_id);
    // this.Get_appoinment(this.consult_id);
  }
  patient() {
    this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/patienthistory/' + this.patient_id]);
  }
  pastrecord() {
    this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/pastrecord/' + this.patient_id]);
  }
  compliant() {
    this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/compliants/' + this.consult_id]);
  }
  symptoms() {
    this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/symptoms/' + this.consult_id]);
  }
  parameters() {
    this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/parameter/' + this.consult_id]);
  }
  diagnois() {
    this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/diagnois/' + this.consult_id]);
  }
  prescriptions() {
    this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/prescription/' + this.consult_id]);
  }
  labtest() {
    this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/labtest/' + this.consult_id]);
  }
  imagingtest() {
    this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/imagingtest/' + this.consult_id]);
  }
  dietplan() {
    this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/dietplan/' + this.consult_id]);
  }
  referral() {
    this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/referral/' + this.consult_id]);
  }
  presentillness() {
    this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/presentillness/' + this.consult_id]);
  }
  clinical_observation() {
    this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/clinicalobsevation/' + this.consult_id]);
  }
  re_visite() {
    this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/revisite/' + this.consult_id]);

  }


   clickVC() {    
     this.router.navigate(['/base/task/consultation/vcconsult/'+ this.consult_id + '/' + this.patient_id]);    
   }

  get_consult(consult_id) {
    this.service.Get_Consultation_id(consult_id)
      .subscribe((data: any) => { 
          
        console.log('emr data :' +JSON.stringify(data)) 

        this.patient_dob = data.coN_PR_DOB
        this.patient_id=data.coN_PR_Id_FK
        this.consult_date = data.coN_ConsultedDate
        this.consult_time = data.coN_ConsultedTime
        this.patient_name = data.coN_PR_Name
        //  this.patient_lname=data[0].pR_LastName
        this.patient_gender = data.coN_PR_Gender
        this.patient_code = data.pR_Code
        this.patient_age = data.coN_PR_Age
        this.patient_mobile = data.pR_MobileNumber
        this.patient_photo = data.imagebyte
        this.app_day = data.appt_Date
        this.app_f_time = data.appt_FrmTime
        this.app_t_time = data.appt_ToTime
        this.Image_Url = 'data:image/jpeg;base64,' + data.imagebyte;
        //  this.Image_Url= { url: `${environment.API_Base_URL}` +`Patient/GetPatient_Images?filename=${this.patient_photo}`}

      }, (error) => {
       
      })
  }
  data:any;
  closure() {   
    const dialogRef = this.dialog.open(ClosureComponent,
      {
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        hasBackdrop: true,
        maxHeight: "700px",
        data: this.con_id
      });
    dialogRef.afterClosed().subscribe(result => {
      
     
    });
  }

  close() {   
    const dialogRef = this.dialog.open(CloseComponent,
      {
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        hasBackdrop: true,
        maxHeight: "700px",
        data: this.con_id
      });
    dialogRef.afterClosed().subscribe(result => {
      
     
    });
  }
 
}
