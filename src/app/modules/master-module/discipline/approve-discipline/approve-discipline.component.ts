import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DisciplineService } from '../discipline.service';


@Component({
  selector: 'app-approve-discipline',
  templateUrl: './approve-discipline.component.html',
  styleUrls: ['./approve-discipline.component.scss']
})
export class ApproveDisciplineComponent implements OnInit {

  discipline:FormGroup;
  constructor(private dialogRef: MatDialogRef<ApproveDisciplineComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder,private service:DisciplineService,private notif:Notification) { 
    this.discipline=this.fb.group({
      'cD_ClinicalDiscipline':[this._data.d.cD_ClinicalDiscipline],
      'cD_Code':[this._data.d.cD_Code],
      'cD_Id':[''],
      'Remarks':[''],
    })
  }

  ngOnInit(): void {
    this.disable();
    this.bind();
  }
  disable(){
    this.discipline.controls['cD_ClinicalDiscipline'].disable();
    this.discipline.controls['cD_Code'].disable();
  }
  bind(){
    this.discipline.controls['cD_Id'].setValue(this._data.d.cD_Id)
  }
  approveform(){
    this.service.Put_Approval(this.discipline.value)
    .subscribe((res)=>{
      this.notif.successmsg("discipline Approved Successfully")
      this.dialogRef.close();
      window.location.reload(); 
    })
   
  }

}