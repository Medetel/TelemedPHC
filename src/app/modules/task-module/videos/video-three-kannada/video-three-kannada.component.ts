import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-three-kannada',
  templateUrl: './video-three-kannada.component.html',
  styleUrls: ['./video-three-kannada.component.scss']
})
export class VideoThreeKannadaComponent implements OnInit {

  constructor(private routerLink: Router) { }
  back() {
    this.routerLink.navigate(['/base/task/appointment'])
  }

  ngOnInit(): void {
  }
}
