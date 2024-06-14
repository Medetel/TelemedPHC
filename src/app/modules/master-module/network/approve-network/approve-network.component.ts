import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-approve-network',
  templateUrl: './approve-network.component.html',
  styleUrls: ['./approve-network.component.scss']
})
export class ApproveNetworkComponent implements OnInit {

  network:FormGroup;
  constructor(private dialogRef: MatDialogRef<ApproveNetworkComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder,private service:NetworkService,private notif:Notification) { 
    this.network=this.fb.group({
      'nE_Description':[this._data.d.nE_Description],
      'nE_Code':[this._data.d.nE_Code],
      'Remarks':[''],
      'nE_Id':[''],
    })
  }

  ngOnInit(): void {
    this.disable();
    this.bind();
  }
  disable(){
    this.network.controls['nE_Description'].disable();
    this.network.controls['nE_Code'].disable();
  }
  bind(){
    this.network.controls['nE_Id'].setValue(this._data.d.nE_Id)
  }

  approveform(){
    this.service.Put_Approval(this.network.value)
    .subscribe((res)=>{
      this.notif.successmsg("Network approved successfully")
      this.dialogRef.close();
      window.location.reload(); 
    })
  }

}
