import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { AppointmentService } from '../appointment.service';
import { AppointmentPatientComponent } from './appointment-patient/appointment-patient.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';


@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {
  dtOptions = {};
  data:any;
  TooltipPosition:TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog,private _service:AppointmentService) { }

  

view(d:any) {
  const dialogRef = this.dialog.open(ViewPatientComponent,
    {
      height: '100%',
      width: '100%',
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
    
  });
}
Appointment(d:any) {
  const dialogRef = this.dialog.open(AppointmentPatientComponent,
    {
      height: '100%',
      width: '100%',
      hasBackdrop:true,
      data: {d}
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
    this.get_patient();
  }
get_patient(){
  this._service.Get_Patient()
  .subscribe((data)=>{
    this.data=data
  })
}
}
