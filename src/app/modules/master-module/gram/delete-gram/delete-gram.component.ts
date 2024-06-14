import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { GramService } from '../gram.service';

@Component({
  selector: 'app-delete-gram',
  templateUrl: './delete-gram.component.html',
  styleUrls: ['./delete-gram.component.scss']
})
export class DeleteGramComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteGramComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private service:GramService,private notif:Notification) { }

  ngOnInit(): void {
  }
delete(){
  this.service.Delete_gram(this._data.d.gram_id)
  .subscribe((res)=>{
    this.notif.successmsg("Gram deleted successfully")
    this.dialogRef.close();
    window.location.reload(); 
  })
}

}
