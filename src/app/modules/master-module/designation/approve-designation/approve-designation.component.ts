import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DesignationService } from '../designation.service';

@Component({
  selector: 'app-approve-designation',
  templateUrl: './approve-designation.component.html',
  styleUrls: ['./approve-designation.component.scss']
})
export class ApproveDesignationComponent implements OnInit {

  designation:FormGroup;
  constructor(private dialogRef: MatDialogRef<ApproveDesignationComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder,private service:DesignationService,private notif:Notification) { 
    this.designation=this.fb.group({
      'designation_desc':[this._data.d.designation_desc],
      'designation_code':[this._data.d.designation_code],
      'designation_id':[''],
      'Remarks':['']
    })
  }

  ngOnInit(): void {
    this.disable();
    this.bind();
  }
  disable(){
    this.designation.controls['designation_desc'].disable();
    this.designation.controls['designation_code'].disable();
  }
  bind(){
    this.designation.controls['designation_id'].setValue(this._data.d.designation_id)
  }

  approveform(){
    this.service.Put_Approval(this.designation.value)
    .subscribe((res)=>{
      this.notif.successmsg("Designation approved successfully")
      this.dialogRef.close();
      window.location.reload(); 
    })
   
  }

}
