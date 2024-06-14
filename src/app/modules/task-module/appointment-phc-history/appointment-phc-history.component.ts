import { Component, OnInit } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { AppointmentPhcHistoryService } from './appointment-phc-history.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewPhcManualAppoinmentComponent } from '../phc-manual-appoint/view-phc-manual-appoinment/view-phc-manual-appoinment.component';


@Component({
  selector: 'app-appointment-phc-history',
  templateUrl: './appointment-phc-history.component.html',
  styleUrls: ['./appointment-phc-history.component.scss']
})
export class AppointmentPHCHistoryComponent implements OnInit {
  data: any;
dtOptions = {};
addhid: boolean = false;
viewhid: boolean = false;
edithid: boolean = false;
deletehid: boolean = false;
approveid: boolean = false;
TooltipPosition:TooltipPosition[] = ['above'];
  constructor( public dialog: MatDialog,private service:AppointmentPhcHistoryService) { }

  ngOnInit(): void {
    this.getAppointmentPHC_history();
    this.dtOptions = {
      dom: 'lBfrtip',
      lengthMenu: [[3,5, 10, 20, -1], [3,5, 10, 20, "All"]],
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
  getAppointmentPHC_history(){
    this.service.GetAppointmentPHCHistory().subscribe((data:any)=>{
this.data=data;
console.log('PHC Data', data)
  })

}
view(d:any) {
  const dialogRef = this.dialog.open(ViewPhcManualAppoinmentComponent,
    {
      height: '100%',
      width: '100%',
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
    
  });
}
}
