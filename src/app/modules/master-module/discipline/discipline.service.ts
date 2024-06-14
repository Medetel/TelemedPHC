import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  constructor(private http:HttpClient) { }
  Get_discipline(){
    return this.http.get(`${environment.API_Base_URL}`+`Discipline/GetAllDiscipline`)
  }
  Get_approvedDiscipline(){
    return this.http.get(`${environment.API_Base_URL}`+`Discipline/GetDiscipline_DD`)
  }
  Post_discipline(data){
    return this.http.post(`${environment.API_Base_URL}`+`Discipline/InsertDiscipline`,data)
  }
  Put_discipline(data){
    return this.http.put(`${environment.API_Base_URL}`+`Discipline/UpdateDiscipline`,data)
  }
  Delete_discipline(data){
    return this.http.delete(`${environment.API_Base_URL}`+`Discipline/DeleteDiscipline?CD_Id=${data}`)
  }
  Put_Approval(data){
    return this.http.put(`${environment.API_Base_URL}` + `Discipline/ApproveDiscipline`,data)
  }
  
 Get_menu_claims(data) {
  return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
}
}
