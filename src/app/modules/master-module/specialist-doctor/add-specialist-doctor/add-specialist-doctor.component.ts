import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DisciplineService } from '../../discipline/discipline.service';
import { SpecialistDoctorService } from '../specialist-doctor.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-add-specialist-doctor',
  templateUrl: './add-specialist-doctor.component.html',
  styleUrls: ['./add-specialist-doctor.component.scss']
})
export class AddSpecialistDoctorComponent implements OnInit {
  specialistdoc: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private service: SpecialistDoctorService, private notif: Notification) {
    this.specialistdoc = this.fb.group({
      'sD_ClinicalSpecilist': ['', [Validators.required, this.alphaValidator, this.spaceValidator]],
      'sD_Code': ['SPDR', [Validators.required, Validators.pattern("^SPDR[0-9]+$"), this.codeValidator]],
    })
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.specialistdoc.controls[controlName].hasError(errorName);
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
    this.specialistdoc.reset();
  }
  ngOnInit(): void {
  }
  save() {
    if (this.specialistdoc.invalid) {
      return
    }
    this.service.Post_specialistdoc(this.specialistdoc.value)
      .subscribe((res) => {
        this.notif.successmsg("Specialist Doctor added successfully")
        this.router.navigate(['/base/master/specialist-doctor']);
      })
  }

}
