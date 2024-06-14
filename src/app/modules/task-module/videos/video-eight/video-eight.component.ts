import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-eight',
  templateUrl: './video-eight.component.html',
  styleUrls: ['./video-eight.component.scss']
})
export class VideoEightComponent implements OnInit {

  constructor(private routerLink: Router) { }
  back() {
    this.routerLink.navigate(['base/task/lab-info'])
  }

  ngOnInit(): void {
  }

}
