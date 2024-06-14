import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-four-kannada',
  templateUrl: './video-four-kannada.component.html',
  styleUrls: ['./video-four-kannada.component.scss']
})
export class VideoFourKannadaComponent implements OnInit {

  constructor(private routerLink: Router) { }
  back() {
    this.routerLink.navigate(['base/task/lab-info'])
  }

  ngOnInit(): void {
  }

}
