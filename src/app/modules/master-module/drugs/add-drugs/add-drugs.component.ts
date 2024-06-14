import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DrugserviceService } from '../drugservice.service';

@Component({
  selector: 'app-add-drugs',
  templateUrl: './add-drugs.component.html',
  styleUrls: ['./add-drugs.component.scss']
})
export class AddDrugsComponent implements OnInit {
  units: any;
  type: any;
  manuf:any;
  category:any;
  drug:FormGroup;
  medcine_type :any ='NON GENERIC';
  constructor(public service: DrugserviceService, private router: Router, private notif: Notification,public fb:FormBuilder) { 
    this.drug=this.fb.group({
      'drug_code': ['DRG', [Validators.required, this.codeValidator, Validators.pattern("^DRG[0-9]+$")]],
      'drg_name':['',[Validators.required,this.alfaNumCharValidator,this.numericValidator,this.spaceValidator]],
      'drg_type_id_FK':[''],
      'drg_strength':['',[this.strengthValidator]],
      'drg_unit_id_FK':[''],
      'drg_Category_Id':[''],
      'instruction':[''],
      'drg_manufacturer_id_FK':[''],
      'drg_warnings':[''],
      'drg_medcine_type':[''],
      })
    }


  ngOnInit(): void {
    this.Get_units();
    this.Get_type();
    this.Get_manufacture();
    this.get_categorydd();
  }

  codeValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/, ''/]/;    
  
    if (control.value && nameRegexp.test(control.value)) {
      return { alphaNumCheck: true };
    }
  }

  alfaNumCharValidator(control: any): { [key: string]: boolean } {
    const alfaRegexp: RegExp = /^[a-zA-Z0-9 ]*$/;  
    if (control.value && alfaRegexp.test(control.value)==false) {
      return { alfaNumCharCheck: true };
    }
  }


  strengthValidator(control: any): { [key: string]: boolean } {
    const strengthRegexp: RegExp = /^\d+$/;   
    if (control.value && strengthRegexp.test(control.value)==false) {
      return { strengthCheck: true };
    }
  }

  numericValidator(control: any): { [key: string]: boolean } {
    const numericRegexp: RegExp = /^\d+$/;   
    if (control.value && numericRegexp.test(control.value)) {
      return { numericCheck: true };
    }
  }

  spaceValidator(control: any): { [key: string]: boolean } {      
    if ((control.value as string).indexOf('  ') >= 0 || control.value.startsWith(' ') ||  control.value.endsWith(' ')) {
      return { spaceCheck: true };
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.drug.controls[controlName].hasError(errorName);
  }
  
  onChangeMedcineType(ob: any) {
   
    if (ob.checked==true) {
      
      this.medcine_type='GENERIC';
      
    } else {
      
      this.medcine_type='NON GENERIC';
    }

  } 
  save() {
    var drugData:any; 
    if(this.drug.invalid){
      return
    } 

    drugData={
      drug_code:this.drug.value.drug_code,
      drg_name:this.drug.value.drg_name,
      drg_type_id_FK:this.drug.value.drg_type_id_FK,
      drg_strength: this.drug.value.drg_strength !== '' ? this.drug.value.drg_strength : null,
      drg_unit_id_FK: this.drug.value.drg_unit_id_FK !== '' ? this.drug.value.drg_strength : 0,
      drg_Category_Id:this.drug.value.drg_Category_Id,
      instruction:this.drug.value.instruction,
      drg_manufacturer_id_FK:this.drug.value.drg_manufacturer_id_FK,
      drg_warnings:this.drug.value.drg_warnings,
      drg_medcine_type:this.medcine_type
     
    }
    console.log("DrugData:", JSON.stringify(drugData))   
    this.service.Post_drug(drugData)
      .subscribe((res) => {
        
        this.notif.successmsg("Drug added successfully")
        this.router.navigate(['/base/master/drugs']);
      })
     
      
  }
 // this.fixappointment.value.bloodPressure=this.fixappointment.value.bpmm+'/'+this.fixappointment.value.bphg;
  Get_units() {
    this.service.get_unitsbydd()
      .subscribe((data) => {
        this.units=data
      })
  }

  Get_type(){
    this.service.get_typebydd()
    .subscribe((data)=>{
      this.type=data
    })
  }

  Get_manufacture(){
    this.service.get_manufactdd()
    .subscribe((data)=>{
      this.manuf=data
    })
  }
  get_categorydd(){
    this.service.get_categoryDD()
    .subscribe((data)=>{
      this.category=data
    })
  }
//   cat:any; 
//   typescategory(event){
//     this.service.Get_drugmastdd(event)
//     .subscribe((data)=>{
//       this.cat=data
//     })
// }
// drg_type: any;
// drugchange() {
//   var datafilter = this.cat.filter(x => x.drg_mst_id == this.drug.value.drg_name);
//   this.drg_type = datafilter[0].prc_Drg_name;
// }
}
