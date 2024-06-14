import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { AssistantService } from '../assistant.service';

@Component({
  selector: 'app-delete-assistant',
  templateUrl: './delete-assistant.component.html',
  styleUrls: ['./delete-assistant.component.scss']
})
export class DeleteAssistantComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteAssistantComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private service:AssistantService,private notif:Notification) { }

  ngOnInit(): void {
  }
delete(){
  this.service.Delete_Assistant(this._data.d.assi_Id)
  .subscribe((res)=>{
    this.notif.successmsg("Assistant Deleted Successfully")
    this.dialogRef.close();
    window.location.reload(); 
  },(error)=>{
    this.notif.errorsmsg("Assistant Not Deleted")
  })
}
}
