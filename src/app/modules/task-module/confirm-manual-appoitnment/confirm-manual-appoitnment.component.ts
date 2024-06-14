import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ManualAppointmentService } from '../manual-appointment/manual-appointment.service';
import { ViewConsultationComponent } from './view-consultation/view-consultation.component';
import { AppoinmentRejectComponent } from './appoinment-reject/appoinment-reject.component';
import { AppoinmentConfirmComponent } from './appoinment-confirm/appoinment-confirm.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-confirm-manual-appoitnment',
  templateUrl: './confirm-manual-appoitnment.component.html',
  styleUrls: ['./confirm-manual-appoitnment.component.scss']
})
export class ConfirmManualAppoitnmentComponent implements OnInit {
  todaydate_records: [];
  future_records: [];
  today = new Date();
  pipe = new DatePipe('en-US');
  todayDate: any = this.pipe.transform(this.today, 'YYYY-MM-dd');
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog,private _service:ManualAppointmentService) { }
data:any;
view(d:any) {
  const dialogRef = this.dialog.open(ViewConsultationComponent,
    {
      height: '100%',
      width: '100%',
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
   
  });
}
confirm(d:any) {
  const dialogRef = this.dialog.open(AppoinmentConfirmComponent,
    {
      width: "100%",
        maxWidth: "400px",
        height: "auto",
        hasBackdrop: true,
        maxHeight: "700px",
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
   
  });
}
reject(d:any) {
  const dialogRef = this.dialog.open(AppoinmentRejectComponent,
    {
      width: "30%",        
        height: "200px",       
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
   
  });
}
reload(){
  window.location.reload();
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
    this.get_appointment();
  }
get_appointment(){
  this._service.Get_Appointment()
  .subscribe((data)=>{
    this.data = data
    this.todaydate_records = this.data.filter(d => d.select_date <= this.todayDate);
    this.future_records = this.data.filter(d => d.select_date > this.todayDate);     
   
  })
}
}
