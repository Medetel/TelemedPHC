import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { QualificationService } from '../qualification.service';

@Component({
  selector: 'app-edit-qualification',
  templateUrl: './edit-qualification.component.html',
  styleUrls: ['./edit-qualification.component.scss']
})
export class EditQualificationComponent implements OnInit {
  qualification:FormGroup;
  constructor(private dialogRef: MatDialogRef<EditQualificationComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb:FormBuilder,private service:QualificationService,private notif:Notification) { 
    this.qualification=this.fb.group({
      'qualification_id':[''],
      'qualification_Name':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
      'qualification_code':[''],
    })
  }
 
  alphaValidator(control: any): { [key: string]: boolean } {    
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?0-9]/;
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
    return this.qualification.controls[controlName].hasError(errorName);
  }
  ngOnInit(): void {
    this.bind();
  }
  bind(){
    this.qualification.controls['qualification_id'].setValue(this._data.d.qualification_id)
     this.qualification.controls['qualification_Name'].setValue(this._data.d.qualification_Name)
     this.qualification.controls['qualification_code'].setValue(this._data.d.qualification_code)
     this.qualification.controls['qualification_code'].disable();
  }
  updateform(){
    var qualificationyData:any;
    if(this.qualification.invalid){
      return
    }  
    qualificationyData={
      qualification_id:this._data.d.qualification_id,
      qualification_code:this._data.d.qualification_code,
      qualification_Name:this.qualification.value.qualification_Name      
    } 
    
   
    this.service.Put_qualification(qualificationyData)
    .subscribe((res)=>{
       this.notif.successmsg("Qualification updated successfully")
       this.dialogRef.close();
       window.location.reload(); 
    })
  }
 
}
