import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-delete-network',
  templateUrl: './delete-network.component.html',
  styleUrls: ['./delete-network.component.scss']
})
export class DeleteNetworkComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteNetworkComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private service:NetworkService,private notif:Notification) { }

  ngOnInit(): void {
  }
delete(){
  this.service.Delete_network(this._data.d.nE_Id)
  .subscribe((res)=>{
    this.notif.successmsg("Network deleted successfully")
    this.dialogRef.close();
    window.location.reload(); 
  })
}
}
