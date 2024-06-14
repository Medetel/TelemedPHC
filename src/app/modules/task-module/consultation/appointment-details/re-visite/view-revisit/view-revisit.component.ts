import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CounsultationService } from '../../../counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-view-revisit',
  templateUrl: './view-revisit.component.html',
  styleUrls: ['./view-revisit.component.scss']
})
export class ViewRevisitComponent implements OnInit {

  revisit:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder, private route: ActivatedRoute, private service: CounsultationService, private notif: Notification, public dialog: MatDialog) { 
    this.revisit = this.fb.group({
      'date': [this._data.d.date],
      'hos_Id': [this._data.d.hos_Name],
      'rV_Date': [this._data.d.rV_Date],
      'rV_Time': [this._data.d.rV_Time],
      'remarks': [this._data.d.remarks],
    })

  }


  ngOnInit(): void {

  }

}
