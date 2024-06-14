import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { CallcenterService } from '../callcenter.service';

@Component({
  selector: 'app-approve-callcenter',
  templateUrl: './approve-callcenter.component.html',
  styleUrls: ['./approve-callcenter.component.scss']
})
export class ApproveCallcenterComponent implements OnInit {
  Image_Url;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any, private dialogRef: MatDialogRef<ApproveCallcenterComponent>, private service: CallcenterService, private notif: Notification) { }
  callcenter = new FormGroup({
    Call_Ag_Id: new FormControl(''),
    Remarks: new FormControl(''),
    Call_Ag_FirstName: new FormControl(''),
    Call_Ag_LastName: new FormControl(''),
    Call_Ag_code: new FormControl(''),
    Call_Ag_Gender: new FormControl(''),
    Call_Ag_MobileNumber: new FormControl(''),
    Call_Ag_Address: new FormControl(''),
    Call_Ag_Hos_Id: new FormControl(''),
    Call_Ag_Qua_Id: new FormControl(''),
    Call_Ag_Des_Id: new FormControl(''),
    Call_Ag_Skill_Desc: new FormControl(''),

  })
  ngOnInit(): void {
    this.disable();
    this.bind();
    this.Image_Url = this._data.d.call_Ag_Image;
  }

  bind() {
    const ass_DOB = new DatePipe('en-US').transform(this._data.d.call_Ag_DOB, 'dd/MM/yyyy')
    this.callcenter.controls['Call_Ag_FirstName'].setValue(this._data.d.call_Ag_FirstName);
    this.callcenter.controls['Call_Ag_LastName'].setValue(this._data.d.call_Ag_LastName);
    this.callcenter.controls['Call_Ag_code'].setValue(this._data.d.call_Ag_code);
    this.callcenter.controls['Call_Ag_Gender'].setValue(this._data.d.call_Ag_Gender);
    this.callcenter.controls['Call_Ag_MobileNumber'].setValue(this._data.d.call_Ag_MobileNumber);
    this.callcenter.controls['Call_Ag_Address'].setValue(this._data.d.call_Ag_Address);
    this.callcenter.controls['Call_Ag_Hos_Id'].setValue(this._data.d.call_Ag_Hos_HospitalName);
    this.callcenter.controls['Call_Ag_Qua_Id'].setValue(this._data.d.call_Ag_qualification);
    this.callcenter.controls['Call_Ag_Des_Id'].setValue(this._data.d.call_Ag_Designation);
    this.callcenter.controls['Call_Ag_Skill_Desc'].setValue(this._data.d.call_Ag_Skill_Desc);
    this.callcenter.controls['Call_Ag_Id'].setValue(this._data.d.call_Ag_Id);
  }

  disable() {
    this.callcenter.controls['Call_Ag_FirstName'].disable();
    this.callcenter.controls['Call_Ag_LastName'].disable();
    this.callcenter.controls['Call_Ag_code'].disable();
    this.callcenter.controls['Call_Ag_Gender'].disable();
    this.callcenter.controls['Call_Ag_MobileNumber'].disable();
    this.callcenter.controls['Call_Ag_Address'].disable();
    this.callcenter.controls['Call_Ag_Hos_Id'].disable();
    this.callcenter.controls['Call_Ag_Qua_Id'].disable();
    this.callcenter.controls['Call_Ag_Des_Id'].disable();
    this.callcenter.controls['Call_Ag_Skill_Desc'].disable();
  }

  approveform() {
    this.service.Put_Approval(this.callcenter.value)
      .subscribe((res) => {
        this.notif.successmsg("Callcenter Agent Approved Successfully")
        this.dialogRef.close();
        window.location.reload();
      })

  }

}
