import { Component, Inject, OnInit } from '@angular/core';
import { CounsultationService } from '../counsultation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Notification } from '../../../../core/Notifications/Notification';
@Component({
  selector: 'app-end-meeting',
  templateUrl: './end-meeting.component.html',
  styleUrls: ['./end-meeting.component.scss']
})
export class EndMeetingComponent implements OnInit {
consult_id:any;
patient_id:any;
  constructor(private notify: Notification, private dialogRef: MatDialogRef<EndMeetingComponent>,@Inject(MAT_DIALOG_DATA) private data: any,private router: Router,private route:ActivatedRoute, private service: CounsultationService) { }

  ngOnInit(): void {

  //this.consult_id = +this.route.snapshot.params['consult_id'];
  //this.patient_id = +this.route.snapshot.params['patient_id'];

  //console.log('consult id :'+this.consult_id +"_" + ' patient id :' +this.patient_id)
  
  }

  delete(){    

    console.log(this.data);
    this.service.Endvc_meeting(this.data)
      .subscribe((res) => {
        this.dialogRef.close();
        this.notify.successmsg("Meeting ended successfully")
        // this.router.navigate(['/base/task/consultation/vcconsult/'+ this.consult_id + '/' + this.patient_id]); 
        //this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/patienthistory/' + this.patient_id]);   
      },
      (error:any)=>
      {
        console.log("error :" +JSON.stringify(error));
      }
      ) ; 
     
      //this.router.navigate(['/base/task/consultation/consult/' + this.consult_id + '/patienthistory/' + this.patient_id]); 
  }
}
