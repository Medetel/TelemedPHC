import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CounsultationService } from '../../../counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-deletelab',
  templateUrl: './deletelab.component.html',
  styleUrls: ['./deletelab.component.scss']
})
export class DeletelabComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private notif:Notification,private service:CounsultationService) { }

  ngOnInit(): void {

  }

  delete(){
   //alert("Id:"+this._data.d.id)
  
    this.service.Delete_labtest(this._data.d.id)
    .subscribe((res)=>{
      this.notif.successmsg("Lab_Test Deleted Successfully");
      window.location.reload();

    })
  }

}
