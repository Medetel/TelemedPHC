import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-delete-users',
  templateUrl: './delete-users.component.html',
  styleUrls: ['./delete-users.component.scss']
})
export class DeleteUsersComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private service:AdminService,private notif:Notification) { }

  ngOnInit(): void {
  }
  delete(){
    this.service.Delete_user(this._data.d.id)
    .subscribe((res)=>{
      this.notif.successmsg("Record Deleted Successfully")
    })
  }
}
