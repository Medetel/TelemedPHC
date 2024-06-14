import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-one-kannada',
  templateUrl: './video-one-kannada.component.html',
  styleUrls: ['./video-one-kannada.component.scss']
})
export class VideoOneKannadaComponent implements OnInit {

  constructor(private routerLink: Router) { }
  back() {
    this.routerLink.navigate(['/base/registration/patient'])
  }

  ngOnInit(): void {
  }
}
