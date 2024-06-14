import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-delete-country',
  templateUrl: './delete-country.component.html',
  styleUrls: ['./delete-country.component.scss']
})
export class DeleteCountryComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteCountryComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private router: Router, private service: CountryService, private notif: Notification) { }

  ngOnInit(): void {
  }
  delete() {
    this.service.Delete_Country(this._data.d.cntry_id)
      .subscribe((res) => {
        this.notif.successmsg("Country deleted successfully")
        this.dialogRef.close();
        window.location.reload(); 
      })
  }

  
}
