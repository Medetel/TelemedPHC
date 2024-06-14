import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Notification } from 'src/app/core/Notifications/Notification';
import { environment } from 'src/environments/environment';
import { AssistantService } from '../assistant.service';
@Component({
  selector: 'app-approve-assistant',
  templateUrl: './approve-assistant.component.html',
  styleUrls: ['./approve-assistant.component.scss']
})
export class ApproveAssistantComponent implements OnInit {

  Image_Url ;
  constructor(private dialogRef: MatDialogRef<ApproveAssistantComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private service:AssistantService,private notif:Notification) { }
  assistant = new FormGroup({
    Assi_Id:new FormControl(''),
    Remarks:new FormControl(''),
    Assi_FirstName:new FormControl(''),
    Assi_LastName:new FormControl(''),
    Assi_code:new FormControl(''),
    Assi_Gender:new FormControl(''),
    Assi_MobileNumber:new FormControl(''),
    Assi_Address:new FormControl(''),
    Assi_Hos_Id_FK:new FormControl(''),
    Assi_Qua_Id_FK:new FormControl(''),
    Assi_Des_Id_FK:new FormControl(''),
    Assi_Skill_Desc:new FormControl(''), 
  })
  ngOnInit(): void {
    this.disable();
    this.bind();
    // this.Image_Url= { url: `${environment.API_Base_URL}` +`Assistant/GetAssistant_Images?filename=${this._data.d.assi_Photo}`  }
  }
bind(){
  const ass_DOB = new DatePipe('en-US').transform(this._data.d.assi_DOB ,'dd/MM/yyyy')
  this.assistant.controls['Assi_FirstName'].setValue(this._data.d.assi_FirstName);
  this.assistant.controls['Assi_LastName'].setValue(this._data.d.assi_LastName);
  this.assistant.controls['Assi_code'].setValue(this._data.d.assi_code);
  this.assistant.controls['Assi_Gender'].setValue(this._data.d.assi_Gender);
  this.assistant.controls['Assi_MobileNumber'].setValue(this._data.d.assi_MobileNumber);
  this.assistant.controls['Assi_Address'].setValue(this._data.d.assi_Address);
  this.assistant.controls['Assi_Hos_Id_FK'].setValue(this._data.d.assi_Hos_HospitalName);
  this.assistant.controls['Assi_Qua_Id_FK'].setValue(this._data.d.assi_qualification);
  this.assistant.controls['Assi_Des_Id_FK'].setValue(this._data.d.assi_Designation);
  this.assistant.controls['Assi_Skill_Desc'].setValue(this._data.d.assi_Skill_Desc);
  this.assistant.controls['Assi_Id'].setValue(this._data.d.assi_Id);
  
}
disable(){
  this.assistant.controls['Assi_FirstName'].disable();
  this.assistant.controls['Assi_LastName'].disable();
  this.assistant.controls['Assi_code'].disable();
  this.assistant.controls['Assi_Gender'].disable();
  this.assistant.controls['Assi_MobileNumber'].disable();
  this.assistant.controls['Assi_Address'].disable();
  this.assistant.controls['Assi_Hos_Id_FK'].disable();
  this.assistant.controls['Assi_Qua_Id_FK'].disable();
  this.assistant.controls['Assi_Des_Id_FK'].disable();
  this.assistant.controls['Assi_Skill_Desc'].disable();
 
}
approveform(){
  this.service.Put_Approval(this.assistant.value)
  .subscribe((res)=>{
    this.notif.successmsg("assistant Approved Successfully")
    this.dialogRef.close();
    window.location.reload(); 
  })
  
}

}
