import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { LabInfoService } from '../../task-module/lab-info/lab-info.service';
import { Notification } from 'src/app/core/Notifications/Notification';
import { ViewDailyReportComponent } from './view-daily-report/view-daily-report.component';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss']
})
export class DailyReportComponent implements OnInit {
  dtOptions = {};
  mainData: any;
  data: any;
  id: any;
  selectedDate: Date;
  dateSelected: boolean = false;
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private notif: Notification, public dialog: MatDialog) {

  }


  viewReport(reportType: string) {
    if (!this.dateSelected) {
      this.notif.errorsmsg("Please Select Date field")
      return;
    }

    // Proceed with viewing the report based on the report type
    switch (reportType) {
      case 'Patient Details':
        this.view1(this.selectedDate);
        break;
      case 'Phc Appoinment Details':
        this.view2(this.selectedDate);
        break;
      case 'Payment Details':
        this.view3(this.selectedDate);
        break;
      case 'Refund Details':
        this.view4(this.selectedDate);
        break;
      default:
        break;
    }
  }

  view1(selectedDate: Date) {
    const reportType = 'Patient Details';
    console.log("Hello" + selectedDate)
    const dialogRef = this.dialog.open(ViewDailyReportComponent,
      {
        height: '100%',
        width: '100%',
        data: { selectedDate: selectedDate, reportType },
      });

    dialogRef.afterClosed().subscribe(result => {

    });

  }
  view2(selectedDate: Date) {
    const reportType = 'Phc Appoinment Details';
    console.log("Hello" + selectedDate)
    const dialogRef = this.dialog.open(ViewDailyReportComponent,
      {
        height: '100%',
        width: '100%',
        data: { selectedDate: selectedDate, reportType },
      });

    dialogRef.afterClosed().subscribe(result => {

    });

  }
  view3(selectedDate: Date) {
    const reportType = 'Payment Details';
    console.log("Hello" + selectedDate)
    const dialogRef = this.dialog.open(ViewDailyReportComponent,
      {
        height: '100%',
        width: '100%',
        data: { selectedDate: selectedDate, reportType },
      });

    dialogRef.afterClosed().subscribe(result => {

    });

  }
  view4(selectedDate: Date) {
    const reportType = 'Refund Details';
    console.log("Hello" + selectedDate)
    const dialogRef = this.dialog.open(ViewDailyReportComponent,
      {
        height: '100%',
        width: '100%',
        data: { selectedDate: selectedDate, reportType },
      });

    dialogRef.afterClosed().subscribe(result => {

    });

  }


  ngOnInit(): void {
    this.dtOptions = {
      dom: 'lBfrtip',
      lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
      scroll: "250px",
      select: true,
      buttons: [
        {
          extend: 'collection',
          className: 'btn-primary',
          text: 'Export',
          buttons: [
            { extend: 'copy', className: 'btn-primary' },
            { extend: 'csv', className: 'btn-primary' },
            { extend: 'excel', className: 'btn-primary' },
            { extend: 'pdf', className: 'btn-primary' },
            { extend: 'print', className: 'btn-primary' },
          ]
        },
        {
          extend: 'colvis',
          className: 'btn-primary',
          text: 'Column Visibility',
        },
      ],
    }
  }

  onDateChange(event: any): void {
    this.selectedDate = event.value;
    this.dateSelected = true;
  }




}