import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-to-consult-kanada',
  templateUrl: './how-to-consult-kanada.component.html',
  styleUrls: ['./how-to-consult-kanada.component.scss']
})
export class HowToCONSULTKANADAComponent implements OnInit {

  constructor(private routerLink: Router) { }

  ngOnInit(): void {
  }
  back() {
    this.routerLink.navigate(['/base/task/checkoutform'])
  }

}
