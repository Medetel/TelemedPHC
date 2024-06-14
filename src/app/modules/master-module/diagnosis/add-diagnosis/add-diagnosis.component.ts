import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DiagnosisService } from '../diagnosis.service';

@Component({
  selector: 'app-add-diagnosis',
  templateUrl: './add-diagnosis.component.html',
  styleUrls: ['./add-diagnosis.component.scss']
})
export class AddDiagnosisComponent implements OnInit {
  diagnosis: FormGroup;
  diagnosisdd: any;
  constructor(private fb: FormBuilder, private router: Router, private service: DiagnosisService, private notif: Notification) {
    this.diagnosis = this.fb.group({
      'dD_Master': [''],
      'dD_Desc': ['', [Validators.required, this.alphaValidator, this.spaceValidator]],
      'dD_Code': ['DIAG', [Validators.required, Validators.pattern("^DIAG[0-9]+$"), this.codeValidator]],
    })
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.diagnosis.controls[controlName].hasError(errorName);
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
    if ((control.value as string).indexOf('  ') >= 0 || control.value.startsWith(' ') || control.value.endsWith(' ')) {
      return { spaceCheck: true };
    }
  }
  reset() {
    this.diagnosis.reset();
  }
  ngOnInit(): void {
    this.Get_diagnosis_Catdd();
  }
  Get_diagnosis_Catdd() {
    this.service.Get_diagnosis_Catdd()
      .subscribe((data) => {
        this.diagnosisdd = data
      })
  }
  save() {
    if (this.diagnosis.invalid) {
      return
    }
    this.service.Post_diagnosis(this.diagnosis.value)
      .subscribe((res) => {
        this.notif.successmsg("Diagnosis added successfully")
        this.router.navigate(['/base/master/diagnosis']);
      })
  }

}
