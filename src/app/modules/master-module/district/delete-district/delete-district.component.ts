import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DistrictService } from '../district.service';

@Component({
  selector: 'app-delete-district',
  templateUrl: './delete-district.component.html',
  styleUrls: ['./delete-district.component.scss']
})
export class DeleteDistrictComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteDistrictComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private service:DistrictService,private notif:Notification) { }

  ngOnInit(): void {
  }
delete(){
  this.service.Delete_district(this._data.d.district_id)
  .subscribe((res)=>{
    this.notif.successmsg("District deleted successfully")
    this.dialogRef.close();
    window.location.reload(); 
  })
}
}
