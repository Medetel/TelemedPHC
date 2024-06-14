import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-skillset',
  templateUrl: './view-skillset.component.html',
  styleUrls: ['./view-skillset.component.scss']
})
export class ViewSkillsetComponent implements OnInit {
  skillset:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private fb: FormBuilder) { 
    this.skillset=this.fb.group({
      'qualification_Name':[this._data.d.qualification_Name],
      'skillset_name':[this._data.d.skillset_name]
    })
  }

  ngOnInit(): void {
    this.disable();
  }
  disable(){
    this.skillset.controls['qualification_Name'].disable();
    this.skillset.controls['skillset_name'].disable();
  }
}
