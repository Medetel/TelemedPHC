import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GramService } from '../gram.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-approve-gram',
  templateUrl: './approve-gram.component.html',
  styleUrls: ['./approve-gram.component.scss']
})
export class ApproveGramComponent implements OnInit {

  gram:FormGroup;
  constructor(private dialogRef: MatDialogRef<ApproveGramComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder,private service:GramService,private notif:Notification) { 
    this.gram=this.fb.group({
      'gram_code':[this._data.d.gram_code],
      'cntry_name':[this._data.d.cntry_name],
      'state_name':[this._data.d.state_name],
      'dist_name':[this._data.d.dist_name],
      'taluk_name':[this._data.d.taluk_name],
      'gram_name':[this._data.d.gram_name],
      'postal_Code':[this._data.d.postal_Code],
      'gram_id':[''],
      'Remarks':['']
    })
  }
  ngOnInit(): void {
    this.disable();
    this.bind();
  }
  disable(){
    this.gram.controls['gram_code'].disable();
    this.gram.controls['gram_name'].disable();
    this.gram.controls['cntry_name'].disable();
    this.gram.controls['state_name'].disable();
    this.gram.controls['dist_name'].disable();
    this.gram.controls['taluk_name'].disable();
    this.gram.controls['postal_Code'].disable();
  }

  bind(){
    this.gram.controls['gram_id'].setValue(this._data.d.gram_id);
  }

  approveform(){
    this.service.Put_Approval(this.gram.value)
    .subscribe((res)=>{
      this.notif.successmsg("Gram approved successfully")
      this.dialogRef.close();
      window.location.reload(); 
    })
    
  }

}
