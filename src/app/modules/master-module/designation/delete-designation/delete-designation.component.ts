import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DesignationService } from '../designation.service';

@Component({
  selector: 'app-delete-designation',
  templateUrl: './delete-designation.component.html',
  styleUrls: ['./delete-designation.component.scss']
})
export class DeleteDesignationComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteDesignationComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private service:DesignationService,private notif:Notification) { }

  ngOnInit(): void {
  }
delete(){
  this.service.Delete_designation(this._data.d.designation_id)
  .subscribe((res)=>{
    this.notif.successmsg("Designation deleted successfully")
    this.dialogRef.close();
    window.location.reload(); 
  })
}
}
