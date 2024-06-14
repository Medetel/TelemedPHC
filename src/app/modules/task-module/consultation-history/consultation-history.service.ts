import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultationHistoryService {

  constructor(private http: HttpClient) { }
  GetConsultationHistory(){
    return this.http.get(`${environment.API_Base_URL}`+`Consultation/GetConsultationHistory`)
  }
}
