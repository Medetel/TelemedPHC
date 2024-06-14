import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { StateService } from '../state.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-approve-state',
  templateUrl: './approve-state.component.html',
  styleUrls: ['./approve-state.component.scss']
})
export class ApproveStateComponent implements OnInit {

  state:FormGroup;
  constructor(private dialogRef: MatDialogRef<ApproveStateComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder,private service:StateService,private notif:Notification) { 
    this.state=this.fb.group({
      'country_name':[this._data.d.country_name],
      'state_name':[this._data.d.state_name],
      'state_code':[this._data.d.state_code],
      'stat_id':[''],
      'Remarks':['']
    })
  }

  ngOnInit(): void {
    this.disable();
    this.bind();
  }
  disable(){
    this.state.controls['country_name'].disable();
    this.state.controls['state_name'].disable();
    this.state.controls['state_code'].disable();
  }
  bind(){
    this.state.controls['stat_id'].setValue(this._data.d.stat_id);
    // this.state.controls['country_name'].setValue(this._data.d.country_name);
    // this.state.controls['state_name'].setValue(this._data.d.state_name);
    // this.state.controls['state_code'].setValue(this._data.d.state_code);
  }

  approveform(){
    this.service.Put_Approval(this.state.value)
    .subscribe((res)=>{
      this.notif.successmsg("state approved successfully")
      this.dialogRef.close();
      window.location.reload(); 
    })
  }
}
