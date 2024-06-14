import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-five',
  templateUrl: './video-five.component.html',
  styleUrls: ['./video-five.component.scss']
})
export class VideoFiveComponent implements OnInit {

  constructor(private routerLink: Router) { }
  back() {
    this.routerLink.navigate(['/base/task/consultation'])
  }

  ngOnInit(): void {
  }

}
