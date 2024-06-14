import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DrugserviceService } from '../drugservice.service';

@Component({
  selector: 'app-delete-drugs',
  templateUrl: './delete-drugs.component.html',
  styleUrls: ['./delete-drugs.component.scss']
})
export class DeleteDrugsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteDrugsComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private notif:Notification,public service:DrugserviceService) { }

  ngOnInit(): void {
  }
  
  delete(){
    this.service.Delete_drug(this._data.d.drg_mst_id)
    .subscribe((res)=>{
      this.notif.successmsg("Drug deleted successfully")
      this.dialogRef.close();
      window.location.reload(); 
    })
  }

}
