import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CallbackUrlService } from '../callback-url.service';

@Component({
  selector: 'app-callback-url',
  templateUrl: './callback-url.component.html',
  styleUrls: ['./callback-url.component.scss']
})
export class CallbackUrlComponent implements OnInit {
  
  response_data:any;
  

  constructor(private route: ActivatedRoute , public router:Router ,private callbackService: CallbackUrlService,private httpClient: HttpClient) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const encResp = params['encResp'];
      //var encResp:string ="007e86b9c0385c60645099bedcdbf1162357de76cbf854cda2473959a19b0c39c3e4d3ffb1ad0ca1663709438284a4f4a99f945380bfaec2645fc5b99638a5a26088935aff1e1c08f4b3eb3aecb8451410afffa350a43c03775b078a684ce5fa095cdbd460ce474f144b92c4b53a50cab6260c690315a11e8552014b786af01a59cd49e6c0b2042642173125cfeca17ed87b0f00e32faa3c1d13544f61bab0c6bfbb58d1c66ed89c4292ee40ca17c974a826850f0a737408fd44d4dfc3ab488c6502bbfde20d5d4e17b90e62660668bf7aafa82f69490ada3a8ee713f00750d268b919ff1b0d2d44ef544b0d9eeacd9dcf1cb8275184a853624e82ee85bfac7dbbeba3f2f148259b225ff67f33fba23b07bd5acb1de1cca2acd74f526615acd2ff91506a1eb5716eaa7195ddbfc367b95fd095a53228061dfe5c760ec5253b90789fdc4ddfafee920b8d4073b600497b225886ae54542e3d788cf67451b03538389a9c41b54981ec1758df71cc8a21df45a317e9a0ce802f42205dff8ee499b740b55f4afb928ee379f6c9b3289946f45207dded681d0f0bfadf6b4ec77b8cbbe6b913684104769f6ceeb51572da3f221dd6347a6b1f30782a25a14208e6b12520f5018e6b8044415c3c3e2fd3a22df3a0f0be028c0807bc0e8f1c53e6be481178d5f4e7c55c76bb637150515cce21806898d5324a4007158d4f608113e7e61b14dcbb97886086f5b0e3b91674766e8e5cd63f50b65420fc1e2930c62cfedffe4f60da216ed7142ae3b186dfcdff5b523cf1cd679de1933c29ffd981cdb1653caf5a6c65271220063ff81b585db180cf5b1ea82806e01c8d5d740bf908c1178932324615f25a4135f6001119ca163ba29e88bf88e36624da2a45e862ca121bd685e50ff877f2263bc6294e68d7673da5eea794969d230fc261fa0e81b454a821622fb8715b876fd24e79919b1b7b3a9a45b97f52e2818869a222e9867b30ee16772a705b280cc3bd4b5b7cf8a280ca767c4f77de86bf72b09d3459f810259b8f149e26f7174265e223d1d911fc166d590ef98386d058979f3102cadf4be4a85a5657452ffcca72d824f6fdf43917895d3dd34ca0fba4b6fdb3be445e0c30e6f86691ba4d97006452c6f33b603d00a85863ea31a701a4163b51c9c1fa8605fce9";
      if (encResp) {
        const apiUrl = 'https://telemedphcapi.medgramaone.com/api/Payment/CallbackPayReq';

        // Set the headers to send JSON data
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        // Send the data to your API
        this.httpClient.post(apiUrl, { encResp }, { headers }).subscribe(response => {
          console.log(response);
          this.response_data=JSON.stringify(response, undefined, 4);
        });
      } else {
        console.log('No encrypted response received.');
      }
    });
  }
    /*
    console.log('Encrypted Response:', this.encResp);
    this.callbackService.Callback_PayReq(this.encResp)
      .subscribe((data) => {
        this.response_data=data; 
        console.log('result :' +JSON.stringify(this.response_data));       
   
      }, (error) => {
          console.log('error :' +JSON.stringify(error)); 
      
      }); 
      
  }
*/

}
