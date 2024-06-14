import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CounsultationService } from '../../../counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-delete-referral',
  templateUrl: './delete-referral.component.html',
  styleUrls: ['./delete-referral.component.scss']
})
export class DeleteReferralComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any, private notif: Notification, private service: CounsultationService) { }

  ngOnInit(): void {

  }

  delete() {
    this.service.Delete_referral(this._data.d.ref_Id)
      .subscribe((res) => {
        this.notif.successmsg("Referral Deleted Successfully")
      })
  }

}
