import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { CounsultationService } from '../../../counsultation.service';

@Component({
  selector: 'app-delete-prescriptions',
  templateUrl: './delete-prescriptions.component.html',
  styleUrls: ['./delete-prescriptions.component.scss']
})
export class DeletePrescriptionsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private notif:Notification,private service:CounsultationService) { }

  ngOnInit(): void {
  }

  delete(){
    this.service.Delete_Presctn(this._data.d.prc_id)
    .subscribe((res)=>{
      this.notif.successmsg("Prescription Deleted Successfully");
      window.location.reload();
    })
  }



}
