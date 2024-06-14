import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-gallery',
  templateUrl: './view-gallery.component.html',
  styleUrls: ['./view-gallery.component.scss']
})
export class ViewGalleryComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }
  imageData: any
  ngOnInit(): void {
    this.imageData = this.data.d
    console.log(this.imageData)
  }
}
