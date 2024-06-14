import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { SkillsetService } from '../skillset.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-approve-skills',
  templateUrl: './approve-skills.component.html',
  styleUrls: ['./approve-skills.component.scss']
})
export class ApproveSkillsComponent implements OnInit {

  skillset:FormGroup;
  constructor(private dialogRef: MatDialogRef<ApproveSkillsComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder,private service:SkillsetService,private notif:Notification) { 
    this.skillset=this.fb.group({
      'qualification_Name':[this._data.d.qualification_Name],
      'skillset_name':[this._data.d.skillset_name],
      'skillset_id':[''],
      'Remarks':['']
    })
  }

  ngOnInit(): void {
    this.disable();
    this.bind();
  }
  disable(){
    this.skillset.controls['qualification_Name'].disable();
    this.skillset.controls['skillset_name'].disable();
  }
  bind(){
    this.skillset.controls['skillset_id'].setValue(this._data.d.skillset_id);
  }

  approveform(){
    this.service.Put_Approval(this.skillset.value)
    .subscribe((res)=>{
      this.notif.successmsg("Skillset approved successfully")
      this.dialogRef.close();
      window.location.reload(); 
    })
   
  }
}
