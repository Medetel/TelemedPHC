import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { GramService } from '../gram.service';

@Component({
  selector: 'app-add-gram',
  templateUrl: './add-gram.component.html',
  styleUrls: ['./add-gram.component.scss']
})
export class AddGramComponent implements OnInit {

  country:any;
  state:any;
  district:any;
  taluk:any;
  gram:FormGroup;
  constructor(private fb:FormBuilder,private router: Router,private service:GramService,private notif:Notification) { 
    this.gram=this.fb.group({
      'cntry_id':[''],
      'state_id':[''],
      'dist_id':[''],
      'taluk_id':[''],
      'gram_code': ['GRA', [Validators.required, Validators.pattern("^GRA[0-9]+$"), this.codeValidator]],
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
  }
  get_country(){
    this.service.Get_country()
    .subscribe((data)=>{
      this.country=data
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
  save(){
    if(this.gram.invalid){
      return
    } 
    // console.log('gram data:'+ this.gram.value)
    // console.log('gram data :' +JSON.stringify(this.gram.value))
    this.service.Post_Gram(this.gram.value)
    .subscribe((res)=>{
       this.notif.successmsg("Gram added successfully");
       this.router.navigate(['/base/master/gram']);
    })
  }
}
