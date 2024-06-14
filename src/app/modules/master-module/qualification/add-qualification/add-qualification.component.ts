import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { QualificationService } from '../qualification.service';

@Component({
  selector: 'app-add-qualification',
  templateUrl: './add-qualification.component.html',
  styleUrls: ['./add-qualification.component.scss']
})
export class AddQualificationComponent implements OnInit {
  qualification:FormGroup;
  constructor(private fb:FormBuilder, private router: Router, private service:QualificationService,private notif:Notification) { 
    this.qualification=this.fb.group({
      'qualification_Name':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
      'qualification_code': ['QUA', [Validators.required, Validators.pattern("^QUA[0-9]+$"), this.codeValidator]],
    })
  }
  codeValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/, ''/]/;    
  
    if (control.value && nameRegexp.test(control.value)) {
      return { alphaNumCheck: true };
    }
  }
  alphaValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?0-9]/;   
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
    return this.qualification.controls[controlName].hasError(errorName);
  }
  reset(){
    this.qualification.reset();
  }
  ngOnInit(): void {
  }
  save(){
    if(this.qualification.invalid){
      return
    }  
    this.service.Post_qualification(this.qualification.value)
    .subscribe((res)=>{
       this.notif.successmsg("Qualification added successfully")
       this.router.navigate(['/base/master/qualification']);
    })
  }
}
