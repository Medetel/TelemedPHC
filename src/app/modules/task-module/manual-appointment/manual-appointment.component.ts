import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { AppointmentPatientComponent } from '../appointment/add-appointment/appointment-patient/appointment-patient.component';
import { AddappointmentphcComponent } from '../phc-manual-appoint/addappointmentphc/addappointmentphc.component';
import { ApproveAppoinmentComponent } from './approve-appoinment/approve-appoinment.component';
import { DeleteManualAppointmentComponent } from './delete-manual-appointment/delete-manual-appointment.component';
import { EditManualAppointmentComponent } from './edit-manual-appointment/edit-manual-appointment.component';
import { ManualAppointmentService } from './manual-appointment.service';
import { ViewManualAppointmentComponent } from './view-manual-appointment/view-manual-appointment.component';

@Component({
  selector: 'app-manual-appointment',
  templateUrl: './manual-appointment.component.html',
  styleUrls: ['./manual-appointment.component.scss']
})
export class ManualAppointmentComponent implements OnInit {
  dtOptions = {};
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  TooltipPosition:TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog,private _service:ManualAppointmentService) { }
data:any;
approve(d:any) {
  const dialogRef = this.dialog.open(ApproveAppoinmentComponent,
    {
      height: '100%',
      width: '100%',
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {   
  });
}
newApp(d:any){
  const dialogRef = this.dialog.open(AppointmentPatientComponent,
  {
    height: '100%',
    width: '100%',
    data: this.selection
  });
dialogRef.afterClosed().subscribe(result => {
  
});
}
view(d:any) {
  const dialogRef = this.dialog.open(ViewManualAppointmentComponent,
    {
      height: '100%',
      width: '100%',
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
   
  });
}
edit(d:any) {
  const dialogRef = this.dialog.open(EditManualAppointmentComponent,
    {
      height: '100%',
      width: '100%',
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
  
  });
}
delete(d:any) {
  const dialogRef = this.dialog.open(DeleteManualAppointmentComponent,
    {
      width: "30%",   
      height: "200px",      
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
  
  });
}

  ngOnInit(): void {
    this.speedSearchPatient();
    this.get_appointment();
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
    this._service.Get_menu_claims(28)
      .subscribe((data) => {       
        if (data[0].claimType == 'ManualappointmentAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'ManualappointmentView') {         
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'ManualappointmentEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'ManualappointmentDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'ManualappointmentApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }  
get_appointment(){
  this._service.Get_Appointment()
  .subscribe((data)=>{  
    this.data=data   
  })
}
selection:any=[];
pR_Id:number;
searchText:any;
speedSearchPatient(){
  this._service.speedSearchPatient()
  .subscribe((data:any)=>{
    this.searchText = data
  })
}
}
