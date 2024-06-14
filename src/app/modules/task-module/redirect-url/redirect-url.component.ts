import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RedirectUrlService } from './redirect-url.service';

@Component({
  selector: 'app-redirect-url',
  templateUrl: './redirect-url.component.html',
  styleUrls: ['./redirect-url.component.scss']
})
export class RedirectUrlComponent implements OnInit {
  queryObj: any;
  response_data:any;
  encResp:any;

  constructor(private route: ActivatedRoute , public router:Router ,private redirectService: RedirectUrlService) { }

  ngOnInit(): void {

    this.route.queryParamMap
    .subscribe((params) => {
      this.queryObj = { ...params.keys, ...params };
      }
    
    );

    /*
    var paydata={
        payment_id:this.queryObj.params.encResp               
      }
*/
    this.encResp=this.queryObj.params.encResp;
    this.redirectService.Callback_PayReq(this.encResp)
      .subscribe((data) => {
        this.response_data=data; 
        console.log('result :' +JSON.stringify(this.response_data));       
   
      }, (error) => {
          console.log('error :' +JSON.stringify(error)); 
      
      }); 

  }

}
