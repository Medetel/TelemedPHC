import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { CounsultationService } from '../../../counsultation.service';

@Component({
  selector: 'app-delete-diag',
  templateUrl: './delete-diag.component.html',
  styleUrls: ['./delete-diag.component.scss']
})
export class DeleteDiagComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private notif:Notification,private service:CounsultationService) { }

  ngOnInit(): void {

  }

  delete(){
    this.service.Delete_diagnosis(this._data.d.con_diag_id)
    .subscribe((res)=>{
      this.notif.successmsg("Diagnosis Deleted Successfully");
      window.location.reload();
    })
  }

}
