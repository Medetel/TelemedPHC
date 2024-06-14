import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DiagnostictestService } from '../diagnostictest.service';


@Component({
  selector: 'app-approve-diagnostictest',
  templateUrl: './approve-diagnostictest.component.html',
  styleUrls: ['./approve-diagnostictest.component.scss']
})
export class ApproveDiagnostictestComponent implements OnInit {
  diagnostictest: FormGroup;

  constructor(private dialogRef: MatDialogRef<ApproveDiagnostictestComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb:FormBuilder,private notif: Notification,public service: DiagnostictestService) {
    this.diagnostictest=this.fb.group({
      'status':[''],
      'dT_Code':[this._data.d.dT_Code],
      'dT_Type':[this._data.d.type_Name],
      'dT_Category':[this._data.d.cat_Name],
      'dT_Desc':[this._data.d.dT_Desc],
      'dT_Id':['']
      })
   }

  ngOnInit(): void {
    this.disable();
    this.bind();
  }

  disable(){
    this.diagnostictest.controls['dT_Code'].disable();
    this.diagnostictest.controls['dT_Type'].disable();
    this.diagnostictest.controls['dT_Category'].disable();
    this.diagnostictest.controls['dT_Desc'].disable();
  }

  bind(){
    this.diagnostictest.controls['dT_Id'].setValue(this._data.d.dT_Id);
  }

  approveform(){
    this.service.Approve_diagnotest(this.diagnostictest.value)
    .subscribe((res)=>{
      this.notif.successmsg("Diagnostic test approved successfully")
      this.dialogRef.close();
      window.location.reload(); 
    })
    
  }

}
