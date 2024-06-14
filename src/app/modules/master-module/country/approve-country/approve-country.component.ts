import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Notification } from 'src/app/core/Notifications/Notification';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-approve-country',
  templateUrl: './approve-country.component.html',
  styleUrls: ['./approve-country.component.scss']
})
export class ApproveCountryComponent implements OnInit {
  country:FormGroup;
  constructor(private dialogRef: MatDialogRef<ApproveCountryComponent>,@Inject(MAT_DIALOG_DATA) private _data: any, private router: Router,private fb: FormBuilder,private service:CountryService,private notif:Notification) { 
    this.country=this.fb.group({
      'cntry_id':[''],
      'country_name':[this._data.d.country_name],
      'country_code':[this._data.d.country_code],
      'Remarks':[ ] || null,
    })
  }
  ngOnInit(): void {
    this.disable();
    this.Bind();
  }
  Bind(){
    this.country.controls['cntry_id'].setValue(this._data.d.cntry_id);
    this.country.controls['country_name'].setValue( this._data.d.country_name);
    this.country.controls['country_code'].setValue(this._data.d.country_code);
  }
  disable(){
    this.country.controls['country_name'].disable();
    this.country.controls['country_code'].disable();
  }
  approveform(){
    this.service.Put_Approval(this.country.value)
    .subscribe((res)=>{
      this.notif.successmsg("Country approved successfully")
      this.dialogRef.close();
      window.location.reload(); 
    })
  }
  
 

}
