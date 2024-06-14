import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { DrugserviceService } from '../drugservice.service';

@Component({
  selector: 'app-edit-drugs',
  templateUrl: './edit-drugs.component.html',
  styleUrls: ['./edit-drugs.component.scss']
})
export class EditDrugsComponent implements OnInit {
  drug: FormGroup;
  units: any;
  type: any;
  manuf: any;
  category:any;
  medcine_type :any;

  constructor(private dialogRef: MatDialogRef<EditDrugsComponent>,@Inject(MAT_DIALOG_DATA) private _data: any,private fb:FormBuilder,private notif:Notification,public service: DrugserviceService) { 
    this.drug=this.fb.group({
      'drug_code': [''],
      'drg_Category_Id': [''],
      'drg_name':['',[Validators.required,this.alfaNumCharValidator,this.numericValidator,this.spaceValidator]],
      'drg_type_id_FK':[''],
      'drg_strength':['',[this.strengthValidator]],
      'drg_unit_id_FK':[''],
      'instruction':[''],
      'drg_mst_id':[''],
      'drg_manufacturer_id_FK':[''],
      'drg_warnings':[''],
      'drg_medcine_type':[''],
      })
  }

  ngOnInit(): void {
    //this.Bind();
    this.Get_units();
    this.Get_type();
    this.Get_manufacture();
    this.get_categorydd();
    this.Bind();
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

  Bind(){
    console.log('drug data :' +JSON.stringify(this._data.d))

    this.drug.controls['drg_mst_id'].setValue(this._data.d.drg_mst_id);
    this.drug.controls['drug_code'].setValue(this._data.d.drug_code);
    this.drug.controls['drg_Category_Id'].setValue(this._data.d.drg_Category_Id);
    this.drug.controls['drg_name'].setValue(this._data.d.drg_name);
    this.drug.controls['drg_type_id_FK'].setValue(this._data.d.drg_type_id_FK);
    this.drug.controls['drg_strength'].setValue(this._data.d.drg_strength);
    this.drug.controls['drg_unit_id_FK'].setValue(this._data.d.drg_unit_id_FK);
    this.drug.controls['instruction'].setValue(this._data.d.instruction);
    this.drug.controls['drg_manufacturer_id_FK'].setValue(this._data.d.drg_manufacturer_id_FK);
    this.drug.controls['drg_warnings'].setValue(this._data.d.drg_warnings);
    this.drug.controls['drg_medcine_type'].setValue(this._data.d.drg_medcine_type);
    this.drug.controls['drug_code'].disable();

  }

  onChangeMedcineType(ob: any) {   
    if (ob.checked==true) {
           this.medcine_type='GENERIC';
      
    } else {
      
      this.medcine_type='NON GENERIC';
    }

  } 

  updateform(){ 
    var drugData:any;    
    //this.drug.value.drg_medcine_type = this.drug.value.drg_medcine_type == true ? 'GENERIC' : null
    if(this.drug.invalid){
      return
    }
    if(this.drug.value.drg_medcine_type==null)
    {
      this.medcine_type='NON GENERIC';
    }
    drugData={   
      drg_mst_id: this._data.d.drg_mst_id,   
      drug_code: this._data.d.drug_code,
      drg_Category_Id: this.drug.value.drg_Category_Id,
      drg_name: this.drug.value.drg_name,
      drg_type_id_FK: this.drug.value.drg_type_id_FK,
      drg_strength: this.drug.value.drg_strength,
      drg_unit_id_FK: this.drug.value.drg_unit_id_FK,
      instruction: this.drug.value.instruction,
      drg_manufacturer_id_FK:this.drug.value.drg_manufacturer_id_FK,
      drg_warnings: this.drug.value.drg_warnings,
      drg_medcine_type:this.medcine_type       
    }     
   
    this.service.Put_drug(drugData)
    .subscribe((res)=>{
      this.notif.successmsg("Drug updated successfully")
      this.dialogRef.close();
      window.location.reload(); 

    })
   
  }
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

}
