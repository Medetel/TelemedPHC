import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { ServicechargeService } from '../../servicecharges/servicecharge.service';

@Component({
  selector: 'app-addservicecharge',
  templateUrl: './addservicecharge.component.html',
  styleUrls: ['./addservicecharge.component.scss']
})
export class AddservicechargeComponent implements OnInit {
  servcharge:any;
  servicechargeForm:FormGroup;
  s_prefix: any;
  testpack: any;

  constructor(private fb:FormBuilder,private router: Router,private chargeService:ServicechargeService,private notif:Notification) {
    this.servicechargeForm=this.fb.group({
      'service_id':[''],
      'service_prefix':[''],
      'service_code':['',[Validators.required,this.servicecodeValidator, this.spaceValidator]],
      'charges': ['', [Validators.required, this.servicechargeValidator, this.spaceValidator]],
      'package_desc': ['', [Validators.required, this.alphaValidator, this.spaceValidator]],
      'test_desc': ['',[Validators.required]],
    })
   }

  ngOnInit(): void {
    this.get_services_dd();
    this.servicechargeForm.controls['service_prefix'].disable();
    this.GetAllTestPackages_PHC();
  }
  
  // onToppingRemoved(topping: string) {
  //   const toppings = this.chargeService.value.test_desc;
  //   this.removeFirst(toppings, topping);
  //   this.chargeService.controls['test_desc'].setValue(toppings); 
  // }

  get_services_dd(){    
    this.chargeService.Get_Servicecharge_DD()
    .subscribe((data)=>{      
      this.servcharge=data
      this.servcharge=this.servcharge.filter(u=>u.service_Id!=7)
      console.log('service data : ' +JSON.stringify(this.servcharge))
      
    })
  }

  GetAllTestPackages_PHC() {
    this.chargeService.GetAllTestPackages_PHC()
      .subscribe((testdata) => {
        this.testpack = testdata
      })
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

  servicecodeValidator(control: any): { [key: string]: boolean } {
    const scodeRegexp: RegExp = /^\d+$/;   
    if (control.value && scodeRegexp.test(control.value)==false) {
      return { codeCheck: true };
    }
  }

  servicechargeValidator(control: any): { [key: string]: boolean } {
    const schargeRegexp: RegExp = /^\d+$/;   
    if (control.value && schargeRegexp.test(control.value)==false) {
      return { serviceCheck: true };
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.servicechargeForm.controls[controlName].hasError(errorName);
  }
  
  servicechange($event) {
    if ($event === 5) {
      this.enablePackageDescValidation();
    } else {
      this.disablePackageDescValidation();
    }
   
    if($event==1)
    {
      this.s_prefix='GP';
    }
   else if($event==2)
    {
      this.s_prefix='SD';
    }
    else if($event==3)
    {
      this.s_prefix='MS';
    }
    else if($event==4)
    {
      this.s_prefix='WN';
    }
    else if($event==5)
    {
      this.s_prefix='PK';
    }
    else if($event==6)
    {
      this.s_prefix='HC';
    }
    else
    {
      this.s_prefix='';
    }
    console.log('daats', $event)
    // if($event==7){
    //   this.servicechargeForm.controls['service_code'].disable();
    //   this.servicechargeForm.controls['charges'].disable();
    // }
    // else{
    //   this.servicechargeForm.controls['service_code'].enable();
    //   this.servicechargeForm.controls['charges'].disable();
    // }
    this.servicechargeForm.controls['service_prefix'].setValue(this.s_prefix);

  }
  private disablePackageDescValidation() {
    const packageDescControl = this.servicechargeForm.get('package_desc');
    packageDescControl.clearValidators();
    packageDescControl.updateValueAndValidity();
    const packageDescControl2 = this.servicechargeForm.get('test_desc');
    packageDescControl2.clearValidators();
    packageDescControl2.updateValueAndValidity();
  }

  private enablePackageDescValidation() {
    const packageDescControl = this.servicechargeForm.get('package_desc');
    const packageDescControl2 = this.servicechargeForm.get('test_desc');
    packageDescControl.setValidators([
      Validators.required,
      this.alphaValidator,
      this.spaceValidator
    ]);
    packageDescControl2.setValidators([
      Validators.required
    ]);
    packageDescControl.updateValueAndValidity();
    packageDescControl2.updateValueAndValidity();
  }

  save() {
    
    if (this.servicechargeForm.value.service_id === 5) {
      this.enablePackageDescValidation();
    } else {
      this.disablePackageDescValidation();
    }
    // if(this.servicechargeForm.value.service_id==7)
    // {
    //    this.notif.errorsmsg("Please choose another service")
      
    //    return
    // }
   
    
    if(this.servicechargeForm.invalid){
      return
    }  
    if (!this.servicechargeForm.value.test_desc || this.servicechargeForm.value.test_desc.length === 0) {
      this.servicechargeForm.value.test_desc = [{ test_desc_id: 0, test_desc: 'Default packages' }];
    }

    var postdata = {
      
      "services_FK": this.servicechargeForm.value.service_id,
      "serviceCode": this.s_prefix+this.servicechargeForm.value.service_code,
      "charges": this.servicechargeForm.value.charges,
      "package_desc": this.servicechargeForm.value.package_desc,
      "service_package": this.servicechargeForm.value.test_desc,
    }    
      // !== '' ? this.servicechargeForm.value.package_desc : null
      //   !== '' ? this.servicechargeForm.value.test_desc : 9999

    this.chargeService.Post_AddServicecharge(postdata)
    .subscribe((res)=>{
       this.notif.successmsg("Service charge added successfully")
       this.router.navigate(['/base/master/services']);
    })
  }

}
