import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { TalukService } from '../taluk.service';

@Component({
  selector: 'app-add-taluk',
  templateUrl: './add-taluk.component.html',
  styleUrls: ['./add-taluk.component.scss']
})
export class AddTalukComponent implements OnInit {
  country:any;
  state:any;
  district:any;
  taluk:FormGroup;
  constructor(private fb:FormBuilder,private router: Router,private service:TalukService,private notif:Notification) { 
    this.taluk=this.fb.group({
      'cntry_id':[''],
      'state_id':[''],
      'district_id':[''],
      'taluk_code': ['TAL', [Validators.required, Validators.pattern("^TAL[0-9]+$"), this.codeValidator]],
      'taluk_name':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
    })
  }
  codeValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/, ''/]/;    
  
    if (control.value && nameRegexp.test(control.value)) {
      return { alphaNumCheck: true };
    }
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
    this.get_country();
    //this.get_state();
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
  save(){
    if(this.taluk.invalid){
      return
    } 
    this.service.Post_Taluk(this.taluk.value)
    .subscribe((res)=>{
       this.notif.successmsg("Taluk added successfully")
       this.router.navigate(['/base/master/taluk']);
    })
  }
  get_country(){
    this.service.Get_country()
    .subscribe((data)=>{
      this.country=data
    })
  }
}
