import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsModule } from 'ng2-charts';
import {sharedModule} from '../../../shared/share.module'
import { DashboardComponent } from './dashboard.component';
import { TotalGroupsComponent } from './dashpages/total-groups/total-groups.component';
import { DashpageComponent } from './dashpage/dashpage.component';
import { UpcomingGroupComponent } from './dashpages/upcoming-group/upcoming-group.component';
import { RegistrationComponent } from './dashpages/registration/registration.component';
import { EnrollComponent } from './dashpages/enroll/enroll.component';
import { VacanciesComponent } from './dashpages/vacancies/vacancies.component';
import { AuctionsComponent } from './dashpages/auctions/auctions.component';
import { DefaultorComponent } from './dashpages/defaultor/defaultor.component';
import { LeadsGenerationComponent } from './dashpages/leads-generation/leads-generation.component';
import { PaymentPageComponent } from './dashpages/payment-page/payment-page.component';
import { ReceiptsPageComponent } from './dashpages/receipts-page/receipts-page.component';
import { DashboardChangePasswordComponent } from './dashboard-change-password/dashboard-change-password.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      {
        path:'',component:DashpageComponent
      },
      {
        path: 'changepassword', component: DashboardChangePasswordComponent
      },
      {
        path:'total-group',component:DashboardComponent,
        children:[
          {path:'',component:TotalGroupsComponent}
        ]   
      },
      {
        path:'upcoming-group',component:DashboardComponent,
        children:[
          {path:'',component:UpcomingGroupComponent}
        ]   
      },
      {
        path:'registration',component:DashboardComponent,
        children:[
          {path:'',component:RegistrationComponent}
        ]   
      },
      {
        path:'enroll',component:DashboardComponent,
        children:[
          {path:'',component:EnrollComponent}
        ]   
      },
      {
        path:'Vacancies',component:DashboardComponent,
        children:[
          {path:'',component:VacanciesComponent}
        ]   
      },
      {
        path:'auctions',component:DashboardComponent,
        children:[
          {path:'',component:AuctionsComponent}
        ]   
      },
      {
        path:'Defaultor',component:DashboardComponent,
        children:[
          {path:'',component:DefaultorComponent}
        ]   
      },
      {
        path:'Generation',component:DashboardComponent,
        children:[
          {path:'',component:LeadsGenerationComponent}
        ]   
      },
      {
        path:'Payment-page',component:DashboardComponent,
        children:[
          {path:'',component:PaymentPageComponent}
        ]   
      },
      {
        path:'Receipts-page',component:DashboardComponent,
        children:[
          {path:'',component:ReceiptsPageComponent}
        ]   
      },
    ]
  }
]
@NgModule({
  declarations: [DashboardComponent, TotalGroupsComponent, DashpageComponent, UpcomingGroupComponent, RegistrationComponent, EnrollComponent, VacanciesComponent, AuctionsComponent, DefaultorComponent, LeadsGenerationComponent, PaymentPageComponent, ReceiptsPageComponent, DashboardChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    ChartsModule,
    sharedModule,
    DataTablesModule
  ],exports:[]
})
export class DashboardModule { }
