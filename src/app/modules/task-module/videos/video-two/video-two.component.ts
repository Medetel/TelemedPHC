import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-two',
  templateUrl: './video-two.component.html',
  styleUrls: ['./video-two.component.scss']
})
export class VideoTwoComponent implements OnInit {

  constructor(private routerLink: Router) { }
  back() {
    this.routerLink.navigate(['/base/master/doctorschedule'])
  }

  ngOnInit(): void {
  }

}
