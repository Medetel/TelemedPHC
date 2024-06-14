import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-four',
  templateUrl: './video-four.component.html',
  styleUrls: ['./video-four.component.scss']
})
export class VideoFourComponent implements OnInit {

  constructor(private routerLink: Router) { }
  back() {
    this.routerLink.navigate(['/base/task/Confirmmanualappointment'])
  }

  ngOnInit(): void {
  }

}
