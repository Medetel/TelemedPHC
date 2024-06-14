import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { CountryService } from '../../country/country.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-edit-state',
  templateUrl: './edit-state.component.html',
  styleUrls: ['./edit-state.component.scss']
})
export class EditStateComponent implements OnInit {
  country:any;
  state:FormGroup;
  constructor(private dialogRef: MatDialogRef<EditStateComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb:FormBuilder,private countryservice:CountryService,private service:StateService,private notif:Notification) { 
    this.state=this.fb.group({
      'stat_id':[''],
      'cntry_id':[''],
      'state_name':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
      'state_code':[''],
    })
  }
 
  public checkError = (controlName: string, errorName: string) => {
    return this.state.controls[controlName].hasError(errorName);
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
    this.get_country();
  }
  bind(){
    this.state.controls['stat_id'].setValue(this._data.d.stat_id);
    this.state.controls['cntry_id'].setValue(this._data.d.cntry_id);
    this.state.controls['state_name'].setValue(this._data.d.state_name);
    this.state.controls['state_code'].setValue(this._data.d.state_code);    
    this.state.controls['cntry_id'].disable();    
    this.state.controls['state_code'].disable();
  }
  updateform(){
    var stateData:any;
    if(this.state.invalid){
      return
    }  
    stateData={
      cntry_id:this._data.d.cntry_id,
      stat_id:this._data.d.stat_id,
      state_code:this._data.d.state_code,
      state_name:this.state.value.state_name      
    }     
    
    this.service.Put_state(stateData)
    .subscribe((res)=>{
       this.notif.successmsg("State updated successfully")
       this.dialogRef.close();
       window.location.reload();  
    })
  }
  get_country(){
    this.countryservice.Get_country()
    .subscribe((data)=>{
      this.country=data
    })
  }
}
