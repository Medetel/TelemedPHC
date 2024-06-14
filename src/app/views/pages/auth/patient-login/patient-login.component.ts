import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalStorage } from 'src/app/core/Gloabl/Global';
import { Notification } from 'src/app/core/Notifications/Notification';
import { environment } from 'src/environments/environment.prod';
import { IProfile } from '../UserDetails/user.model';
import { UserProfile } from '../UserDetails/user.profile';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.scss']
})
export class PatientLoginComponent implements OnInit {
  loginform:FormGroup;
  clientId='Global_spa';
  constructor(private fb: FormBuilder,
    private router: Router, private Http: HttpClient, private notify: Notification
    , private global: GlobalStorage,private authProfile: UserProfile
  ) {
    this.loginform=this.fb.group({
      'username':['',[Validators.required]],
      'password':['',[Validators.required,Validators.minLength(6)]],
    })
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.loginform.controls[controlName].hasError(errorName);
  }
  ngOnInit(): void {
    
  }
  onSubmit() {
    const header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const params = new HttpParams()
        .append('username', this.loginform.value.username)
        .append('password', this.loginform.value.password)
        .append('client_id', this.clientId)
        .append('grant_type', 'password')
        //.append('scope', 'Global_api');
        this.Http.post(`${environment.Login_URL}`+`connect/token`,params, { headers: header }).subscribe((res:any)=>{
          localStorage.setItem('access_token',res.access_token)
          localStorage.setItem('expires_in',res.expires_in)
          this.notify.successmsg("Guest" + " logged Successfully.");
          var userProfile: IProfile = res;
          this.authProfile.setProfile(userProfile);
          this.router.navigate(["/base/dashboard"]);          
        },(error)=>{
          this.notify.errorsmsg(error)
        })
  }
}
