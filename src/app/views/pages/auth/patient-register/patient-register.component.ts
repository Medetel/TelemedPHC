import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Notification } from 'src/app/core/Notifications/Notification';
import { environment } from 'src/environments/environment';
import { UserService } from '../UserDetails/user.service';
@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.scss']
})
export class PatientRegisterComponent implements OnInit {
  patientregister:FormGroup;
  constructor(private fb:FormBuilder,private http:UserService,private notif:Notification) { 
    this.patientregister=this.fb.group({
      'Username':[''],
      'RoleId':['511714ef-e735-4dac-af27-16eb6048d604'],
      'Email':[''],
      'OfficeId':[0],
      'Phonenumber':[''],
      'Password':[''],
      'ConfirmPassword':['']
    })
  }

  ngOnInit(): void {
  }
  Register(){
   this.http.Post_Patient_register(this.patientregister.value)
    .subscribe((res)=>{
       this.notif.successmsg("Record Inserted Successfully")
    },(error)=>{
      this.notif.errorsmsg("Record Not Inserted :"+error)
    })
  }
}
