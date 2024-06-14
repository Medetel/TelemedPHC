import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DiagnostictestService } from '../diagnostictest.service';

@Component({
  selector: 'app-add-diagnostictest',
  templateUrl: './add-diagnostictest.component.html',
  styleUrls: ['./add-diagnostictest.component.scss']
})
export class AddDiagnostictestComponent implements OnInit {
  diagnostictest:FormGroup;
  type: any;
  category: any;
  constructor(public service: DiagnostictestService, private router: Router, private notif: Notification,public fb:FormBuilder) { 
    this.diagnostictest=this.fb.group({
      'dT_Code': ['DIA', [Validators.required, Validators.pattern("^DIA[0-9]+$"), this.codeValidator]],
      'dT_Type':[''],
      'dT_Category':[''],
      'dT_Desc':['',[Validators.required,this.spaceValidator]],
      })
  }

   ngOnInit(): void {
     this.Get_Diagnostictstdd();
  }
 
  codeValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/, ''/]/;    
  
    if (control.value && nameRegexp.test(control.value)) {
      return { alphaNumCheck: true };
    }
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.diagnostictest.controls[controlName].hasError(errorName);
  }
  spaceValidator(control: any): { [key: string]: boolean } {      
    if ((control.value as string).indexOf('  ') >= 0 || control.value.startsWith(' ') ||  control.value.endsWith(' ')) {
      return { spaceCheck: true };
    }
  }

  save() {
    if(this.diagnostictest.invalid){
      return
    }  
    this.service.Post_Diagnostictst(this.diagnostictest.value)
      .subscribe((res) => {
        this.notif.successmsg("Diagnostic test added successfully")
        this.router.navigate(['/base/master/diagnostic-test']);
      })
      
  }

  Get_Diagnostictstdd(){
    this.service.Get_Diagnostic_typedd()
    .subscribe((data)=>{
      this.type=data
    })
  }
 
  typeschange(event){
    this.category=undefined
    this.service.Get_Categorydd(event)
    .subscribe((data)=>{
      this.category=data
    })
   
  }

}

