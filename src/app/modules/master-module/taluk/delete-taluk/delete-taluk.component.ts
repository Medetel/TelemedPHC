import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { TalukService } from '../taluk.service';

@Component({
  selector: 'app-delete-taluk',
  templateUrl: './delete-taluk.component.html',
  styleUrls: ['./delete-taluk.component.scss']
})
export class DeleteTalukComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteTalukComponent>,@Inject(MAT_DIALOG_DATA) private _data: any, private service: TalukService, private notif: Notification) { }

  ngOnInit(): void {
  }
  delete() {
    this.service.Delete_Taluk(this._data.d.taluk_id)
      .subscribe((res) => {
        this.notif.successmsg("Taluk deleted successfully")
        this.dialogRef.close();
        window.location.reload(); 
      })
  }
}
