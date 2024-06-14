import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { GramService } from '../gram.service';

@Component({
  selector: 'app-edit-gram',
  templateUrl: './edit-gram.component.html',
  styleUrls: ['./edit-gram.component.scss']
})
export class EditGramComponent implements OnInit {

  country:any;
  state:any;
  district:any;
  taluk:any;
  gram:FormGroup;
  constructor(private dialogRef: MatDialogRef<EditGramComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb:FormBuilder,private service:GramService,private notif:Notification) { 
    this.gram=this.fb.group({
      'gram_id':[''],
      'cntry_id':[''],
      'state_id':[''],
      'dist_id':[''],
      'taluk_id':[''],
      'gram_code':[''],
      'gram_name':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
      'postal_Code':['',[Validators.required,this.postalcodeValidator]]
    })
  }
  codeValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/, ''/]/;    
  
    if (control.value && nameRegexp.test(control.value)) {
      return { alphaNumCheck: true };
    }
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

  postalcodeValidator(control: any): { [key: string]: boolean } {
    const postalRegexp: RegExp = /^\d{6}$/;   
    if (control.value && postalRegexp.test(control.value)==false) {
      return { postalCheck: true };
    }
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.gram.controls[controlName].hasError(errorName);
  }
  reset(){
    this.gram.reset();
  }
  ngOnInit(): void {
    this.get_country();
    this.get_state();
    this.get_district();   
    this.get_taluk();
    this.bind();
  }
  bind(){
    this.gram.controls['gram_id'].setValue(this._data.d.gram_id);
    this.gram.controls['cntry_id'].setValue(this._data.d.cntry_id);
    this.gram.controls['state_id'].setValue(this._data.d.state_id);
    this.gram.controls['dist_id'].setValue(this._data.d.dist_id);
    this.gram.controls['taluk_id'].setValue(this._data.d.taluk_id);
    this.gram.controls['gram_code'].setValue(this._data.d.gram_code);
    this.gram.controls['gram_name'].setValue(this._data.d.gram_name);
    this.gram.controls['postal_Code'].setValue(this._data.d.postal_Code);    
      
    this.gram.controls['cntry_id'].disable();
    this.gram.controls['state_id'].disable();
    this.gram.controls['dist_id'].disable();
    this.gram.controls['taluk_id'].disable();
    this.gram.controls['gram_code'].disable();
    
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
  get_taluk(){
    this.service.Get_allTaluk()
    .subscribe((data)=>{
      this.taluk=data
    })
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
  distritchange(event){
     this.service.Get_Taluk(event)
     .subscribe((data)=>{
      this.taluk=data
     })
  }
  updateform(){
    var gramData:any;
    if(this.gram.invalid){
      return
    }
      
    gramData={
      gram_id:this._data.d.gram_id,
      cntry_id:this._data.d.cntry_id,
      state_id:this._data.d.state_id,
      dist_id:this._data.d.dist_id,
      taluk_id:this._data.d.taluk_id,
      gram_code:this._data.d.gram_code,
      gram_name:this.gram.value.gram_name,  
      postal_Code:this.gram.value.postal_Code
    }         
    
    this.service.Put_Gram(gramData)
    .subscribe((res)=>{
       this.notif.successmsg("Gram updated successfully")
       this.dialogRef.close();
      window.location.reload(); 
    })
  }

}
