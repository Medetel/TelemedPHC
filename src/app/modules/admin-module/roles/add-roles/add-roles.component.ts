import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import {Notification} from 'src/app/core/Notifications/Notification'
@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss']
})
export class AddRolesComponent implements OnInit {
  role_register:FormGroup;
  constructor(private fb:FormBuilder,private _service:AdminService, private router: Router,private notif:Notification) { 
    this.role_register=this.fb.group({
      'roleName':['']
    })
  }

  /*
  nameValidatorss(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/,/0-9]/;  
  
    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }
  */

  ngOnInit(): void {
  }
save(){  
  if(this.role_register.value.roleName=="")
    {
      this.notif.errorsmsg("Please enter role name")
      return;
    }   
    const name_REGEXP = /^[a-zA-Z ]*$/;
    if (!name_REGEXP.test(this.role_register.value.roleName)) {
      this.notif.errorsmsg("Role name allow character only")
      return;
    }
    if((this.role_register.value.roleName as string).indexOf('  ') >= 0 || this.role_register.value.roleName.startsWith(' ') ||  this.role_register.value.roleName.endsWith(' '))
		{ 
			this.notif.errorsmsg('Role name must not contain white space');			
			return; 
		}    
  this._service.post_role(this.role_register.value)
  .subscribe((res)=>{    
    this.notif.successmsg("Role name added successfully")
    //window.location.reload();
    this.router.navigate(['/base/admin/roles']);
  })
}
}
