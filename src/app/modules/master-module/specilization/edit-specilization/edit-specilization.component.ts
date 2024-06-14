import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DisciplineService } from '../../discipline/discipline.service';
import { SpecilizationService } from '../specilization.service';

@Component({
  selector: 'app-edit-specilization',
  templateUrl: './edit-specilization.component.html',
  styleUrls: ['./edit-specilization.component.scss']
})
export class EditSpecilizationComponent implements OnInit {
  discipline:any;
  specilization:FormGroup;
  constructor(private dialogRef: MatDialogRef<EditSpecilizationComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb:FormBuilder,private disciplineservice:DisciplineService,private service:SpecilizationService,private notif:Notification) { 
    this.specilization=this.fb.group({
      'sP_Id':[''],
      'sP_CD_Id':[''],
      'sP_Specialization':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
      'sP_Code':[''],
    })
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
    return this.specilization.controls[controlName].hasError(errorName);
  }
  ngOnInit(): void {
    this.bind();
    this.Get_specilizationdd();
  }
  bind(){
    this.specilization.controls['sP_Id'].setValue(this._data.d.sP_Id);
    this.specilization.controls['sP_CD_Id'].setValue(this._data.d.sP_CD_Id);
    this.specilization.controls['sP_Specialization'].setValue(this._data.d.sP_Specialization);
    this.specilization.controls['sP_Code'].setValue(this._data.d.sP_Code);
    this.specilization.controls['sP_Code'].disable();
    this.specilization.controls['sP_CD_Id'].disable();
  }
  updateform(){
    var specializationData:any;
    if(this.specilization.invalid){
      return
    }  
    specializationData={
      sP_Id:this._data.d.sP_Id,
      sP_CD_Id:this._data.d.sP_CD_Id,
      sP_Code:this._data.d.sP_Code,
      sP_Specialization:this.specilization.value.sP_Specialization      
    }  
   
    this.service.Put_specilization(specializationData)
    .subscribe((res)=>{
       this.notif.successmsg("Specialization updated successfully")
       this.dialogRef.close();
       window.location.reload(); 
    })
  }
  specilizationdd: any;
  Get_specilizationdd(){
    this.service.Get_specilizationdd()
    .subscribe((data)=>{
      this.specilizationdd=data
    })
  }
}
