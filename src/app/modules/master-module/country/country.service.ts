import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http:HttpClient) { }

Get_country(){
  return this.http.get(`${environment.API_Base_URL}`+`Country/GetAllCountry`)
}
Post_country(data){
   return this.http.post(`${environment.API_Base_URL}`+`Country/InsertCountry`,data)
}
Put_Country(data){
  return this.http.put(`${environment.API_Base_URL}`+`Country/UpdateCountry`,data) 
}
Delete_Country(data){
  return this.http.delete(`${environment.API_Base_URL}`+`Country/DeleteCountry?Country_id=${data}`)
}
Get_menu_claims(data) {
  return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
}
Put_Approval(data){
  return this.http.put(`${environment.API_Base_URL}` + `Country/ApproveCountry`,data)
}

}
