import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { TalukService } from '../taluk.service';

@Component({
  selector: 'app-edit-taluk',
  templateUrl: './edit-taluk.component.html',
  styleUrls: ['./edit-taluk.component.scss']
})
export class EditTalukComponent implements OnInit {
  country:any;
  state:any;
  district:any;
  taluk:FormGroup;
  constructor(private dialogRef: MatDialogRef<EditTalukComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb:FormBuilder,private service:TalukService,private notif:Notification) { 
    this.taluk=this.fb.group({
      'taluk_id':[''],
      'cntry_id':[''],
      'state_id':[''],
      'district_id':[''],
      'taluk_code':[''],
      'taluk_name':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
    })
  }
  
  public checkError = (controlName: string, errorName: string) => {
    return this.taluk.controls[controlName].hasError(errorName);
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
  reset(){
    this.taluk.reset();
  }
  ngOnInit(): void {
    this.get_state();
    this.get_district();
    this.get_country();
    this.bind();
    //this.get_state();
  }
  bind(){
    this.taluk.controls['taluk_id'].setValue(this._data.d.taluk_id);
    this.taluk.controls['cntry_id'].setValue(this._data.d.cntry_id);
    this.taluk.controls['state_id'].setValue(this._data.d.state_id);
    this.taluk.controls['district_id'].setValue(this._data.d.district_id);
    this.taluk.controls['taluk_code'].setValue(this._data.d.taluk_code);
    this.taluk.controls['taluk_name'].setValue(this._data.d.taluk_name);

    this.taluk.controls['cntry_id'].disable();
    this.taluk.controls['state_id'].disable();
    this.taluk.controls['district_id'].disable();
    this.taluk.controls['taluk_code'].disable();
  }
  countrychange(event){
       this.service.Get_State(event)
       .subscribe((data)=>{
         this.state=data
       })
  }
  statechange(event){
    this.service.Get_District(event)
    .subscribe((data)=>{
      this.district=data
    })
  }
  updateform(){
    var talukData:any;
    if(this.taluk.invalid){
      return
    }  
    talukData={
      cntry_id:this._data.d.cntry_id,
      state_id:this._data.d.state_id,
      district_id:this._data.d.district_id,
      taluk_id:this._data.d.taluk_id,
      taluk_code:this._data.d.taluk_code,
      taluk_name:this.taluk.value.taluk_name      
    }     
   
    this.service.Put_Taluk(talukData)
    .subscribe((res)=>{
       this.notif.successmsg("Taluk updated successfully")
       this.dialogRef.close();
       window.location.reload(); 
    })
  }
  get_country(){
    this.service.Get_country()
    .subscribe((data)=>{
      this.country=data
    })
  }
  get_state(){
    this.service.Get_state_f()
    .subscribe((data)=>{
      this.state=data
    })
  }
  get_district(){
    this.service.Get_alldistrict()
    .subscribe((data)=>{
      this.district=data
    })
  }
}
