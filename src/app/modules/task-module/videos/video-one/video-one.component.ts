import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-one',
  templateUrl: './video-one.component.html',
  styleUrls: ['./video-one.component.scss']
})
export class VideoOneComponent implements OnInit {

  constructor(private routerLink:Router ) { }

  ngOnInit(): void {
  }
  back() {
    this.routerLink.navigate(['/base/registration/patient'])
  }

}
