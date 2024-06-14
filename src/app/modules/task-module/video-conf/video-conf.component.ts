import { Component, OnInit,Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CounsultationService } from '../../task-module/consultation/counsultation.service';


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
  result:any; 
  pdata:any; 
  pate_id:any;
  cons_id:any;
   //patient details
  p_name :any
  p_gender :any //gender and age in years and days    
  p_blood_group :any
  p_marital_status :any
  p_email :any
  p_phone :any

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

  //other info
  complaints_data:any
  symptoms_data:any
  diseases_data:any
  allergys_data: any
  medication_data: any;
  oxygen_saturation: any;
  // under_bp_medication :any
  // under_sugar_medication :any

  btnstate: boolean=true;
  firstName:any;

  vcData:any; 
  urlSafe: SafeResourceUrl;
  consult_id;
  patient_id;

  constructor(private sanitizer:DomSanitizer,private route: ActivatedRoute,private fb: FormBuilder,private activatedRoute: ActivatedRoute, public router:Router,private userService: CounsultationService) { }

  ngOnInit(): void {

    //let consult_id = +this.route.snapshot.params['consult_id'];
    //let patient_id = +this.route.snapshot.params['patient_id'];

    console.log('vc page');
    
    this.route.paramMap.subscribe((params) => {
      this.consult_id = params.get('consult_id')!;
      this.patient_id = params.get('patient_id')!;
    });
    console.log('consult id :'+this.consult_id +"_" + 'patient id :' +this.patient_id)
    

    /*
    this.route.params.subscribe((params: Params) => {
      id = +params['id'];
      this.consult_id = id;
      this.con_id=id;     
    });
    */

    /*
    this.videoConfForm = this.fb.group({ 
      patient_ddl:['', Validators.required]      
    });
    this.getConsultation_Patient_DD();
    this.firstName=localStorage.getItem('firstName');
    */

  }

  getConsultation_Patient_DD() {   
     this.userService.GetConsultation_Patient_DD()
     .subscribe((data) => {
       this.pdata=data;            
          
     });     
     
   } 

   onChangePatientName(data:any)
   {      
      this.btnstate = false;
      var res = data.value.split('_');
      this.pate_id=res[0]; // patient id
      this.cons_id=res[1]; //consl id
        this.userService.GetConsultation_Patient_Detail(this.pate_id, this.cons_id)
        .subscribe((data) => {
          this.result=data;          
          
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
          this.pulse_rate = this.result[0].pulse_rate;
          this.blood_pressure = this.result[0].blood_pressure;
          this.temperature = this.result[0].temperature;
          this.glucose = this.result[0].glucose;
          this.hemoglobin = this.result[0].hemoglobin;
          this.ecg_monitor = this.result[0].ecg_monitor;
          this.height = this.result[0].height;
          this.weight = this.result[0].weight;
          this.oxygen_saturation = this.result[0].cON_OxygenSaturation;


          //other info
          this.complaints_data=this.result[0].complaintslist;
          this.symptoms_data=this.result[0].symptomslist;
          this.dis_Desc = this.result[0].dis_Desc;
          this.allergys_data = this.result[0].allergylist;
          this.medication_data = this.result[0].medicationlist;
          // this.under_bp_medication = this.result[0].under_bp_medication;
          // this.under_sugar_medication = this.result[0].under_sugar_medication;

        }); 
        
    
   }

   startMeeting() { 
   
   console.log('fname :' +this.firstName)
         
      var passdata={
         doctorName:this.firstName 
      }

      this.userService.startMeeting(passdata)
      .subscribe((data) => {
      this.vcData=data;
      console.log("meeting url: " +JSON.stringify(this.vcData.startMeetingUrl));                 
      this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.vcData.startMeetingUrl);
      });    
   } 

}
