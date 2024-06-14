import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { TalukService } from '../taluk.service';


@Component({
  selector: 'app-approve-taluk',
  templateUrl: './approve-taluk.component.html',
  styleUrls: ['./approve-taluk.component.scss']
})
export class ApproveTalukComponent implements OnInit {

  district:FormGroup;
  constructor(private dialogRef: MatDialogRef<ApproveTalukComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder,private service:TalukService,private notif:Notification) { 
    this.district=this.fb.group({
      'taluk_code':[this._data.d.taluk_code],
      'taluk_name':[this._data.d.taluk_name],
      'state_name':[this._data.d.state_name],
      'cntry_name':[this._data.d.cntry_name],
      'district_name':[this._data.d.district_name],
      'taluk_id':[''],
      'Remarks':['']
     
    })
  }

  ngOnInit(): void {
    this.disable();
    this.bind();
  }
  disable(){
    this.district.controls['taluk_code'].disable();
    this.district.controls['taluk_name'].disable();
    this.district.controls['state_name'].disable();
    this.district.controls['district_name'].disable();
    this.district.controls['cntry_name'].disable();
   
  }
  bind(){
    this.district.controls['taluk_id'].setValue(this._data.d.taluk_id);
  }
  approveform(){   
    this.service.Put_Approval(this.district.value)
    .subscribe((res)=>{
      this.notif.successmsg("Taluk approved successfully")
      this.dialogRef.close();
      window.location.reload(); 
    })
  }


}
