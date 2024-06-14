import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulationeng',
  templateUrl: './consulationeng.component.html',
  styleUrls: ['./consulationeng.component.scss']
})
export class ConsulationengComponent implements OnInit {

  constructor(private routerLink: Router) { }
  back() {
    this.routerLink.navigate(['/base/task/checkoutform'])
  }
  ngOnInit(): void {
  }

}
