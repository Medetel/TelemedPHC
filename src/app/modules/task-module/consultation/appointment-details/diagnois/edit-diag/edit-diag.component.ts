import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { CounsultationService } from '../../../counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';
import { AnyMxRecord } from 'dns';

@Component({
  selector: 'app-edit-diag',
  templateUrl: './edit-diag.component.html',
  styleUrls: ['./edit-diag.component.scss']
})
export class EditDiagComponent implements OnInit {
  Diagnosis: FormGroup;
  con_id: any;

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private service: CounsultationService, private fb: FormBuilder, private notif: Notification, private route: ActivatedRoute,) {
    this.Diagnosis = this.fb.group({
      'con_diag_id':[''],
      'con_diag_descrip': [''],
      'con_diag_conid_FK':[this.route.snapshot.params['id']]
   })
  }

  ngOnInit(): void {
    this.bind();
    let id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      id = +params['id'];
      this.con_id = id;
    });
  }

  bind(){
    this.Diagnosis.controls['con_diag_descrip'].setValue(this._data.d.con_diag_descrip);
    this.Diagnosis.controls['con_diag_id'].setValue(this._data.d.con_diag_id);
    this.Diagnosis.controls['con_diag_conid_FK'].setValue(this._data.d.con_diag_conid_FK);
  }

  update(){
    this.service.Put_diagnosis(this.Diagnosis.value)
    .subscribe((res) => {
      this.notif.successmsg("Diagnosis Updated Successfully")
      this.Diagnosis.reset();
    })
    // this.Diagnosis.reset();
  }

}
