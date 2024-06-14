import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-six',
  templateUrl: './video-six.component.html',
  styleUrls: ['./video-six.component.scss']
})
export class VideoSixComponent implements OnInit {

  constructor(private routerLink: Router) { }
  back() {
    this.routerLink.navigate(['/base/task/consultation'])  }
  ngOnInit(): void {
  }

} 

