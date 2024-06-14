import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillsetService {

  constructor(private http:HttpClient) { }
  Get_skillset(){
    return this.http.get(`${environment.API_Base_URL}`+`SkillSet/GetAllSkillSet`)
  }
  Post_skillset(data){
    return this.http.post(`${environment.API_Base_URL}`+`SkillSet/InsertSkillSet`,data)
  }
  Put_skillset(data){
    return this.http.put(`${environment.API_Base_URL}`+`SkillSet/UpdateSkillSet`,data)
  }
  Delete_skillset(data){
    return this.http.delete(`${environment.API_Base_URL}`+`SkillSet/DeleteSkillSet?Skillset_id=${data}`)
  }
  Put_Approval(data){
    return this.http.put(`${environment.API_Base_URL}` + `SkillSet/ApproveSkillSet`,data)
  }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
}
