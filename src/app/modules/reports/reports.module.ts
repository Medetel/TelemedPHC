import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { ReportComponent } from './report/report.component';
import { Route, RouterModule } from '@angular/router';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { ViewDailyReportComponent } from './daily-report/view-daily-report/view-daily-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { GoogleChartsModule } from 'angular-google-charts';
import { sharedModule } from 'src/app/shared/share.module';

const routes:Route[]=[
  {
    path:'',component:ReportsComponent,
    children:[
      {
        path:'report', component:ReportComponent
      },
      {
        path: 'daily-report', component: DailyReportComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    ReportsComponent,
    ReportComponent,
    DailyReportComponent,
    ViewDailyReportComponent
  ],
  providers: [DatePipe],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    sharedModule,
    DataTablesModule,
    MatPaginatorModule,
    GoogleChartsModule,
    MatRadioModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportsModule { }
