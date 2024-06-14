import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DisciplineService } from '../discipline.service';

@Component({
  selector: 'app-edit-discipline',
  templateUrl: './edit-discipline.component.html',
  styleUrls: ['./edit-discipline.component.scss']
})
export class EditDisciplineComponent implements OnInit {
  discipline:FormGroup;
  constructor(private dialogRef: MatDialogRef<EditDisciplineComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb:FormBuilder,private service:DisciplineService,private notif:Notification) { 
    this.discipline=this.fb.group({
      'cD_Id':[''],
      'cD_ClinicalDiscipline':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
      'cD_Code':[''],
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
    return this.discipline.controls[controlName].hasError(errorName);
  }
  ngOnInit(): void {
    this.bind();
  }
  bind(){
    this.discipline.controls['cD_Id'].setValue(this._data.d.cD_Id)
     this.discipline.controls['cD_ClinicalDiscipline'].setValue(this._data.d.cD_ClinicalDiscipline)
     this.discipline.controls['cD_Code'].setValue(this._data.d.cD_Code)
     this.discipline.controls['cD_Code'].disable();
  }
  updateform(){
    var disciplineData:any;
    if(this.discipline.invalid){
      return
    }  
    disciplineData={
      cD_Id:this._data.d.cD_Id,
      cD_Code:this._data.d.cD_Code,
      cD_ClinicalDiscipline:this.discipline.value.cD_ClinicalDiscipline      
    }    
   
    this.service.Put_discipline(disciplineData)
    .subscribe((res)=>{
       this.notif.successmsg("Discipline updated successfully")
       this.dialogRef.close();
      window.location.reload();     
    })
  }
 
}
