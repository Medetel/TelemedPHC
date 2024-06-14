import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private http:HttpClient) {

   }
   Get_Doctor(){    
    return this.http.get(`${environment.API_Base_URL}`+`Doctor/DoctorDD`)
  }

  post_schedule(data) {
    return this.http.post(`${environment.API_Base_URL}` + `Doctor_Schedule/InsertDoctor_Schedule`, data)
  }

  get_allschedule() {
    return this.http.get(`${environment.API_Base_URL}` + `Doctor_Schedule/GetDoctor_Schedule`)
  }

  delete_schedule(id) {
    return this.http.delete(`${environment.API_Base_URL}` + `Doctor_Schedule/DeleteDoctor_Schedule?Id=${id}`)
  }
}
