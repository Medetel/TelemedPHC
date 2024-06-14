import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormService {

  constructor(private http: HttpClient) { }   
  Create_PayReq(data: any) {
    return this.http.post(`${environment.API_Base_URL}` + `Payment/CreatePayReq_PHC`,data)
   }
  Get_consultant_byId() {
    return this.http.get(`${environment.API_Base_URL}` + `Consultation/Assistant/PayConsultation`)
  }
  GetAllPackages_PHC() {
    return this.http.get(`${environment.API_Base_URL}` + `PriceMaster/GetAllPackages_PHC`)
  }
  InsertPatientPackage_PHC(data: any) {
    return this.http.post(`${environment.API_Base_URL}` + `PriceMaster/InsertPatientPackage_PHC`, data)
  }
  Get_vital_id(cons_pr_id: any, cons_id: any) {
    return this.http.get(`${environment.API_Base_URL}` + `PriceMaster/GetPackagePriceById_PHC?patientid=${cons_pr_id}&con_id=${cons_id}`)
  }
}
