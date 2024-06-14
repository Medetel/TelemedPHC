import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.scss']
})
export class ActiveUserComponent implements OnInit {
  name: string;
  message: string;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private service:AdminService,private notif:Notification) { }

  ngOnInit(): void {
   
    this.name = this._data.d.inactive == 'Y' ? 'Active' : 'Inactive';
  }

  delete(){
    this.service.Active_inactive_user(this._data.d.id)
      .subscribe((res) => {
      this.message = res == true ? 'Active' : 'Inactive';
        this.notif.successmsg(this.message +" Successfully")
    })
  }

}
