import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { DrugserviceService } from '../drugservice.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-drug-approvel',
  templateUrl: './drug-approvel.component.html',
  styleUrls: ['./drug-approvel.component.scss']
})
export class DrugApprovelComponent implements OnInit {

  drug: FormGroup;
  constructor(private dialogRef: MatDialogRef<DrugApprovelComponent>,@Inject(MAT_DIALOG_DATA) private _data: any, private fb: FormBuilder,public service:DrugserviceService,private notif:Notification,) {
    this.drug = this.fb.group({
      'drug_code': [this._data.d.drug_code],
      'drg_Category': [this._data.d.drg_Category],
      'drg_name': [this._data.d.drg_name],
      'drg_type_id_FK': [this._data.d.drg_type_name],
      'drg_strength': [this._data.d.drg_strength],
      'drg_unit_id_FK': [this._data.d.drg_Unit],
      'discription': [this._data.d.discription],
      'instruction': [this._data.d.instruction],
      'drg_manufacturer_id_FK':[this._data.d.drg_manuf_name],
      'drg_warnings':[this._data.d.drg_warnings],
      'drg_medcine_type':[this._data.d.drg_medcine_type],
      'remarks':[ ],
      'drg_mst_id':[''],
    })
  }

  ngOnInit(): void {
    this.disable();
    this.Bind();
  }

  disable(){
    this.drug.controls['drug_code'].disable(); 
    this.drug.controls['drg_Category'].disable();
    this.drug.controls['drg_name'].disable();
    this.drug.controls['drg_type_id_FK'].disable();
    this.drug.controls['drg_strength'].disable();
    this.drug.controls['drg_unit_id_FK'].disable();
    this.drug.controls['discription'].disable();
    this.drug.controls['instruction'].disable();
    this.drug.controls['drg_manufacturer_id_FK'].disable();
    this.drug.controls['drg_warnings'].disable();
    this.drug.controls['drg_medcine_type'].disable();
  }
  Bind(){
    this.drug.controls['drg_mst_id'].setValue(this._data.d.drg_mst_id);
    this.drug.controls['remarks'].setValue(this._data.d.remarks);
  }

  approveform(){
    this.service.Approve_drug(this.drug.value)
    .subscribe((res)=>{
      this.notif.successmsg("Drug approved successfully")
      this.dialogRef.close();
      window.location.reload(); 
    })
   
  }

}
