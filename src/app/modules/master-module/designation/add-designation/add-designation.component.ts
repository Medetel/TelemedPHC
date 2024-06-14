import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DesignationService } from '../designation.service';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.scss']
})
export class AddDesignationComponent implements OnInit {
  designation:FormGroup;
  constructor(private fb:FormBuilder,private router: Router, private service:DesignationService,private notif:Notification) { 
    this.designation=this.fb.group({
      'designation_desc':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
      'designation_code': ['DES', [Validators.required, Validators.pattern("^DES[0-9]+$"), this.codeValidator]],
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
  public checkError = (controlName: string, errorName: string) => {
    return this.designation.controls[controlName].hasError(errorName);
  }
  reset(){
    this.designation.reset();
  }
  ngOnInit(): void {
  }
  save(){
    if(this.designation.invalid){
      return
    } 
    this.service.Post_designation(this.designation.value)
    .subscribe((res)=>{
       this.notif.successmsg("Designation added successfully")
       this.router.navigate(['/base/master/designation']);

    })
  }
}
