import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-edit-network',
  templateUrl: './edit-network.component.html',
  styleUrls: ['./edit-network.component.scss']
})
export class EditNetworkComponent implements OnInit {
  network:FormGroup;
  constructor(private dialogRef: MatDialogRef<EditNetworkComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb:FormBuilder,private service:NetworkService,private notif:Notification) { 
    this.network=this.fb.group({
      'nE_Id':[''],
      'nE_Description':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
      'nE_Code':[''],
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
    return this.network.controls[controlName].hasError(errorName);
  }
  ngOnInit(): void {
    this.bind();
  }
  bind(){
    this.network.controls['nE_Id'].setValue(this._data.d.nE_Id)
    this.network.controls['nE_Description'].setValue(this._data.d.nE_Description)
    this.network.controls['nE_Code'].setValue(this._data.d.nE_Code)
    this.network.controls['nE_Code'].disable();
  }
  updateform(){

    var networkData:any;
    if(this.network.invalid){
      return
    }  
    networkData={
      nE_Id:this._data.d.nE_Id,
      nE_Code:this._data.d.nE_Code,
      nE_Description:this.network.value.nE_Description      
    }     
   
    this.service.Put_network(networkData)
    .subscribe((res)=>{
       this.notif.successmsg("Network updated successfully")
       this.dialogRef.close();
      window.location.reload();  
    })
  }
 
}
