import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabInfoService {
  
  httpOptions: any;

  constructor(private http: HttpClient) { 
     //saheb
    //  let accesstoken = localStorage.getItem('accessToken');
    //  if (accesstoken != null && accesstoken != '' && typeof (accesstoken) != undefined) {
    //    this.httpOptions = {
    //      headers: new HttpHeaders({
    //        'Content-Type': 'application/json',
    //        'Authorization': 'Bearer ' + accesstoken,
    //        'No-Auth': 'True'          
    //      })
    //    };
    //  }
  }
getall_consultlabtest(){
  return this.http.get(`${environment.API_Base_URL}` + `Consult_LabTest/GetAllConsult_LabTest`)
}
Post_labtest(data){
  return this.http.post(`${environment.API_Base_URL}` + `Consult_LabTest/InsertConsult_LabTest`, data)
}

Get_labcategorydd(){
  return this.http.get(`${environment.API_Base_URL}`+`LAB_SUBINVESTIGATIONS/LabSubInsv_DD`)
}

Get_labdecrptndd(id){
  return this.http.get(`${environment.API_Base_URL}` + `LAB_Description/LabDesc_DD_ByCat_Id?Cat_Id=${id}`)
}

Get_discriptionall(){
  return this.http.get(`${environment.API_Base_URL}` + `LAB_Description/GetAllLab_Description`)
}

get_labtestbyid(id){
  return this.http.get(`${environment.API_Base_URL}` + `Consult_LabTest/GetConsult_LabTestByCON_Id?CON_Id=${id}`)
}

Put_Lab(data){
  return this.http.put(`${environment.API_Base_URL}` + `Consult_LabTest/UpdateConsult_LabTest`, data)
}

Get_labdescbyid(id){
  return this.http.get(`${environment.API_Base_URL}` + `LAB_Description/GetLabDescBy_Id?Lab_DescId=${id}`)
}

Delete_labtest(data){
  return this.http.delete(`${environment.API_Base_URL}` + `Consult_LabTest/DeleteConsult_LabTest?Id=${data}`)
}
Put_referral(data){
  return this.http.put(`${environment.API_Base_URL}` + `Consult_LabTest/UpdateConsult_LabTest`, data)
}
Get_menu_claims(data) {
  return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
}
GetConsult_LabTestById(id){
  return this.http.get(`${environment.API_Base_URL}` + `Consult_LabTest/GetConsult_LabTestById?Id=${id}`)
}
}