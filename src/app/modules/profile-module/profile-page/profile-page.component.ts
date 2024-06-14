import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  profiles = []
  image_Url;
  username;
  firstname;
  lastname;
  dob;
  gender;
  email;
  contact_no;
  user_profile: FormGroup;
  constructor(private service: ProfileService, private fb: FormBuilder) {
    this.user_profile = this.fb.group({
      'firstname': [],
      'lastname': [],
      'dob': [],
      'gender': [],
      'email': [],
      'contact_no': [],
    })
  }

  ngOnInit(): void {

    //Saheb
    this.service.Get_Userprofile()
      .subscribe((data: any) => {
        this.username = data.userName
        this.firstname = data.firstName
        this.lastname = data.lastName
        this.dob = data.dob
        this.gender = data.gender
        this.email = data.email
        this.contact_no = data.phoneNumber
        this.image_Url = data.imagename;
        console.log('Profile Dat', this.username);
      })

    this.disableCtrls();
  }

  disableCtrls() {
    this.user_profile.controls['firstname'].disable();
    this.user_profile.controls['lastname'].disable();
    this.user_profile.controls['dob'].disable();
    this.user_profile.controls['gender'].disable();
    this.user_profile.controls['email'].disable();
    this.user_profile.controls['contact_no'].disable();
  }

}