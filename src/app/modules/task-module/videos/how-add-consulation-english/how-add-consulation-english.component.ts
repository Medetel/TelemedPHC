import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-add-consulation-english',
  templateUrl: './how-add-consulation-english.component.html',
  styleUrls: ['./how-add-consulation-english.component.scss']
})
export class HowAddConsulationEnglishComponent implements OnInit {

  constructor(private routerLink: Router) { }

  ngOnInit(): void {
  
    
  }
  back()
  {
    this.routerLink.navigate(['/base/task/appointment'])
  }

}
