import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  office: any;
  role: any;
  user_register: FormGroup;
  rolecategory: any;
  hospital: any;
  pharmacy: any;
  OfficeCategory: any;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder) {
    this.user_register = this.fb.group({
      'role':[this._data.d.rolename],
      'Phonenumber':[this._data.d.phoneNumber,],
      'Email':[this._data.d.email,],
      'Username': [this._data.d.firstName + ' ' + this._data.d.lastName, ], 
  })
  }
ngOnInit(): void {
  this.disable();
}
disable(){
  this.user_register.controls['role'].disable();
  this.user_register.controls['Phonenumber'].disable();
  this.user_register.controls['Email'].disable();
  this.user_register.controls['Username'].disable();
}

}
 
