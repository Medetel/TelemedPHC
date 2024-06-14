import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ManualAppointmentService } from '../manual-appointment.service';
import { FixAppointmentComponent } from './fix-appointment/fix-appointment.component';
import { ViewPatientManualComponent } from './view-patient-manual/view-patient-manual.component';

@Component({
  selector: 'app-manual-appointment-add',
  templateUrl: './manual-appointment-add.component.html',
  styleUrls: ['./manual-appointment-add.component.scss']
})
export class ManualAppointmentAddComponent implements OnInit {
  dtOptions = {};
  data:any;
  messagedong:string;
  TooltipPosition:TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog,private _service:ManualAppointmentService) { }

view(d:any) {
  const dialogRef = this.dialog.open(ViewPatientManualComponent,
    {
      height: '100%',
      width: '100%',
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
    
  });
}
Appointment(d:any) {
  const dialogRef = this.dialog.open(FixAppointmentComponent,
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
