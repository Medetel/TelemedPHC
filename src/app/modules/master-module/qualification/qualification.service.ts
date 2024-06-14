import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  constructor(private http:HttpClient) { }
  Get_qualification(){
    return this.http.get(`${environment.API_Base_URL}`+`Qualification/GetAllQualification`)
  }
  Get_qualification_skillset_dd() {
    return this.http.get(`${environment.API_Base_URL}` + `Qualification/GetAllQualification_Skillset_DD`)
  }
  Post_qualification(data){
    return this.http.post(`${environment.API_Base_URL}`+`Qualification/InsertQualification`,data)
  }
  Put_qualification(data){
    return this.http.put(`${environment.API_Base_URL}`+`Qualification/UpdateQualification`,data)
  }
  Delete_qualification(data){
    return this.http.delete(`${environment.API_Base_URL}`+`Qualification/DeleteQualification?qualification_id=${data}`)
  }
  Put_Approval(data){
    return this.http.put(`${environment.API_Base_URL}` + `Qualification/ApproveQualification`,data)
  }
  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
}
