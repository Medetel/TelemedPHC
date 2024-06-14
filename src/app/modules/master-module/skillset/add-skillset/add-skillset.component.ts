import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { QualificationService } from '../../qualification/qualification.service';
import { SkillsetService } from '../skillset.service';

@Component({
  selector: 'app-add-skillset',
  templateUrl: './add-skillset.component.html',
  styleUrls: ['./add-skillset.component.scss']
})
export class AddSkillsetComponent implements OnInit {
  qualification:any;
  skillset:FormGroup;
  constructor(private fb:FormBuilder,private router: Router, private qualiservice:QualificationService,private service:SkillsetService,private notif:Notification) { 
    this.skillset=this.fb.group({
      'qualification_id':[''],
      'skillset_name':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
    })
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.skillset.controls[controlName].hasError(errorName);
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
    this.skillset.reset();
  }
  ngOnInit(): void {
    this.get_qualification();
  }
  save(){
    if(this.skillset.invalid){
      return
    } 
    this.service.Post_skillset(this.skillset.value)
    .subscribe((res)=>{
       this.notif.successmsg("Skillset added successfully")
       this.router.navigate(['/base/master/skillset']);

    })
  }
  get_qualification(){
    this.qualiservice.Get_qualification_skillset_dd()
    .subscribe((data)=>{
      this.qualification=data
    })
  }
}
