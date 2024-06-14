import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DisciplineService } from '../discipline.service';

@Component({
  selector: 'app-delete-discipline',
  templateUrl: './delete-discipline.component.html',
  styleUrls: ['./delete-discipline.component.scss']
})
export class DeleteDisciplineComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteDisciplineComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private service:DisciplineService,private notif:Notification) { }

  ngOnInit(): void {
  }
delete(){
  this.service.Delete_discipline(this._data.d.cD_Id)
  .subscribe((res)=>{
    this.notif.successmsg("Discipline deleted successfully")
    this.dialogRef.close();
    window.location.reload(); 
  })
}
}
