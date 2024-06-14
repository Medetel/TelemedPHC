import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DiagnostictestService } from '../diagnostictest.service';

@Component({
  selector: 'app-delete-diagnostictest',
  templateUrl: './delete-diagnostictest.component.html',
  styleUrls: ['./delete-diagnostictest.component.scss']
})
export class DeleteDiagnostictestComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteDiagnostictestComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private notif:Notification,public service:DiagnostictestService) { }

  ngOnInit(): void {

  }

  delete(){
    this.service.Delete_diagnostictst(this._data.d.dT_Id)
    .subscribe((res)=>{
      this.notif.successmsg("Diagnostic test deleted successfully")
      this.dialogRef.close();
      window.location.reload(); 
    })
  }

}
