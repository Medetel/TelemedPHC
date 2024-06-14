import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CounsultationService } from '../../../counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-approve-referral',
  templateUrl: './approve-referral.component.html',
  styleUrls: ['./approve-referral.component.scss']
})
export class ApproveReferralComponent implements OnInit {
  approvereferral: FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private service: CounsultationService, private fb: FormBuilder, private notif: Notification, private route: ActivatedRoute, public dialog: MatDialog) { 
    this.approvereferral = this.fb.group({
      'hos_Name': [this._data.d.hos_Name],
      'ref_Date': [this._data.d.ref_Date],
      'splObs': [this._data.d.splObs],
      'remarks': [this._data.d.remarks],
      'ref_Id': [this._data.d.ref_Id],
      'select_FrmTime': [''],
      'select_toTime':['']
    })
  }

  ngOnInit(): void {
  }

  approve(){
    this.service.Approve_referral(this.approvereferral.value)
    .subscribe((res) => {
      this.notif.successmsg("Referral Approved Successfully")
    })
  }
}
