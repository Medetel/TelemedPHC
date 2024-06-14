import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoConfService } from '../video-conf/video-conf.service';

@Component({
  selector: 'app-vc-meeting',
  templateUrl: './vc-meeting.component.html',
  styleUrls: ['./vc-meeting.component.scss']
})
export class VcMeetingComponent implements OnInit {
 
  data:any;
  link:any;
  result: any;
  urlSafe: SafeResourceUrl;
  code: any; 
  firstName:any;

  constructor(private sanitizer:DomSanitizer,private route: ActivatedRoute, public router:Router,private userService: VideoConfService) { }

  ngOnInit(): void {
    this.firstName=localStorage.getItem('firstName');
    var passdata={
        doctorName:this.firstName 
     }
    this.userService.startMeeting(passdata)
    .subscribe((data) => {
    this.result=data; 
    //console.log('meeting url :' +this.result.startMeetingUrl)                
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.result.startMeetingUrl);      
  });
  }

}
