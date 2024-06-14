import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { ServicechargeService } from '../servicecharge.service';

@Component({
  selector: 'app-deleteservicecharge',
  templateUrl: './deleteservicecharge.component.html',
  styleUrls: ['./deleteservicecharge.component.scss']
})
export class DeleteservicechargeComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteservicechargeComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private router: Router, private service:ServicechargeService , private notif: Notification) { }

  ngOnInit(): void {
    
  }
  delete() {   

    this.service.Delete_Servicecharge(this._data.d.price_Id)
      .subscribe((res) => {
        this.notif.successmsg("Service Charge deleted successfully")
        this.dialogRef.close();
        window.location.reload(); 
      })
  }

}
