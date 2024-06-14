import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from '../../../../../environments/environment.prod';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserProfile } from '../UserDetails/user.profile';
import { IProfile } from '../UserDetails/user.model';
import { Notification } from '../../../../core/Notifications/Notification';
import { GlobalStorage } from '../../../../core/Gloabl/Global';
import { ProfileService } from 'src/app/modules/profile-module/profile.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform:FormGroup;
  user: any;
  clientId='Global_spa';
  phide = true;
  username: any;
  userName: any;

  constructor(private fb: FormBuilder,
    private router: Router, private Http: HttpClient, private notify: Notification
    , private global: GlobalStorage,private authProfile: UserProfile, private service:ProfileService, private dialog: MatDialog ,
  ) {
    this.loginform=this.fb.group({
      'username':['',[Validators.required,Validators.pattern("[0-9]{10}$")]],
      'password':['',[Validators.required,Validators.minLength(6)]],
    })
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.loginform.controls[controlName].hasError(errorName);
  }
  ngOnInit(): void {
  }  

  openDialog(message: string): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px', // Adjust width as needed
      data: { message: message } // Pass the message to the dialog component
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Any additional actions after the dialog is closed can go here
    });
  }


 
  onSubmit() {
            const header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
            const params = new HttpParams()
              .append('username', this.loginform.value.username)
              .append('password', this.loginform.value.password)
              .append('client_id', this.clientId)
              .append('grant_type', 'phone_number_token')
              .append('client_secret', 'secret')
              .append('role','Admin')
    this.Http.post(`${environment.Login_URL}` + `connect/token`, params, { headers: header }).subscribe((res: any) => {
      const loginData = { username: this.loginform.value.username };
      this.service.Post_login(loginData)
        .subscribe(
          (response) => {
            this.user = response;
            if (this.user.msg_desc == "You are able to log in.") {
              var userProfile: IProfile = res;
              localStorage.setItem('roleName', res.roleName);
              this.authProfile.setProfile(userProfile);
              this.notify.successmsg(res.firstName + " logged Successfully.");
              this.router.navigate(["/base/dashboard"]);
            }
            else {
              this.router.navigate(['/auth/login']);
              // this.notify.errorsmsg(this.user.msg_desc);
              this.openDialog(this.user.msg_desc);
            }
            },
            )
          
         
        },
      );
    // const header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    // const params = new HttpParams()
    //   .append('username', this.loginform.value.username)
    //   .append('password', this.loginform.value.password)
    //   .append('client_id', this.clientId)
    //   .append('grant_type', 'phone_number_token')
    //   .append('client_secret', 'secret')
    //   .append('role','Admin')    
    // this.Http.post(`${environment.Login_URL}` + `connect/token`, params, { headers: header }).subscribe((res: any) => {
    //   var userProfile: IProfile = res;
    //   localStorage.setItem('roleName', res.roleName); 
    //   this.authProfile.setProfile(userProfile);
    //   this.notify.successmsg(res.firstName + " logged Successfully.");
    //   this.router.navigate(["/base/dashboard"]);      
    // }, 
    // )
    
  }
}