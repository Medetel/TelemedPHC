import { Component, OnInit,Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CounsultationService } from '../../task-module/consultation/counsultation.service';
//import { VideoConfService } from '../video-conf/video-conf.service';

@Component({
  selector: 'app-joinvc-meeting',
  templateUrl: './joinvc-meeting.component.html',
  styleUrls: ['./joinvc-meeting.component.scss']
})
export class JoinvcMeetingComponent implements OnInit {
  @Pipe({ name: 'safe' })
  joinVCForm: FormGroup;
  result:any; 
  pdata:any; 
  pate_id:any;
  cons_id:any;
  joinData:any; 

   //patient details
   d_name :any
   d_gender :any //gender and age in years and days    
   d_blood_group :any
   d_marital_status :any
   d_email :any
   d_phone :any
 
 //consulation details
   cons_date_time :any //cons date and time
   cons_type :any  
 
 //vital signs
   pulse_rate :any
   blood_pressure :any
   temperature :any
   glucose :any
   hemoglobin :any
   ecg_monitor :any
   height :any
   weight: any
   dis_Desc: any;
   lp_total_cholesterol:any
   lp_triglycerides:any
   lp_hdl_cholesterol:any
   lp_ldl:any
 
   //other info
   complaints_data:any
   symptoms_data:any
   diseases_data:any
  allergys_data: any
  medications_data: any;
   under_bp_medication :any
   under_sugar_medication :any
 
   btnstate: boolean=true;
   firstName:any;
 
   vcData:any; 
   urlSafe: SafeResourceUrl;
   consult_id;
   patient_id;
  oxygen_saturation: any;

  constructor(private sanitizer:DomSanitizer,private route: ActivatedRoute,private fb: FormBuilder,private activatedRoute: ActivatedRoute, public router:Router,private userService: CounsultationService) {


   }

  ngOnInit(): void {
    this.firstName=localStorage.getItem('firstName');
    this.joinVCForm = this.fb.group({
      meeting_id:['', Validators.required], 
      patient_ddl:['', Validators.required]      
    });
    this.getConsultation_Patient_DD();
    
  }

  getConsultation_Patient_DD() {   
    this.userService.GetConsultation_Patient_DD_Common()
    .subscribe((data) => {
      this.pdata=data;          
         
    });     
    
  } 

  calculateBMI(): string {
    if (this.height && this.weight) {
      // Convert height from cm to meters (1 cm = 0.01 m)
      const heightInMeters = this.height / 100;

      // Calculate BMI
      const bmi = this.weight / (heightInMeters * heightInMeters);

      // Format BMI to display in metric square
      return bmi.toFixed(2) + ' kg/m²';
    }
    // Return an empty string or an appropriate message if height or weight is missing.
    return 'N/A';
  }
  
  onChangePatientName(data:any)
   {
      //alert(data.value);
      this.btnstate = false;
      var res = data.value.split('_');
      this.pate_id=res[0]; // patient id
      this.cons_id=res[1]; //consl id
        this.userService.GetConsultation_Doctor_Detail(this.pate_id, this.cons_id)
        .subscribe((data) => {
          this.result=data;          
          console.log('we are using patient data :' +JSON.stringify(this.result))
          //patient details
          this.d_name = this.result[0].d_name;
          this.d_gender = this.result[0].d_gender; //gender and age in years and days    
          //this.p_blood_group = this.result[0].p_blood_group;
          //this.p_marital_status = this.result[0].p_marital_status;
          this.d_email = this.result[0].d_email;
          this.d_phone = this.result[0].d_phone;
          
          //consulation details
          this.cons_date_time = this.result[0].cons_date_time; //cons date and time
          this.cons_type = this.result[0].cons_type;         

          //vital signs
          this.oxygen_saturation=this.result[0].cON_OxygenSaturation;
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
          this.complaints_data=this.result[0].complaintslist;
          this.symptoms_data=this.result[0].symptomslist;
          this.dis_Desc = this.result[0].dis_Desc;
          this.allergys_data = this.result[0].allergylist;
          this.medications_data = this.result[0].medicationlist;
          //this.under_bp_medication = this.result[0].under_bp_medication;
          //this.under_sugar_medication = this.result[0].under_sugar_medication;

        });         
    
   }

   joinMeeting()
   {     
     
    var passdata={
      meetingId:this.joinVCForm.value.meeting_id,
      joineeName:this.firstName
  }
  
    this.userService.joinMeeting(passdata)
    .subscribe((data) => {
    this.joinData=data;
    console.log("join url: " +JSON.stringify(this.joinData.joinMeetingUrl));
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.joinData.joinMeetingUrl);    

    });

  }

}
