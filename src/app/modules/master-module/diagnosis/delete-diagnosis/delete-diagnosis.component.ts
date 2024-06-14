import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DiagnosisService } from '../diagnosis.service';

@Component({
  selector: 'app-delete-diagnosis',
  templateUrl: './delete-diagnosis.component.html',
  styleUrls: ['./delete-diagnosis.component.scss']
})
export class DeleteDiagnosisComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<DeleteDiagnosisComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private service: DiagnosisService, private notif: Notification) { }

  ngOnInit(): void {
  }
  delete() {
    this.service.Delete_diagnosis(this._data.d.dD_Id)
      .subscribe((res) => {
        this.notif.successmsg("Diagnosis deleted successfully")
        this.dialogRef.close();
        window.location.reload();
      })
  }

}
