import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DesignationService } from '../designation.service';

@Component({
  selector: 'app-edit-designation',
  templateUrl: './edit-designation.component.html',
  styleUrls: ['./edit-designation.component.scss']
})
export class EditDesignationComponent implements OnInit {
  designation:FormGroup;
  constructor(private dialogRef: MatDialogRef<EditDesignationComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb:FormBuilder,private service:DesignationService,private notif:Notification) { 
    this.designation=this.fb.group({
      'designation_id':[''],
      'designation_desc':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
      'designation_code':[''],
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
    return this.designation.controls[controlName].hasError(errorName);
  }
  ngOnInit(): void {
    this.bind();
  }
  bind(){
    this.designation.controls['designation_id'].setValue(this._data.d.designation_id)
     this.designation.controls['designation_desc'].setValue(this._data.d.designation_desc)
     this.designation.controls['designation_code'].setValue(this._data.d.designation_code)
     this.designation.controls['designation_code'].disable();
  }
  updateform(){    
    var designationData:any;
    if(this.designation.invalid){
      return
    }  
    designationData={
      designation_id:this._data.d.designation_id,
      designation_code:this._data.d.designation_code,
      designation_desc:this.designation.value.designation_desc      
    }    
   
    this.service.Put_designation(designationData)
    .subscribe((res)=>{
       this.notif.successmsg("Qualification updated successfully")
       this.dialogRef.close();
       window.location.reload();
    })
  }
 
}
