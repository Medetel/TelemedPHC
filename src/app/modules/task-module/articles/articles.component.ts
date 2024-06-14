import { Component, OnInit } from '@angular/core';
import { PHCManualAppointService } from '../phc-manual-appoint.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  videoData_articles: any;
  constructor(private service:PHCManualAppointService) { }

  ngOnInit(): void {
    this.service.GetAllMediaDocument_by_id(6).subscribe(res => {
      this.videoData_articles = res
      console.log("Kumar", res)
    })
  }

}
