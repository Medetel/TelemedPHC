import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-active-roles',
  templateUrl: './active-roles.component.html',
  styleUrls: ['./active-roles.component.scss']
})
export class ActiveRolesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private service:AdminService,private notif:Notification) { }
  name: string;
  message: string;
  
  ngOnInit(): void {   
    this.name = this._data.d.inactive == 'Y' ? 'Active' : 'Inactive';
  }
  delete(){
    this.service.Active_inactive_role(this._data.d.id)
      .subscribe((res) => {
      this.message = res == true ? 'Active' : 'Inactive';
        this.notif.successmsg(this.message +" Successfully")
    })
  }
}
