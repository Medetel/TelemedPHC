import { Component, OnInit,Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CounsultationService } from '../../task-module/consultation/counsultation.service';


@Component({
  selector: 'app-direct-startmeeting',
  templateUrl: './direct-startmeeting.component.html',
  styleUrls: ['./direct-startmeeting.component.scss']
})
export class DirectStartmeetingComponent implements OnInit {
  @Pipe({ name: 'safe' })
  directStartMeetingForm: FormGroup;
  result:any; 
  ddata:any; 
  pate_id:any;
  cons_id:any;
   //patient details
  p_patientcode:any;
  p_name :any
  p_gender :any //gender and age in years and days    
  p_blood_group :any
  p_marital_status :any
  p_email :any
  p_phone :any

  btnstate: boolean=true;
  firstName:any;

  vcData:any; 
  urlSafe: SafeResourceUrl;

  consult_id:any;
  pr_code:any;
  doc_id_value:any;

  constructor(private sanitizer:DomSanitizer,private route: ActivatedRoute,private fb: FormBuilder,private activatedRoute: ActivatedRoute, public router:Router,private counsultationService: CounsultationService) { 

    this.directStartMeetingForm = this.fb.group({
      'doctor_ddl': [''],    
    });
  }

  ngOnInit(): void {
    this.firstName=localStorage.getItem('firstName'); 
    this.pr_code = this.route.snapshot.params['pR_Id'];
    //console.log("pr code :" +this.pr_code);
    this.GetRegd_Patient_Detail(this.pr_code);
    this.GetRegd_Doctor_Detail_DD();
  }

    GetRegd_Patient_Detail(pr_code)
     {      
        //this.btnstate = false;     
          this.counsultationService.GetRegd_PatientDetail(pr_code)
          .subscribe((data) => {
            this.result=data;    
            //patient details
            this.p_name = this.result[0].p_name;
            this.p_gender = this.result[0].p_gender; //gender and age in years and days    
            this.p_blood_group = this.result[0].p_blood_group;
            this.p_marital_status = this.result[0].p_marital_status;
            this.p_email = this.result[0].p_email;
            this.p_phone = this.result[0].p_phone;            
  
          });           
      
     }


     GetRegd_Doctor_Detail_DD()
     {    
        
          this.counsultationService.GetRegd_DoctorDetail_DD()
          .subscribe((data) => {
            this.ddata=data;  
           
          });           
      
     }

  onChangeDoctorName(data:any)
   {
      //alert(data.value);
      this.btnstate = false;      
    
   }
     directStartMeeting() { 
      //alert (this.directStartMeetingForm.value.doctor_ddl);
      this.doc_id_value=this.directStartMeetingForm.value.doctor_ddl;     
     
      console.log('fname :' +this.firstName)
            
         var passdata={
          hostName:this.firstName 
         }
   
         this.counsultationService.startMeeting(passdata)
         .subscribe((data) => {
         this.vcData=data;
         console.log("meeting url: " +JSON.stringify(this.vcData.startMeetingUrl));                 
         this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.vcData.startMeetingUrl);
         });    
      } 


}
