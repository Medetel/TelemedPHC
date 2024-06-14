import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-three',
  templateUrl: './video-three.component.html',
  styleUrls: ['./video-three.component.scss']
})
export class VideoThreeComponent implements OnInit {

  constructor(private routerLink: Router) { }
  back() {
    this.routerLink.navigate(['/base/task/appointment'])
  }

  ngOnInit(): void {
  }

}
