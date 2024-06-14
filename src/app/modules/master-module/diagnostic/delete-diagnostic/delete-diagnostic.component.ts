import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DiagnosticService } from '../diagnostic.service';

@Component({
  selector: 'app-delete-diagnostic',
  templateUrl: './delete-diagnostic.component.html',
  styleUrls: ['./delete-diagnostic.component.scss']
})
export class DeleteDiagnosticComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteDiagnosticComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private service:DiagnosticService,private notif:Notification) { }

  ngOnInit(): void {
  }

  delete(){
    this.service.Delete_diagnostic(this._data.d.dgstC_Id)
    .subscribe((res)=>{
      this.notif.successmsg("Hospital Deleted Successfully")
      this.dialogRef.close();
        window.location.reload(); 
    })
  }
}
