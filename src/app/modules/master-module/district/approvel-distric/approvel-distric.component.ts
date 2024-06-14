import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { DistrictService } from '../district.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-approvel-distric',
  templateUrl: './approvel-distric.component.html',
  styleUrls: ['./approvel-distric.component.scss']
})
export class ApprovelDistricComponent implements OnInit {

  district:FormGroup;
  constructor(private dialogRef: MatDialogRef<ApprovelDistricComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder,private service:DistrictService,private notif:Notification) { 
    this.district=this.fb.group({
      'state_name':[this._data.d.state_name],
      'district_name':[this._data.d.district_name],
      'district_code':[this._data.d.district_code],
      'Remarks':[''],
      'district_id':['']
    })
  }


  ngOnInit(): void {
    this.disable();
    this.bind();
  }
  disable(){
    this.district.controls['state_name'].disable();
    this.district.controls['district_name'].disable();
    this.district.controls['district_code'].disable();
  }

  bind(){
    this.district.controls['district_id'].setValue(this._data.d.district_id)
  }

  approveform(){
    this.service.Put_Approval(this.district.value)
    .subscribe((res)=>{
      this.notif.successmsg("District approved successfully")
      this.dialogRef.close();
      window.location.reload(); 
    })
  }

}
