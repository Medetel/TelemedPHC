import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoConfService {

   staging
  readonly vcUrl = 'http://telemedicinephcapi.esdinfra.com';

  //  //live
  //  readonly vcUrl = 'https://telemedicineapi.medetel.in';

  httpOptions: any;

  constructor(private http: HttpClient) {
    //if (accesstoken != null && accesstoken != '' && typeof (accesstoken) != undefined) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'No-Auth': 'True'          
        })
      };
    //}
  //

   }

   startMeeting(data:any) {
    return this.http.post(this.vcUrl + '/api/VideoConference/StartMeeting', data, this.httpOptions);
  } 
  
}
