import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DisciplineService } from '../../discipline/discipline.service';
import { SpecilizationService } from '../specilization.service';

@Component({
  selector: 'app-add-specilization',
  templateUrl: './add-specilization.component.html',
  styleUrls: ['./add-specilization.component.scss']
})
export class AddSpecilizationComponent implements OnInit {
  discipline: any;
  specializationdd: any;
  specilization: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private disciplineservice: DisciplineService, private service: SpecilizationService, private notif: Notification) {
    this.specilization = this.fb.group({
      'sP_CD_Id': [''],
      'sP_Specialization': ['', [Validators.required,this.alphaValidator,this.spaceValidator]],
      'sP_Code': ['SPE', [Validators.required, Validators.pattern("^SPE[0-9]+$"), this.codeValidator]],
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
    return this.specilization.controls[controlName].hasError(errorName);
  }
  reset() {
    this.specilization.reset();
  }
  ngOnInit(): void {
    this.Get_specilizationdd();
  }
  Get_specilizationdd() {
    this.service.Get_specilizationdd()
      .subscribe((data) => {
        this.specializationdd = data
      })
  }
  save() {
    if(this.specilization.invalid){
      return
    }  
    this.service.Post_specilization(this.specilization.value)
      .subscribe((res) => {
        this.notif.successmsg("Specialization added successfully")
        this.router.navigate(['/base/master/specilization']);
      })
  }
  get_discipline() {
    this.disciplineservice. Get_approvedDiscipline()
      .subscribe((data) => {
        this.discipline = data
      })
  }
}
