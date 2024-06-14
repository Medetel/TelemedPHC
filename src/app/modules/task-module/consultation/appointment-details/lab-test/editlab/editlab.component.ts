import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { CounsultationService } from '../../../counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';


@Component({
  selector: 'app-editlab',
  templateUrl: './editlab.component.html',
  styleUrls: ['./editlab.component.scss']
})
export class EditlabComponent implements OnInit {

 Labedit: FormGroup;
  con_id: any;
  catogory:any;
  discription: any;
  data: any;
  discriptions_edit: any;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private service: CounsultationService, private fb: FormBuilder, private notif: Notification, private route: ActivatedRoute, public dialog: MatDialog) {
    this.Labedit = this.fb.group({
      'id':[''],
      'category_Id': [''],
      'description_Id': [''],
      'coN_Id': [],
    })
   }

  ngOnInit(): void {
    this.bind();
   this.disable();
   
  }

  get_Labcategorydd(){
    this.service.Get_labcategorydd()
    .subscribe((data) => {
      this.catogory= data
    })
  }

  typescategory(event){
    this.service.Get_labdecrptndd(event)
    .subscribe((data)=>{
      this.discription=data
    })
  }

  get_labdescpbyid(Lab_DescId){
    this.service.Get_labdescbyid(Lab_DescId)
    .subscribe((data)=>{
      this.discription=data
    })
  }  

  bind(){   
    this.Labedit.controls['id'].setValue(this._data.d.id);
    this.Labedit.controls['category_Id'].setValue(this._data.d.category_Name);
    this.Labedit.controls['description_Id'].setValue(this._data.d.description);
    this.Labedit.controls['coN_Id'].setValue(this._data.d.coN_Id);
  }

  disable(){
    this.Labedit.controls['category_Id'].disable();
    this.Labedit.controls['description_Id'].disable();
  }

}
