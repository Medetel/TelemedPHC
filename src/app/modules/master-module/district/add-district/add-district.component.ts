import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { StateService } from '../../state/state.service';
import { DistrictService } from '../district.service';

@Component({
  selector: 'app-add-district',
  templateUrl: './add-district.component.html',
  styleUrls: ['./add-district.component.scss']
})
export class AddDistrictComponent implements OnInit {
  state: any;
  country: any;
  district: FormGroup;
  constructor(private fb: FormBuilder,private router: Router, private stateservice: StateService, private service: DistrictService, private notif: Notification) {
    this.district = this.fb.group({
      'cntry_id': [''],
      'stat_id': [''],
      'district_name': ['', [Validators.required,this.alphaValidator,this.spaceValidator]],
      'district_code': ['DIST', [Validators.required, Validators.pattern("^DIST[0-9]+$"), this.codeValidator]],
    })
  }
  codeValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/, ''/]/;    
  
    if (control.value && nameRegexp.test(control.value)) {
      return { alphaNumCheck: true };
    }
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.district.controls[controlName].hasError(errorName);
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
  reset() {
    this.district.reset();
  }
  ngOnInit(): void {
    this.get_country();
  }
  save() {
    if(this.district.invalid){
      return
    } 
    this.service.Post_district(this.district.value)
      .subscribe((res) => {
        this.notif.successmsg("District added successfully")
        this.router.navigate(['/base/master/district']);
      })
  }
  get_country() {
    this.service.Get_country()
      .subscribe((data) => {
        this.country = data
      })
  }
  countrychange(event) {
    this.service.Get_State(event)
      .subscribe((data) => {
        this.state = data
       
      })
  }
}
