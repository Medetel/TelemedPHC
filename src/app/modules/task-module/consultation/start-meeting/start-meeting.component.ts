import { Component, OnInit,Inject } from '@angular/core';
import { NgForm,FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from "@angular/router";
import { CounsultationService } from '../counsultation.service';


@Component({
  selector: 'app-start-meeting',
  templateUrl: './start-meeting.component.html',
  styleUrls: ['./start-meeting.component.scss']
})
export class StartMeetingComponent implements OnInit {
  startMeetingForm: FormGroup;
  result:any;
  constructor(private fb: FormBuilder,private activatedRoute: ActivatedRoute, public router:Router,private userService: CounsultationService) { }

  ngOnInit(): void {
    this.startMeetingForm = this.fb.group({ 
      meetingID:['', Validators.required],
      joineeName: ['', Validators.required]     
    });
  }

  onStartMeeting() {  
    this.router.navigate(['/sidenav/doctormeeting'], { queryParams: { meetingID: this.startMeetingForm.value.meetingID,joineeName:this.startMeetingForm.value.joineeName } });
    
    /*
    this.userService.startMeeting(this.startMeetingForm.value)
    .subscribe((data) => {
      this.result=data;      
      //console.log("doctor join url: " +JSON.stringify(this.result.meetingJoinUrl));
      this.goToLink(this.result.meetingJoinUrl)        
    });
    */
    
    
  }

  goToLink(url: string){
    window.open(url, "_blank");
}

}
