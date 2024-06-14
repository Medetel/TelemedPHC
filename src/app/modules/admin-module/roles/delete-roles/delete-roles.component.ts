import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-delete-roles',
  templateUrl: './delete-roles.component.html',
  styleUrls: ['./delete-roles.component.scss']
})
export class DeleteRolesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private service:AdminService,private notif:Notification) { }

  ngOnInit(): void {
  }
  delete(){
    this.service.Delete_Active_inactive_role(this._data.d.id)
    .subscribe((res)=>{
      this.notif.successmsg("Role Deleted Successfully")
    })
  }
}
