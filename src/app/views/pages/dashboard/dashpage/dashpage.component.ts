import { Component, OnInit } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { data } from 'jquery';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashpage',
  templateUrl: './dashpage.component.html',
  styleUrls: ['./dashpage.component.scss']
})
export class DashpageComponent implements OnInit {
  data: any;
  patientcont: any;
  networkhospital: any;
  hospital: any;
  pharmacy: any;
  referal: any;
  diagnostic: any;
  today_apptn: any;
  total_apptn: any;
  todayconsult: any;
  total_consult: any;
  result: any;
  referal_count: any;
  doctor_count: any;
  patient_count: any;
  network_hospital_count: any;
  hospital_count: any;
  pharmacy_count: any;
  diagnostic_count: any;
  appointment_count: any;
  today_appointment_count: any;
  today_consultation_count: any;
  consultation_count: any;
  roleName: any;
  total_patient_count: any;
  today_patient_count: any;
  today_phcAppointment_count: any;
  total_phcAppointment_count: any;
  today_patient_payments_count: any;
  total_patient_payments_amount: any;
  today_patient_payments_amount: any;
  total_consultation_count: any;
  today_completed_consultation_count: any;
  today_pending_consultation_count: any;
  refund_count: any;
  total_phcappointment_count: any;
  today_approved_appointment_count: any;
  today_pending_appointment_count: any;
  doctor_fee_amount: any;
  today_doctor_amount: any;
  total_pending_consultation_count: any;
  constructor(private service: DashboardService,) { }

  ngOnInit(): void {
    //saheb   
    this.GetDashboardData();
    this.roleName = localStorage.getItem('roleName');
  }

  GetDashboardData() {
    this.service.Get_Dashboard_Data()
      .subscribe((data) => {
        this.result = data;
        this.doctor_count = this.result[0].doctor_count;
        this.patient_count = this.result[0].patient_count;
        this.network_hospital_count = this.result[0].network_hospital_count;
        this.hospital_count = this.result[0].hospital_count;
        this.pharmacy_count = this.result[0].pharmacy_count;
        this.diagnostic_count = this.result[0].diagnostic_count;
        this.appointment_count = this.result[0].appointment_count;
        this.today_appointment_count = this.result[0].today_appointment_count;
        this.today_consultation_count = this.result[0].today_consultation_count;
        this.consultation_count = this.result[0].consultation_count;
        this.referal_count = this.result[0].referal_count;
        this.total_patient_count = this.result[0].total_patient_count;
        this.today_patient_count = this.result[0].today_patient_count;
        this.today_phcAppointment_count = this.result[0].today_phcAppointment_count;
        this.total_phcAppointment_count = this.result[0].total_phcAppointment_count;
        this.today_patient_payments_count = this.result[0].today_patient_payments_count;
        this.total_patient_payments_amount = this.result[0].total_patient_payments_amount;
        this.today_patient_payments_amount = this.result[0].today_patient_payments_amount;
        this.total_consultation_count = this.result[0].total_consultation_count;
        this.today_completed_consultation_count = this.result[0].today_completed_consultation_count;
        this.today_pending_consultation_count = this.result[0].today_pending_consultation_count;
        this.refund_count = this.result[0].refund_count;
        this.total_phcappointment_count = this.result[0].total_phcappointment_count;
        this.today_approved_appointment_count = this.result[0].today_approved_appointment_count;
        this.today_pending_appointment_count = this.result[0].today_pending_appointment_count;
        // this.total_consultation_count = this.result[0].referal_count;
        // this.today_completed_consultation_count = this.result[0].referal_count;
        // this.today_pending_consultation_count = this.result[0].referal_count;
        this.doctor_fee_amount = this.result[0].doctor_fee_amount;
        this.today_doctor_amount = this.result[0].today_doctor_amount;
        this.total_pending_consultation_count = this.result[0].total_pending_consultation_count;
      })
  }

}