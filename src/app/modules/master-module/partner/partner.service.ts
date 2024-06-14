import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private http:HttpClient) { }
  Get_Partner(){
    return this.http.get(`${environment.API_Base_URL}`+`Vle/GetAllVle`)
  }
  Post_Partner(data){
    return this.http.post(`${environment.API_Base_URL}`+`Vle/InsertVle`,data)
  }
  Put_Partner(data){
    return this.http.put(`${environment.API_Base_URL}`+`Vle/UpdateVle`,data)
  }
  Delete_Partner(data){
    return this.http.delete(`${environment.API_Base_URL}`+`Vle/DeleteVle?VL_Id=${data}`)
  }
  
}
