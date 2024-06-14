import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-diag',
  templateUrl: './view-diag.component.html',
  styleUrls: ['./view-diag.component.scss']
})
export class ViewDiagComponent implements OnInit {
  con_diag_id:any;
  dM_Name;
  dD_Desc;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any) { }

  ngOnInit(): void {   
    this.con_diag_id=this._data.d.con_diag_id;
    this.dM_Name = this._data.d.dM_Name;
    this.dD_Desc = this._data.d.dD_Desc;
  }

}
