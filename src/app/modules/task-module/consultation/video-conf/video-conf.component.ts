import { Component, OnInit,Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CounsultationService } from '../../consultation/counsultation.service';
import { EndMeetingComponent } from '../end-meeting/end-meeting.component';
import { MatDialog } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-video-conf',
  templateUrl: './video-conf.component.html',
  styleUrls: ['./video-conf.component.scss']
})
export class VideoConfComponent implements OnInit {
  //showFiller = false;
  //panelOpenState = false;
  @Pipe({ name: 'safe' })
  videoConfForm: FormGroup;
  result: any;
  pdata: any;
  pate_id: any;
  cons_id: any;
  //patient details
  p_name: any
  p_gender: any //gender and age in years and days    
  p_blood_group: any
  p_marital_status: any
  p_email: any
  p_phone: any

  //consulation details
  cons_date_time: any //cons date and time
  cons_type: any

  //vital signs
  oxygen_saturation: any;
  pulse_rate: any
  blood_pressure: any
  temperature: any
  glucose: any
  hemoglobin: any
  ecg_monitor: any
  lp_total_cholesterol: any
  lp_triglycerides: any
  lp_hdl_cholesterol: any
  lp_ldl: any
  height: any
  weight: any
  dis_Desc: any;

  //other info
  complaints_data: any
  symptoms_data: any
  diseases_data: any
  allergys_data: any
  medication_data: any;
  // under_bp_medication :any
  // under_sugar_medication :any

  btnstate: boolean = true;
  firstName: any;

  vcData: any;
  urlSafe: SafeResourceUrl;

  consult_id: any;
  patient_id: any;
  selectedDoctor: string;
  meetingStarted: boolean = false;

  constructor(private notif: Notification, public dialog: MatDialog, private sanitizer: DomSanitizer, private route: ActivatedRoute, private fb: FormBuilder, private activatedRoute: ActivatedRoute, public router: Router, private counsultationService: CounsultationService) { }

  ngOnInit(): void {
    //console.log('vc page');  
    this.GetSpec_doctor()
    this.firstName = localStorage.getItem('firstName');
    this.consult_id = +this.route.snapshot.params['consult_id'];
    this.patient_id = +this.route.snapshot.params['patient_id'];

    console.log('consult id :' + this.consult_id + "_" + ' patient id :' + this.patient_id)
  
    this.Consultation_Patient_Detail(this.patient_id, this.consult_id);

    /*
      this.videoConfForm = this.fb.group({ 
        patient_ddl:['', Validators.required]      
      });
      this.getConsultation_Patient_DD();
      this.firstName=localStorage.getItem('firstName');
  	
    */

  }

  calculateBMI(): string {
    if (this.height && this.weight) {
      const heightInMeters = this.height / 100;
      const bmi = this.weight / (heightInMeters * heightInMeters);
      return bmi.toFixed(2) + ' kg/m²';
    }
    return 'N/A';
  }

  //not required
  getConsultation_Patient_DD() {
    this.counsultationService.GetConsultation_Patient_DD()
      .subscribe((data) => {
        this.pdata = data;
          
      });
     
  }

  specdoc: any;
  GetSpec_doctor() {
    this.counsultationService.GetSpec_doctor()
      .subscribe((data) => {
        this.specdoc = data;

      });

  }

   
  Consultation_Patient_Detail(pate_id: any, cons_id: any) {
    //this.btnstate = false;     
    this.counsultationService.GetConsultation_Patient_Detail(pate_id, cons_id)
      .subscribe((data) => {
        this.result = data;
        console.log('we are using patient data :' + JSON.stringify(this.result))
        //patient details
        this.p_name = this.result[0].p_name;
        this.p_gender = this.result[0].p_gender; //gender and age in years and days    
        //this.p_blood_group = this.result[0].p_blood_group;
        //this.p_marital_status = this.result[0].p_marital_status;
        this.p_email = this.result[0].p_email;
        this.p_phone = this.result[0].p_phone;
          
        //consulation details
        this.cons_date_time = this.result[0].cons_date_time; //cons date and time
        this.cons_type = this.result[0].cons_type;

        //vital signs
        this.oxygen_saturation = this.result[0].cON_OxygenSaturation;
        this.pulse_rate = this.result[0].pulse_rate;
        this.blood_pressure = this.result[0].blood_pressure;
        this.temperature = this.result[0].temperature;
        this.glucose = this.result[0].glucose;
        this.hemoglobin = this.result[0].hemoglobin;
        this.ecg_monitor = this.result[0].ecg_monitor;
        this.lp_total_cholesterol = this.result[0].lp_total_cholesterol,
          this.lp_triglycerides = this.result[0].lp_triglycerides,
          this.lp_hdl_cholesterol = this.result[0].lp_hdl_cholesterol,
          this.lp_ldl = this.result[0].lp_ldl,
          this.height = this.result[0].height;
        this.weight = this.result[0].weight;

        //other info
        this.complaints_data = this.result[0].complaintslist;
        this.symptoms_data = this.result[0].symptomslist;
        this.dis_Desc = this.result[0].dis_Desc;
        this.allergys_data = this.result[0].allergylist;
        this.medication_data = this.result[0].medicationlist;
        // this.under_bp_medication = this.result[0].under_bp_medication;
        // this.under_sugar_medication = this.result[0].under_sugar_medication;

      });
        
    
  }
  meetingId: any;
  startMeeting() {
    // alert('start meeting')
    console.log('fname :' + this.firstName)
         
    var passdata = {
      hostName: this.firstName,
      coN_Id: this.consult_id
    }

    this.counsultationService.startMeeting(passdata)
      .subscribe((data) => {
        this.vcData = data;
        this.meetingId = this.vcData.meetingId;
        this.meetingStarted = true;
        console.log('meeting id :' + this.meetingId)
        console.log("meeting url: " + JSON.stringify(this.vcData.startMeetingUrl));
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.vcData.startMeetingUrl);
      });
  }
  data: any;
  endMeeting() {

    if (this.meetingId == null || this.meetingId == '') {
      //alert('direct redirct to consulation Page')
      this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/patienthistory/' + this.patient_id])
    }
    else {
      //alert('pop up with end the meeting API call')
      
      const dialogRef = this.dialog.open(EndMeetingComponent,
        {
          width: "100%",
          maxWidth: "400px",
          height: "auto",
          hasBackdrop: true,
          maxHeight: "700px",
          data: this.meetingId,
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if (result == true) {
          this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/patienthistory/' + this.patient_id])
        }
        // else{             
        //   this.router.navigate(['/base/task/appointment']);
        //   window.location.reload();
        // }
      });
    }
  }

  data1: any;
  send() {
    const selectedDoctorData = this.specdoc.find((doctor) => doctor.spec_doctor === this.selectedDoctor);
    var specDetails = {
        mobile_no: selectedDoctorData.mobile_no,
        meeting_id: this.vcData.meetingId,
      }
    this.counsultationService.Post_mobile_no(specDetails)
      .subscribe((response) => {
        this.data1 = response
        this.notif.successmsg(this.data1.msg_desc)
        this.selectedDoctor = '';
        })
    }

  }
