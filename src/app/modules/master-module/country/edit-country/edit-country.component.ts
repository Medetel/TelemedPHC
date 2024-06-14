import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { CountryService } from '../country.service';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss']
})
export class EditCountryComponent implements OnInit {
  country:FormGroup;
  constructor(private dialogRef: MatDialogRef<EditCountryComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private router: Router,private fb:FormBuilder,private service:CountryService,private notif:Notification) { 
   this.country=this.fb.group({
     'cntry_id':[''],
    'country_name':['',[Validators.required,this.alphaValidator,this.spaceValidator]],
     'country_code':['']
   })
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
    return this.country.controls[controlName].hasError(errorName);
  }
  ngOnInit(): void {
    this.Bind();
  }
  Bind(){
    this.country.controls['cntry_id'].setValue(this._data.d.cntry_id);
    this.country.controls['country_name'].setValue(this._data.d.country_name);
    this.country.controls['country_code'].setValue(this._data.d.country_code);
    this.country.controls['country_code'].disable();
  }
  
  updateform(){
    var countryData:any;
    if(this.country.invalid){
      return
    }  
    countryData={
      cntry_id:this._data.d.cntry_id,
      country_code:this._data.d.country_code,
      country_name:this.country.value.country_name      
    }     
    
    this.service.Put_Country(countryData)
    .subscribe((res)=>{
      this.notif.successmsg("Country updated successfully")
      this.dialogRef.close();
      window.location.reload();          
    })
  }
  
}
