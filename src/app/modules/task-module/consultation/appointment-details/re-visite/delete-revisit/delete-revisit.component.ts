import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CounsultationService } from '../../../counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-delete-revisit',
  templateUrl: './delete-revisit.component.html',
  styleUrls: ['./delete-revisit.component.scss']
})
export class DeleteRevisitComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any, private notif: Notification, private service: CounsultationService) { }

  ngOnInit(): void {

  }

  delete() {
    this.service.Delete_revisit(this._data.d.rV_Id)
      .subscribe((res) => {
        this.notif.successmsg("Re-visit Deleted Successfully")
      })
  }

}
