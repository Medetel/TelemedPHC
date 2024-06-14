import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  roleName: any;

  constructor() { }

  ngOnInit(): void {
    this.roleName = localStorage.getItem('roleName');
  }

}
