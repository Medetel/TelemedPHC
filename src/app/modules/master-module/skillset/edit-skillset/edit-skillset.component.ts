import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { QualificationService } from '../../qualification/qualification.service';
import { SkillsetService } from '../skillset.service';

@Component({
  selector: 'app-edit-skillset',
  templateUrl: './edit-skillset.component.html',
  styleUrls: ['./edit-skillset.component.scss']
})
export class EditSkillsetComponent implements OnInit {
  qualification:any;
  skillset:FormGroup;
  constructor(private dialogRef: MatDialogRef<EditSkillsetComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb:FormBuilder,private qualiservice:QualificationService,private service:SkillsetService,private notif:Notification) { 
    this.skillset=this.fb.group({
      'skillset_id':[''],
      'qualification_id':[''],
      'skillset_name':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
    })
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.skillset.controls[controlName].hasError(errorName);
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
  ngOnInit(): void {
    this.bind();
    this.get_qualification();
  }
  bind(){
    this.skillset.controls['skillset_id'].setValue(this._data.d.skillset_id);
    this.skillset.controls['qualification_id'].setValue(this._data.d.qualification_id)
    this.skillset.controls['skillset_name'].setValue(this._data.d.skillset_name)
    this.skillset.controls['qualification_id'].disable();
  }
  updateform(){
    var skillsetData:any;
    if(this.skillset.invalid){
      return
    }  
    skillsetData={
      qualification_id:this._data.d.qualification_id,
      skillset_id:this._data.d.skillset_id,      
      skillset_name:this.skillset.value.skillset_name      
    } 
        
    this.service.Put_skillset(skillsetData)
    .subscribe((res)=>{
       this.notif.successmsg("Skillset updated successfully")
       this.dialogRef.close();
      window.location.reload();
    })
  }
  get_qualification(){
    this.qualiservice.Get_qualification()
    .subscribe((data)=>{
      this.qualification=data
    })
  }
}
