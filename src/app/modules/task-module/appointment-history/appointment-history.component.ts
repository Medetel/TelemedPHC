import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ViewManualAppointmentComponent } from '../manual-appointment/view-manual-appointment/view-manual-appointment.component';
import { AppointmentHistoryService } from './appointment-history.service';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.scss']
})
export class AppointmentHistoryComponent implements OnInit {
data: any;
dtOptions = {};
addhid: boolean = false;
viewhid: boolean = false;
edithid: boolean = false;
deletehid: boolean = false;
approveid: boolean = false;
TooltipPosition:TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog,private http:HttpClient, private service:AppointmentHistoryService) { }

  ngOnInit(): void {
    this.GetAppointmentHistory();
    this.dtOptions = {
      dom: 'lBfrtip',
      lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
      scroll: "250px",
      select: true,
      buttons: [
        {
          extend: 'collection',
          className:'btn-primary',
          text: 'Export',
          buttons: [
            {extend:'copy',className:'btn-primary'},
            {extend:'csv',className:'btn-primary'},
            {extend:'excel',className:'btn-primary'},
            {extend:'pdf',className:'btn-primary'},
            {extend:'print',className:'btn-primary'},
            ]   
        },
        {extend:'colvis',
          className:'btn-primary',
          text:'Column Visibility',
         },
      ],
    }
  }
  GetAppointmentHistory(){
    this.service.GetAppointmentHistory().subscribe((data:any)=>{
      this.data=data;
      //console.log('Data',data)

    })
  }
  view(d:any) {
    const dialogRef = this.dialog.open(ViewAppointmentComponent,
      {
        height: '100%',
        width: '100%',
        data: {d}
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

}
