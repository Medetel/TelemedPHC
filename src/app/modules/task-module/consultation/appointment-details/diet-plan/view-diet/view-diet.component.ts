import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-view-diet',
  templateUrl: './view-diet.component.html',
  styleUrls: ['./view-diet.component.scss']
})
export class ViewDietComponent implements OnInit {
  Dietplan: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder) {
    this.Dietplan = this.fb.group({
      'dp_intake': [this._data.d.dp_intake],
      'dp_duration': [this._data.d.dp_duration],
      'dp_dura_interof': [this._data.d.dp_dura_interof],
      'dp_instruction': [this._data.d.dp_instruction],
    })
   }

  ngOnInit(): void {
    this.disable();
  }

  disable(){
    this.Dietplan.controls['dp_intake'].disable();
    this.Dietplan.controls['dp_duration'].disable();
    this.Dietplan.controls['dp_dura_interof'].disable();
    this.Dietplan.controls['dp_instruction'].disable();
  }

}
