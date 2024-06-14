import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-view-roles',
  templateUrl: './view-roles.component.html',
  styleUrls: ['./view-roles.component.scss']
})
export class ViewRolesComponent implements OnInit {
  role_register:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb:FormBuilder,private _service:AdminService,) { 
    this.role_register=this.fb.group({
      'roleName':[this._data.d.name]
  })
}

  ngOnInit(): void {
    this.disable();
  }

  disable(){
    this.role_register.controls['roleName'].disable();
  }
}
