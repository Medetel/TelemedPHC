import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators,FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Notification } from 'src/app/core/Notifications/Notification';
import { CountryService } from '../country.service';
import { Router } from '@angular/router';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid);
  }
}
@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {
  
  country:FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(private fb:FormBuilder, private router: Router,private service:CountryService,private notif:Notification) { 
    this.country=this.fb.group({
      'country_name':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
      'country_code': ['COU', [Validators.required, Validators.pattern("^COU[0-9]+$"), this.codeValidator]]
    })
  }
  // codeValidator(control: any): { [key: string]: boolean } {
  //   const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/, ''/]/;    
  
  //   if (control.value && nameRegexp.test(control.value)) {
  //     return { alphaNumCheck: true };
  //   }
  // }
  codeValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/, ''/]/;

    if (control.value && nameRegexp.test(control.value)) {
      return { alphaNumCheck: true };
    }
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.country.controls[controlName].hasError(errorName);
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
    this.country.reset();
  }
  ngOnInit(): void {
  }
save(){
  if(this.country.invalid){
    return
  }  
  this.service.Post_country(this.country.value)
  .subscribe((res)=>{
    this.notif.successmsg("Country added successfully")
    this.router.navigate(['/base/master/country']);
  })
}
}
