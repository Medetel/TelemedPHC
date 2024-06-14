import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.scss']
})
export class EditRolesComponent implements OnInit {
  role_register:FormGroup;
  role: any;
  constructor(private dialogRef: MatDialogRef<EditRolesComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private fb:FormBuilder,private _service:AdminService,private notif:Notification) { 
    this.role_register=this.fb.group({
      'RoleId': [this._data.d.id],
      'RoleName':[this._data.d.name]

    })
  } 

  reset(){
    this.role_register.reset();
  }
  
  ngOnInit(): void {
    this.get_role();
  }

  update() {   
    if(this.role_register.value.RoleName=="")
    {
      this.notif.errorsmsg("Please enter role name")
      return;
    }   
    const name_REGEXP = /^[a-zA-Z ]*$/;
    if (!name_REGEXP.test(this.role_register.value.RoleName)) {
      this.notif.errorsmsg("Role name allow character only")
      return;
    }
    if((this.role_register.value.RoleName as string).indexOf('  ') >= 0 || this.role_register.value.RoleName.startsWith(' ') ||  this.role_register.value.RoleName.endsWith(' '))
		{ 
			this.notif.errorsmsg('Role name must not contain white space');			
			return; 
		}    
  this._service.put_role(this.role_register.value)
  .subscribe((res)=>{    
    this.notif.successmsg("Role updated successfully")    
    this.dialogRef.close();
    window.location.reload();
  })
}

get_role(){
  this._service.Get_Role()
  .subscribe((data)=>{
    this.role=data
  })
}
}
