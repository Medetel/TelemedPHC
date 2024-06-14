import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-assistant-password',
  templateUrl: './assistant-password.component.html',
  styleUrls: ['./assistant-password.component.scss']
})
export class AssistantPasswordComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,) { }

  ngOnInit(): void {
  }

}
