import { Component, OnInit } from '@angular/core';
import { ConsultationWbViewComponent } from './consultation-wb-view/consultation-wb-view.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ConsultationHistoryWbService } from './consultation-history-wb.service';

@Component({
  selector: 'app-consultation-history-wb',
  templateUrl: './consultation-history-wb.component.html',
  styleUrls: ['./consultation-history-wb.component.scss']
})
export class ConsultationHistoryWbComponent implements OnInit {
  data: any;
  dtOptions = {};
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private http: HttpClient, private service: ConsultationHistoryWbService) { }

  ngOnInit(): void {
    this.GetConsultationHistory();
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
  GetConsultationHistory() {
    this.service.GetConsultationHistory().subscribe((data: any) => {
      this.data = data;
      //console.log('Data',data)

    })
  }
  view(d: any) {
    const dialogRef = this.dialog.open(ConsultationWbViewComponent,
      {
        height: '100%',
        width: '100%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

}

