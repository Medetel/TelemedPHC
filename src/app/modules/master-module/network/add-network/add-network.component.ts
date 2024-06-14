import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { NetworkService } from '../network.service';

@Component({
  selector: 'app-add-network',
  templateUrl: './add-network.component.html',
  styleUrls: ['./add-network.component.scss']
})
export class AddNetworkComponent implements OnInit {
  network:FormGroup;
  constructor(private fb:FormBuilder, private router: Router,private service:NetworkService,private notif:Notification) { 
    this.network=this.fb.group({
      'nE_Description':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
      'nE_Code': ['NET', [Validators.required, Validators.pattern("^NET[0-9]+$"), this.codeValidator]],
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
    return this.network.controls[controlName].hasError(errorName);
  }
  reset(){
    this.network.reset();
  }
  ngOnInit(): void {
  }
  save(){
    if(this.network.invalid){
      return
    }  
    this.service.Post_network(this.network.value)
    .subscribe((res)=>{
       this.notif.successmsg("Network added successfully")
       this.router.navigate(['/base/master/network']);
    })
  }
 
}
