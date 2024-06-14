import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CounsultationService } from '../../../counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-view-referral',
  templateUrl: './view-referral.component.html',
  styleUrls: ['./view-referral.component.scss']
})
export class ViewReferralComponent implements OnInit {

  viewreferral:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private service: CounsultationService, private fb: FormBuilder, private notif: Notification, private route: ActivatedRoute, public dialog: MatDialog) {
    this.viewreferral = this.fb.group({
      'hos_Name': [this._data.d.hos_Name],
      'ref_Date': [this._data.d.ref_Date],
      'splObs': [this._data.d.splObs],
      'remarks': [this._data.d.remarks],
    })
   }

  ngOnInit(): void {
    
  }

}
