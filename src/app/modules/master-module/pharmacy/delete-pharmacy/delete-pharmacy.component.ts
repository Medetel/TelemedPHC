import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { PharmacyService } from '../pharmacy.service';

@Component({
  selector: 'app-delete-pharmacy',
  templateUrl: './delete-pharmacy.component.html',
  styleUrls: ['./delete-pharmacy.component.scss']
})
export class DeletePharmacyComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeletePharmacyComponent>,@Inject(MAT_DIALOG_DATA) private _data: any, private service: PharmacyService, private notif: Notification) { }

  ngOnInit(): void {
  }

  delete() {
    this.service.Delete_pharmacy(this._data.d.ph_Id)
      .subscribe((res) => {
        this.notif.successmsg("Pharmacy Deleted Successfully")
        this.dialogRef.close();
        window.location.reload(); 
      })
  }
}
