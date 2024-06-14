import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { StateService } from '../../state/state.service';
import { DistrictService } from '../district.service';

@Component({
  selector: 'app-edit-district',
  templateUrl: './edit-district.component.html',
  styleUrls: ['./edit-district.component.scss']
})
export class EditDistrictComponent implements OnInit {
  state: any;
  country: any;
  district: FormGroup;
  constructor(private dialogRef: MatDialogRef<EditDistrictComponent>,@Inject(MAT_DIALOG_DATA) private _data: any, private fb: FormBuilder, private stateservice: StateService, private service: DistrictService, private notif: Notification) {
    this.district = this.fb.group({
      'cntry_id': [''],
      'stat_id': [''],
      'district_id': [''],
      'district_name': ['', [Validators.required,this.alphaValidator,this.spaceValidator]],
      'district_code': [''],
    })
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
  ngOnInit(): void {
    this.get_state();
    this.get_country();
    this.bind();
  }
  bind() {
    this.district.controls['district_id'].setValue(this._data.d.district_id)
    this.district.controls['cntry_id'].setValue(this._data.d.cntry_id)
    this.district.controls['stat_id'].setValue(this._data.d.stat_id)
    this.district.controls['district_name'].setValue(this._data.d.district_name)
    this.district.controls['district_code'].setValue(this._data.d.district_code)

    this.district.controls['cntry_id'].disable();  
    this.district.controls['stat_id'].disable();
    this.district.controls['district_code'].disable();
  }
  updateform() {
    var distData:any;
    if(this.district.invalid){
      return
    }  
    distData={
      cntry_id:this._data.d.cntry_id,
      stat_id:this._data.d.stat_id,
      district_id:this._data.d.district_id,
      district_code:this._data.d.district_code,
      district_name:this.district.value.district_name      
    }      
   
    this.service.Put_district(distData)
      .subscribe((res) => {
        this.notif.successmsg("District updated successfully")
        this.dialogRef.close();
        window.location.reload();  
      })
  }
  get_state() {
    this.stateservice.Get_allState()
      .subscribe((data) => {
        this.state = data
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
