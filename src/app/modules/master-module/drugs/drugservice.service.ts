import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DrugserviceService {

  constructor(private http: HttpClient) { }

  Post_drug(data) {
    return this.http.post(`${environment.API_Base_URL}` + `DrugMaster/InsertDrugMaster`, data)
  }

  get_unitsbydd() {
    return this.http.get(`${environment.API_Base_URL}` + `DrugCategory/GetDD_Drug_Unit`)
  }

  get_typebydd() {
    return this.http.get(`${environment.API_Base_URL}` + `DrugCategory/GetDrug_Type_DD`)
  }

  get_alldrugs() {
    return this.http.get(`${environment.API_Base_URL}` + `DrugMaster/GetAllDrugMaster`)
  }

  Put_drug(data) {
    return this.http.put(`${environment.API_Base_URL}` + `DrugMaster/UpdateDrugMaster`, data)
  }

  Delete_drug(data) {
    return this.http.delete(`${environment.API_Base_URL}` + `DrugMaster/DeleteDrugMaster?Id=${data}`)
  }

  Approve_drug(data) {
    return this.http.put(`${environment.API_Base_URL}` + `DrugMaster/ApproveDrugMaster`, data)
  }

  get_manufactdd() {
    return this.http.get(`${environment.API_Base_URL}` + `Drug_Manufacturer/GetDrug_Manufacturer_DD`)
  }

  Get_menu_claims(data) {
    return this.http.get(`${environment.API_Base_URL}` + `AllowedMenus/GetAllowedFunction?submenuid=${data}`)
  }
 get_categoryDD(){
    return this.http.get(`${environment.API_Base_URL}` + `DrugCategory/GetDrug_Category_DD`)
 }
 Get_drugmastdd(id) {
  return this.http.get(`${environment.API_Base_URL}` + `Drug_Prescription/Getdrugname_Drugcatid?Drg_Category_Id=${id}`)
}
}
