import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CounsultationService } from '../../../counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-approve-revisit',
  templateUrl: './approve-revisit.component.html',
  styleUrls: ['./approve-revisit.component.scss']
})
export class ApproveRevisitComponent implements OnInit {

  Aproverevisit:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder, private route: ActivatedRoute, private service: CounsultationService, private notif: Notification, public dialog: MatDialog) { 
    this.Aproverevisit = this.fb.group({
      'date': [this._data.d.date],
      'hos_Id': [this._data.d.hos_Name],
      'rV_Date': [this._data.d.rV_Date],
      'rV_Time': [this._data.d.rV_Time],
      'remarks': [this._data.d.remarks],
      'rV_Id':[this._data.d.rV_Id],
      'select_FrmTime':[''],
      'select_toTime':[''],
    })
  }

  ngOnInit(): void {
  }

  approve(){
    this.service.Approve_revisit(this.Aproverevisit.value)
    .subscribe((res) => {
      this.notif.successmsg("Referral Approved Successfully")
      this.Aproverevisit.reset();
    })
    
  }
  
}
