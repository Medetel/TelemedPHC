import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { CountryService } from '../../country/country.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.scss']
})
export class AddStateComponent implements OnInit {
  country:any;
  state:FormGroup;
  constructor(private fb:FormBuilder,private router: Router,private countryservice:CountryService,private service:StateService,private notif:Notification) { 
    this.state=this.fb.group({
      'cntry_id':[''],
      'state_name':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
      'state_code': ['STA', [Validators.required, Validators.pattern("^STA[0-9]+$"), this.codeValidator]],
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
  reset(){
    this.state.reset();
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.state.controls[controlName].hasError(errorName);
  }
  ngOnInit(): void {
    this.get_country();
  }
  save(){
    if(this.state.invalid){
      return
    }  
    this.service.Post_state(this.state.value)
    .subscribe((res)=>{
       this.notif.successmsg("State added successfully")
       this.router.navigate(['/base/master/state']);
    })
  }
  get_country(){
    this.service.Get_country()
    .subscribe((data)=>{
      this.country=data
    })
  }
}
