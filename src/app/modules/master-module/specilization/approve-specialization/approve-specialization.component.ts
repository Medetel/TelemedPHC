import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { SpecilizationService } from '../specilization.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-approve-specialization',
  templateUrl: './approve-specialization.component.html',
  styleUrls: ['./approve-specialization.component.scss']
})
export class ApproveSpecializationComponent implements OnInit {

  specilization:FormGroup;
  constructor(private dialogRef: MatDialogRef<ApproveSpecializationComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder,private service:SpecilizationService,private notif:Notification) { 
    this.specilization=this.fb.group({
      'spc_Name': [this._data.d.spc_Name],
      'sP_Specialization':[this._data.d.sP_Specialization],
      'sP_Code':[this._data.d.sP_Code],
      'sP_Id':[''],
      'Remarks':['']
    })
  }

  ngOnInit(): void {
    this.disable();
    this.bind();
  }
  disable(){
    this.specilization.controls['spc_Name'].disable();
    this.specilization.controls['sP_Specialization'].disable();
    this.specilization.controls['sP_Code'].disable();
  }

  bind(){
    this.specilization.controls['sP_Id'].setValue(this._data.d.sP_Id);
  }

  approveform(){

    this.service.Put_Approval(this.specilization.value)
    .subscribe((res)=>{
      this.notif.successmsg("Specialization approved successfully")
      this.dialogRef.close();
      window.location.reload();
    })
  }

}
