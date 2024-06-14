import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { EditStateComponent } from '../../state/edit-state/edit-state.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { ServicechargeService } from '../../servicecharges/servicecharge.service';
import { json } from 'd3';

@Component({
  selector: 'app-editservicecharge',
  templateUrl: './editservicecharge.component.html',
  styleUrls: ['./editservicecharge.component.scss']
})
export class EditservicechargeComponent implements OnInit {
  services:any;
  servicecharge:FormGroup;
  servicedata_dd: any;
  testpack: any;
  testselected: any;

  constructor(private dialogRef: MatDialogRef<EditStateComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb:FormBuilder,private service:ServicechargeService,private notif:Notification) { 
    this.servicecharge=this.fb.group({      
      'service_name':[''],
      'service_code':[''],
      'service_charge': ['', [Validators.required, this.servicechargeValidator]],
      'package_desc': [''],
      'test_desc': [''],
    })
  }
  ngOnInit(): void {
    this.bind();
    this.getservice_dd();
    this.GetAllTestPackages_PHC();
    const service_nameControl = this.servicecharge.get('service_name');
    service_nameControl.valueChanges.subscribe(serviceName => {
      if (serviceName === 5) {
        this.servicecharge.get('package_desc').setValidators([Validators.required, this.alphaValidator, this.spaceValidator]);
        this.servicecharge.get('test_desc').setValidators([Validators.required]);
      } else {
        this.servicecharge.get('package_desc').clearValidators();
        this.servicecharge.get('test_desc').clearValidators();
      }

      this.servicecharge.get('package_desc').updateValueAndValidity();
      this.servicecharge.get('test_desc').updateValueAndValidity();
    });

    this.testselected = this.servicecharge.value.test_desc
  }

  public objectComparisonFunctiontests = function (option, value): boolean {
    return option.test_id === value.test_id;
  }

  alphaValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?/\//0-9]/;
    if (control.value && nameRegexp.test(control.value)) {
      return { alphaCheck: true };
    }
  }

  spaceValidator(control: any): { [key: string]: boolean } {      
    if ((control.value as string).indexOf('  ') >= 0 || control.value.startsWith(' ') ||  control.value.endsWith(' ')) {
      return { spaceCheck: true };
    }
  }

 
  servicechargeValidator(control: any): { [key: string]: boolean } {
    const schargeRegexp: RegExp = /^\d+$/;   
    if (control.value && schargeRegexp.test(control.value)==false) {
      return { serviceCheck: true };
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.servicecharge.controls[controlName].hasError(errorName);
  }
  getservice_dd() {
    this.service.Get_Servicecharge_DD()
    .subscribe((data)=>{
      this.servicedata_dd=data
    })
  }

  GetAllTestPackages_PHC() {
    this.service.GetAllTestPackages_PHC()
      .subscribe((testdata) => {
        this.testpack = testdata
      })
  }



  bind(){
    //bindin g data
    this.servicecharge.controls['service_name'].setValue(this._data.d.services_FK);
    this.servicecharge.controls['service_code'].setValue(this._data.d.serviceCode); 
    this.servicecharge.controls['service_charge'].setValue(this._data.d.charges); 
    this.servicecharge.controls['package_desc'].setValue(this._data.d.package_desc);
    // this.servicecharge.controls['test_desc'].setValue(this._data.d.packageTestlist);
    // console.log("Test:" + JSON.stringify(this._data.d.packageTestlist))
    
    //diable code
    this.servicecharge.controls['service_name'].disable();    
    this.servicecharge.controls['service_code'].disable();

    this.servicecharge.patchValue({
      test_desc: this._data.d.packageTestlist,
    });
  }
  
  updateform(){
    var servicedata:any;
    if(this.servicecharge.invalid){
      return;
    }  
    servicedata={
      price_Id:this._data.d.price_Id,    
      charges: this.servicecharge.value.service_charge, 
      package_desc: this.servicecharge.value.package_desc,
      service_package: this.servicecharge.value.test_desc 
    }     
    
    this.service.Put_UpdateServicecharge(servicedata)
    .subscribe((res)=>{
      this.notif.successmsg("servicecharge updated successfully")
       this.dialogRef.close();
       window.location.reload();  
    })
    
  }
  
}




