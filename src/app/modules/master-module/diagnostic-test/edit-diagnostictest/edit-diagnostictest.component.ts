import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DiagnostictestService } from '../diagnostictest.service';

@Component({
  selector: 'app-edit-diagnostictest',
  templateUrl: './edit-diagnostictest.component.html',
  styleUrls: ['./edit-diagnostictest.component.scss']
})
export class EditDiagnostictestComponent implements OnInit {
  diagnostictest:FormGroup;
  type: any;
  category: any;
  
  constructor(private dialogRef: MatDialogRef<EditDiagnostictestComponent>,@Inject(MAT_DIALOG_DATA) private _data: any ,public service: DiagnostictestService, private notif: Notification,public fb:FormBuilder) { 
    this.diagnostictest=this.fb.group({
      'dT_Code':[''],
      'dT_Type':[''],
      'dT_Category':[''],
      'dT_Desc':['',[this.spaceValidator]],
      'dT_Id':[''],
      })
  }

  ngOnInit(): void {
    this.Get_Diagnostictstdd();
    //this.Get_categoryall();
    this.typeschange(this._data.d.dT_Type);
    this.bind();
  }

  alphaValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/,/0-9]/;   
    if (control.value && nameRegexp.test(control.value)) {
      return { alphaCheck: true };
    }
  }
  spaceValidator(control: any): { [key: string]: boolean } {      
    if ((control.value as string).indexOf('  ') >= 0 || control.value.startsWith(' ') ||  control.value.endsWith(' ')) {
      return { spaceCheck: true };
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.diagnostictest.controls[controlName].hasError(errorName);
  }

  update() {
    var diagnostictestData:any;
    if(this.diagnostictest.invalid){
      return
    }   
   
    diagnostictestData={
      dT_Id:this._data.d.dT_Id,
      dT_Code:this._data.d.dT_Code,
      dT_Type:this._data.d.dT_Type,
      dT_Category:this._data.d.dT_Category,
      dT_Desc:this.diagnostictest.value.dT_Desc      
    }      
    
    this.service.Put_Diagnostic(diagnostictestData)
      .subscribe((res) => {
        this.notif.successmsg("Diagnostic test updated successfully")
        this.dialogRef.close();
        window.location.reload();  
      })
      
  }

  Get_Diagnostictstdd(){
    this.service.Get_Diagnostic_typedd()
    .subscribe((data)=>{
      this.type=data
    })
  }
 
  typeschange(event){
    this.service.Get_Categorydd(event)
    .subscribe((data)=>{
      this.category=data
    })
  }

  Get_categoryall(){
    this.service.Get_categoryall()
    .subscribe((data)=>{
      this.category=data
    })
  }

  bind(){    
    this.diagnostictest.controls['dT_Id'].setValue(this._data.d.dT_Id);
    this.diagnostictest.controls['dT_Code'].setValue(this._data.d.dT_Code);
    this.diagnostictest.controls['dT_Type'].setValue(this._data.d.dT_Type);
    this.diagnostictest.controls['dT_Category'].setValue(this._data.d.dT_Category);
    this.diagnostictest.controls['dT_Desc'].setValue(this._data.d.dT_Desc);    
    this.diagnostictest.controls['dT_Code'].disable();
    this.diagnostictest.controls['dT_Type'].disable();
    this.diagnostictest.controls['dT_Category'].disable();
  }
}
