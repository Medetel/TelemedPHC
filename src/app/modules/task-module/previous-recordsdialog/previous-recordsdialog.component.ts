import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-previous-recordsdialog',
  templateUrl: './previous-recordsdialog.component.html',
  styleUrls: ['./previous-recordsdialog.component.scss']
})
export class PreviousRecordsdialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  close(){
    window.location.reload();
  }

}
