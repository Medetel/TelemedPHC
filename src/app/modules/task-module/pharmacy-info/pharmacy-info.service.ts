import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PharmacyInfoService {
  httpOptions: any;
  constructor(private http: HttpClient) { }
  getall_drugprescription(){
    return this.http.get(`${environment.API_Base_URL}` + `Drug_Prescription/GetAllDrug_Prescription_Pharmacy`)
  }
  GetConsult_DrugPrescriptionById(id){
    return this.http.get(`${environment.API_Base_URL}` + `Drug_Prescription/GetById_Drug_Prescription_Pharmacy?Cons_Id=${id}`)
  }
}
