import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { StateService } from '../state.service';

@Component({
  selector: 'app-delete-state',
  templateUrl: './delete-state.component.html',
  styleUrls: ['./delete-state.component.scss']
})
export class DeleteStateComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteStateComponent>,@Inject(MAT_DIALOG_DATA) private _data: any, private service: StateService, private notif: Notification) { }

  ngOnInit(): void {
  }
  delete() {
    this.service.Delete_state(this._data.d.stat_id)
      .subscribe((res) => {
        this.notif.successmsg("State deleted successfully")
        this.dialogRef.close();
        window.location.reload(); 
      })
  }
}
