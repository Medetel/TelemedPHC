import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http:HttpClient) { }

  Get_network(){
     return this.http.get(`${environment.API_Base_URL}`+`Network/GetAllNetwork`)
  }
  Post_network(data){
    return this.http.post(`${environment.API_Base_URL}`+`Network/InsertNetwork`,data)
  }
  Put_network(data){
    return this.http.put(`${environment.API_Base_URL}`+`Network/UpdateNetwork`,data)
  }
  Delete_network(data){
    return this.http.delete(`${environment.API_Base_URL}`+`Network/DeleteNetwork?NE_Id=${data}`)
  }
  Put_Approval(data){
    return this.http.put(`${environment.API_Base_URL}` + `Network/ApproveNetwork`,data)
  }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
}
