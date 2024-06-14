import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { AdminService } from '../../admin.service';
import { CustomvalidationService } from '../../customvalidation.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {
  office:any;
  role:any;
  user_register:FormGroup;
  newphide = true;
  conphide = true;
  userData:any;
    constructor(private dialogRef: MatDialogRef<EditUsersComponent>, @Inject(MAT_DIALOG_DATA) private _data: any,private router: Router,private _service:AdminService,private fb:FormBuilder,private notif:Notification,private customValidator:CustomvalidationService) { 
      this.user_register = this.fb.group({        
        'UserId': [this._data.d.id],
        'role':[this._data.d.rolename],
        'RoleId':[this._data.d.roleIdFk],
        'Phonenumber':[this._data.d.phoneNumber],
        'Email':[this._data.d.email],
        'Username': [this._data.d.firstName + ' ' + this._data.d.lastName], 
        'Password': [''],
        'ConfirmPassword': [''],
      },     
      
      )
    }   

    reset(){
      this.user_register.reset();
    }
  
    ngOnInit(): void {
      this.get_office();
      this.get_role();
      this.user_register.controls['UserId'].disable();
      this.user_register.controls['role'].disable();
      this.user_register.controls['RoleId'].disable();
      this.user_register.controls['Phonenumber'].disable();
      this.user_register.controls['Email'].disable();
      this.user_register.controls['Username'].disable();
    }
     
  updateform() {
    //password
  if(this.user_register.value.Password=="")
  {
    this.notif.errorsmsg("Please enter password")
    return;
  }

  if(this.user_register.value.Password.length<6)
  {
    this.notif.errorsmsg("Password must contain at least 6 characters")
    return;
  }     
  if (!(this.user_register.value.Password.includes("@") || this.user_register.value.Password.includes("#")
            || this.user_register.value.Password.includes("!") || this.user_register.value.Password.includes("~")
            || this.user_register.value.Password.includes("$") || this.user_register.value.Password.includes("%")
            || this.user_register.value.Password.includes("^") || this.user_register.value.Password.includes("&")
            || this.user_register.value.Password.includes("*") || this.user_register.value.Password.includes("(")
            || this.user_register.value.Password.includes(")") || this.user_register.value.Password.includes("-")
            || this.user_register.value.Password.includes("+") || this.user_register.value.Password.includes("/")
            || this.user_register.value.Password.includes(":") || this.user_register.value.Password.includes(".")
            || this.user_register.value.Password.includes(", ") || this.user_register.value.Password.includes("<")
            || this.user_register.value.Password.includes(">") || this.user_register.value.Password.includes("?")
            || this.user_register.value.Password.includes("|"))) {
    this.notif.errorsmsg("Password must have at least one special character")
    return;
  }

  const number_REGEXP = /\d/; 
  if (!number_REGEXP.test(this.user_register.value.Password)) {
    this.notif.errorsmsg("Password must have at least one numeric digit")
    return;
  }

  const upper_REGEXP = /[A-Z]/; 
  if (!upper_REGEXP.test(this.user_register.value.Password)) {
    this.notif.errorsmsg("Password must have at least one uppercase letter")
    return;
  }

  const lower_REGEXP = /[a-z]/; 
  if (!lower_REGEXP.test(this.user_register.value.Password)) {
    this.notif.errorsmsg("Password must have at least one lowercase letter")
    return;
  }

  if((this.user_register.value.Password as string).indexOf('  ') >= 0 || this.user_register.value.Password.startsWith(' ') ||  this.user_register.value.Password.endsWith(' '))
  { 
    this.notif.errorsmsg('Password must not contain white space');			
    return; 
  } 

  //confirm password
  if(this.user_register.value.ConfirmPassword=="")
  {
    this.notif.errorsmsg("Please enter confirm password")
    return;
  }

  if(this.user_register.value.Password!=this.user_register.value.ConfirmPassword)
  {
    this.notif.errorsmsg("Confirm password does not match!")
    return;
  }  
    
    this.userData={
      roleId:this._data.d.roleIdFk,
      userId:this._data.d.id, 
      userName:this._data.d.phoneNumber, 
      email:this._data.d.email,
      password:this.user_register.value.Password,
      confirmPassword:this.user_register.value.ConfirmPassword
    }    
    
      this._service.put_user(this.userData)
      .subscribe((res)=>{
        this.notif.successmsg("User updated successfully")
        this.dialogRef.close();
        window.location.reload();
      })

}
  get_office(){
    this._service.Get_Office()
    .subscribe((data)=>{
        this.office=data
    })
  }
  get_role(){
    this._service.Get_Role()
    .subscribe((data)=>{
      this.role=data
    })
  }
}