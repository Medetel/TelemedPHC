import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CounsultationService } from '../../../counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-delete-diet',
  templateUrl: './delete-diet.component.html',
  styleUrls: ['./delete-diet.component.scss']
})
export class DeleteDietComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private notif:Notification,private service:CounsultationService) { }

  ngOnInit(): void {
  }

  delete(){
    this.service.Delete_Diet(this._data.d.dp_Id)
    .subscribe((res)=>{
      this.notif.successmsg("Diet-Plan Deleted Successfully");
      window.location.reload();
    })
  }
}
