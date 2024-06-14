import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-two-kannada',
  templateUrl: './video-two-kannada.component.html',
  styleUrls: ['./video-two-kannada.component.scss']
})
export class VideoTwoKannadaComponent implements OnInit {

  constructor(private routerLink: Router) { }
  back() {
    this.routerLink.navigate(['/base/task/join-vc'])
  }

  ngOnInit(): void {
  }

}
