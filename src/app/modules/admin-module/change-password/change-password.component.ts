import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Console } from 'console';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { ProfileService } from '../../profile-module/profile.service';
import { UserService } from 'src/app/views/pages/auth/UserDetails/user.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  curphide = true;
  newphide = true;

  constructor(private service:ProfileService, private user: UserService, private router: Router, private http:AdminService,private notif:Notification) { }
   changepassword=new FormGroup({
    Username :new FormControl(''),
    CurrentPassword :new FormControl(''),
    NewPassword:new FormControl(''),
   })
  ngOnInit(): void {
    this.service.Get_Userprofile()
    .subscribe((data:any)=>{    
     this.changepassword.controls['Username'].setValue(data.userName);
    })
  }
  changepasswords(){  
   if(this.changepassword.value.CurrentPassword=="")
    {
      this.notif.errorsmsg("Please enter your current password")      
      document.getElementById("CurrentPassword").focus();     
      return;
    }
    if(this.changepassword.value.CurrentPassword.length<6)
    {
      this.notif.errorsmsg("Current password must contain at least 6 characters")
      document.getElementById("CurrentPassword").focus();
      return;
    }     
    if (!(this.changepassword.value.CurrentPassword.includes("@") || this.changepassword.value.CurrentPassword.includes("#")
            || this.changepassword.value.CurrentPassword.includes("!") || this.changepassword.value.CurrentPassword.includes("~")
            || this.changepassword.value.CurrentPassword.includes("$") || this.changepassword.value.CurrentPassword.includes("%")
            || this.changepassword.value.CurrentPassword.includes("^") || this.changepassword.value.CurrentPassword.includes("&")
            || this.changepassword.value.CurrentPassword.includes("*") || this.changepassword.value.CurrentPassword.includes("(")
            || this.changepassword.value.CurrentPassword.includes(")") || this.changepassword.value.CurrentPassword.includes("-")
            || this.changepassword.value.CurrentPassword.includes("+") || this.changepassword.value.CurrentPassword.includes("/")
            || this.changepassword.value.CurrentPassword.includes(":") || this.changepassword.value.CurrentPassword.includes(".")
            || this.changepassword.value.CurrentPassword.includes(", ") || this.changepassword.value.CurrentPassword.includes("<")
            || this.changepassword.value.CurrentPassword.includes(">") || this.changepassword.value.CurrentPassword.includes("?")
            || this.changepassword.value.CurrentPassword.includes("|"))) {
      this.notif.errorsmsg("Current password must have at least one special character")
      document.getElementById("CurrentPassword").focus();
      return;
    }

    const number_REGEXP = /\d/; 
    if (!number_REGEXP.test(this.changepassword.value.CurrentPassword)) {
      this.notif.errorsmsg("Current password must have at least one numeric digit")
      document.getElementById("CurrentPassword").focus();
      return;
    }

    const upper_REGEXP = /[A-Z]/; 
    if (!upper_REGEXP.test(this.changepassword.value.CurrentPassword)) {
      this.notif.errorsmsg("Current password must have at least one uppercase letter")
      document.getElementById("CurrentPassword").focus();
      return;
    }

    const lower_REGEXP = /[a-z]/; 
    if (!lower_REGEXP.test(this.changepassword.value.CurrentPassword)) {
      this.notif.errorsmsg("Current password must have at least one lowercase letter")
      document.getElementById("CurrentPassword").focus();
      return;
    }

    if((this.changepassword.value.CurrentPassword as string).indexOf('  ') >= 0 || this.changepassword.value.CurrentPassword.startsWith(' ') || this.changepassword.value.CurrentPassword.endsWith(' '))
    { 
      this.notif.errorsmsg('Current password must not contain white space');	
      document.getElementById("CurrentPassword").focus();		
      return; 
    } 
    //end current password

    //start new password
    if(this.changepassword.value.NewPassword=="")
    {
      this.notif.errorsmsg("Please enter your new password")
      document.getElementById("NewPassword").focus();
      return;
    }

    if(this.changepassword.value.NewPassword.length<6)
    {
      this.notif.errorsmsg("New password must contain at least 6 characters")
      document.getElementById("NewPassword").focus();
      return;
    }     
    if (!(this.changepassword.value.NewPassword.includes("@") || this.changepassword.value.NewPassword.includes("#")
            || this.changepassword.value.NewPassword.includes("!") || this.changepassword.value.NewPassword.includes("~")
            || this.changepassword.value.NewPassword.includes("$") || this.changepassword.value.NewPassword.includes("%")
            || this.changepassword.value.NewPassword.includes("^") || this.changepassword.value.NewPassword.includes("&")
            || this.changepassword.value.NewPassword.includes("*") || this.changepassword.value.NewPassword.includes("(")
            || this.changepassword.value.NewPassword.includes(")") || this.changepassword.value.NewPassword.includes("-")
            || this.changepassword.value.NewPassword.includes("+") || this.changepassword.value.NewPassword.includes("/")
            || this.changepassword.value.NewPassword.includes(":") || this.changepassword.value.NewPassword.includes(".")
            || this.changepassword.value.NewPassword.includes(", ") || this.changepassword.value.NewPassword.includes("<")
            || this.changepassword.value.NewPassword.includes(">") || this.changepassword.value.NewPassword.includes("?")
            || this.changepassword.value.NewPassword.includes("|"))) {
      this.notif.errorsmsg("New password must have at least one special character")
      document.getElementById("NewPassword").focus();
      return;
    }
   
    if (!number_REGEXP.test(this.changepassword.value.NewPassword)) {
      this.notif.errorsmsg("New password must have at least one numeric digit")
      document.getElementById("NewPassword").focus();
      return;
    }
   
    if (!upper_REGEXP.test(this.changepassword.value.NewPassword)) {
      this.notif.errorsmsg("New password must have at least one uppercase letter")
      document.getElementById("NewPassword").focus();
      return;
    }
    
    if (!lower_REGEXP.test(this.changepassword.value.NewPassword)) {
      this.notif.errorsmsg("New password must have at least one lowercase letter")
      document.getElementById("NewPassword").focus();
      return;
    }

    if((this.changepassword.value.NewPassword as string).indexOf('  ') >= 0 || this.changepassword.value.NewPassword.startsWith(' ') || this.changepassword.value.NewPassword.endsWith(' '))
    { 
      this.notif.errorsmsg('New password must not contain white space');	
      document.getElementById("NewPassword").focus();		
      return; 
    } 
    //end new password
    this.http.Change_Password(this.changepassword.value)
     .subscribe((res)=>{      
      var msg= res['isSuccess'];
      if(msg==true)
      {
        this.notif.successmsg('Password changed successfully')
        this.changepassword.controls['CurrentPassword'].setValue('');
        this.changepassword.controls['NewPassword'].setValue('');
        this.user.logout(); // clear all local storage details 
        this.router.navigate(['/auth/login']);
      }

      /*
      else{
        this.notif.errorsmsg('Please enter your correct password')
      }
      */
        
     },
     
     /*
     (error) => {      
      this.notif.errorsmsg('Please enter your correct password')      
      }
      */
      
     )
  }
}
