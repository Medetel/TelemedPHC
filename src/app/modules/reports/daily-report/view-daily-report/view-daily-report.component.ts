import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { LabInfoService } from 'src/app/modules/task-module/lab-info/lab-info.service';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
import { DailyReportService } from '../daily-report.service';

@Component({
  selector: 'app-view-daily-report',
  templateUrl: './view-daily-report.component.html',
  styleUrls: ['./view-daily-report.component.scss']
})
export class ViewDailyReportComponent implements OnInit {
  page_title: any;
  report: any;
  userdata: any;


  download() {
    const element = document.getElementById('print-section');

    html2canvas(element, {
      scale: 2,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;
      doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      const reportType = this._data.reportType;
      const selecteddate = this.datePipe.transform(this._data.selectedDate, "yyyy-MM-dd")

      // const Filename = "Labtest-" + this._data.d.coN_Id + ".pdf";

      // Define the filename based on the report type
      let filename = '';
      if (reportType === 'Patient Details') {
        filename = 'Patient Details' + selecteddate + '.pdf';
      } else if (reportType === 'Phc Appoinment Details') {
        filename = 'Phc Appoinment Details' + selecteddate + '.pdf';
      } else if (reportType === 'Payment Details') {
        filename = 'Payment details' + selecteddate + '.pdf';
      } else if (reportType === 'Refund Details') {
        filename = 'Refund details' + selecteddate + '.pdf';
      }
      doc.save(filename);
    });
  }






  constructor(private datePipe: DatePipe, @Inject(MAT_DIALOG_DATA) private _data: any, private service: DailyReportService, private http: HttpClient) { }



  printThisPage() {
    window.print();
  }

  ngOnInit(): void {
    // console.log('main data :' + this.datePipe.transform(this._data.selectedDate, "yyyy-MM-dd"))
    const selecteddate = this.datePipe.transform(this._data.selectedDate, "yyyy-MM-dd")
    console.log('Selected Date:', selecteddate);
    this.service.GetDailyReport(this._data.reportType, selecteddate).subscribe((data: any) => {
      this.report = data;     
    })
    this.get_profile();
  }


  get_profile() {
    this.service.Get_Userprofile()
      .subscribe((data) => {
        this.userdata = data;
      })
  }
  //${this.service_Id}

  printForm(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=700,width=700');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>${this.page_title}</title>         
          <style>
          .form{
            background: #f2f2f2;
            border: 0px solid #ccc;
            padding:20px;
        }  
              
        .awardtable{
            margin-top: -10px;
        }
        
        .awardtable td{
            padding:5px;
            font-size:15px;
        }
        
        .form .container{
            background: #fff;
        }      
        
        .padding0{
            padding:0;
        }
        
        .form-label{
            /* font-size:12px;
            display: block;
            padding:10px 0px 0px 0px;
            color:#aaa; */
            font-size: 16px;
            width: 44%;
            display: inline-block;
            color: #797878;
        }
        
        .data{
            font-size: 16px;
            display: inline-block;
            width: 50%;
            padding: 5px;
            vertical-align: middle;
        }   
        
        
        .sub-title{
            font-size:18px;
            padding-left:20px;
            text-decoration: underline;
        }
        
        .row{
            padding:10px;
        }
        
        .row:nth-child(odd){
            background:#ffffff;
        }
        
        .table-header{
            background: grey;
            color: #fff;
        }
        
        .highlight-row{
            background:#f1ecec;
        }
        
        .sticky-back{
            position: fixed;
            left: 65px;
            top: 165px;
            z-index: 100;
        }
        
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );

    popupWin.document.close();
  }
}

