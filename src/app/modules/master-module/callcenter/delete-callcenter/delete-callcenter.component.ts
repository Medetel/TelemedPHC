import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CallcenterService } from '../callcenter.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-delete-callcenter',
  templateUrl: './delete-callcenter.component.html',
  styleUrls: ['./delete-callcenter.component.scss']
})
export class DeleteCallcenterComponent implements OnInit {


  constructor(private dialogRef: MatDialogRef<DeleteCallcenterComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private service: CallcenterService, private notif: Notification) { }

  ngOnInit(): void {
  }
  delete() {
    this.service.Delete_callcenter(this._data.d.call_Ag_Id)
      .subscribe((res) => {
        this.notif.successmsg("Callcenter Agent Deleted Successfully")
        this.dialogRef.close();
        window.location.reload();
      }, (error) => {
        this.notif.errorsmsg("Callcenter Agent Not Deleted")
      })
  }
}
