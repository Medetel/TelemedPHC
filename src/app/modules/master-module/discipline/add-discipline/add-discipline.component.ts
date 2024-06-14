import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DisciplineService } from '../discipline.service';

@Component({
  selector: 'app-add-discipline',
  templateUrl: './add-discipline.component.html',
  styleUrls: ['./add-discipline.component.scss']
})
export class AddDisciplineComponent implements OnInit {
  discipline:FormGroup;
  constructor(private fb:FormBuilder,private router: Router,private service:DisciplineService,private notif:Notification) { 
    this.discipline=this.fb.group({
      'cD_ClinicalDiscipline':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
      'cD_Code': ['DEP', [Validators.required, Validators.pattern("^DEP[0-9]+$"), this.codeValidator]],
    })
  }
  
  public checkError = (controlName: string, errorName: string) => {
    return this.discipline.controls[controlName].hasError(errorName);
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
  reset(){
    this.discipline.reset();
  }
  ngOnInit(): void {
  }
  save(){
    if(this.discipline.invalid){
      return
    } 
    this.service.Post_discipline(this.discipline.value)
    .subscribe((res)=>{
       this.notif.successmsg("Discipline added successfully")
       this.router.navigate(['/base/master/discipline']);
    })
  }
}
