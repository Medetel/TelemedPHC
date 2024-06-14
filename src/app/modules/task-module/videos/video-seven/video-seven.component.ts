import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-seven',
  templateUrl: './video-seven.component.html',
  styleUrls: ['./video-seven.component.scss']
})
export class VideoSevenComponent implements OnInit {

  constructor(private routerLink: Router) { }
  back() {
    this.routerLink.navigate(['/base/task/join-vc'])  }

  ngOnInit(): void {
  }
     

}
