import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';



@Component({
  selector: 'app-exitvc',
  templateUrl: './exitvc.component.html',
  styleUrls: ['./exitvc.component.scss']
})
export class ExitvcComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ExitvcComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private router: Router, private notif: Notification, private http: HttpClient) { }

  ngOnInit(): void {
    
  }
  exit(meetingID: string, meetingURL: string) {
    const url = 'https://medetel.in/bigbluebutton/api/end';
    const requestBody = {
      meetingID: meetingID,
      moderatorPassword: 'moderator'
    };

    this.http.post(url, requestBody)
      .subscribe(
        () => {
          console.log('Meeting ended successfully.');
          // Do any additional actions after ending the meeting
        },
        (error) => {
          console.error('Failed to end the meeting:', error);
        }
      );
  }
  
}
