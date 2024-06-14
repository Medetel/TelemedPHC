import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RefundFormService {

  constructor(private http: HttpClient) { }
  getall_refund() {
    return this.http.get(`${environment.API_Base_URL}` + `Payment/GetRequestRefund`)
  }
  RefundReq(data: any) {
    return this.http.post(`${environment.API_Base_URL}` + `Payment/RequestRefund_PHC`, data)
  }

  getall_refund_admin() {
    return this.http.get(`${environment.API_Base_URL}` + `Payment/GetApproveRefund`)
  }
  RefundApprove(data: any) {
    return this.http.post(`${environment.API_Base_URL}` + `Payment/RefundOrder_PHC`, data)
  }
}
