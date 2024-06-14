import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { color } from 'd3';
import { PHCManualAppointService } from '../phc-manual-appoint.service';
import { AddappointmentphcComponent } from './addappointmentphc/addappointmentphc.component';
import { ApproveAppoinmentphcComponent } from './approve-appoinmentphc/approve-appoinmentphc.component';
import { AssignAppointmentphcComponent } from './assign-appointmentphc/assign-appointmentphc.component';
import { DeletePhcManualAppoinmentComponent } from './delete-phc-manual-appoinment/delete-phc-manual-appoinment.component';
import { EditPhcManualAppoinmentComponent } from './edit-phc-manual-appoinment/edit-phc-manual-appoinment.component';
import { ViewPhcManualAppoinmentComponent } from './view-phc-manual-appoinment/view-phc-manual-appoinment.component';

@Component({
  selector: 'app-phc-manual-appoint',
  templateUrl: './phc-manual-appoint.component.html',
  styleUrls: ['./phc-manual-appoint.component.scss']
})

export class PHCManualAppointComponent implements OnInit {
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  dtOptions = {};
  TooltipPosition:TooltipPosition[] = ['above'];
  searchTextData: any;

  constructor(public dialog: MatDialog,private _service:PHCManualAppointService) { }
data:any;
approve(d:any) {
  const dialogRef = this.dialog.open(ApproveAppoinmentphcComponent,
    {
      height: '100%',
      width: '100%',
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
   
  });
}
assign(d:any) {
  const dialogRef = this.dialog.open(AssignAppointmentphcComponent,
    {
      height: '50%',
      width: '50%',
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
   
  });
}

newApp(d:any){
    const dialogRef = this.dialog.open(AddappointmentphcComponent,
    {
      height: '100%',
      width: '100%',
      data: this.selection
    });
  dialogRef.afterClosed().subscribe(result => {
    
  });
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
addAppointment(d:any) {
  const dialogRef = this.dialog.open(AddappointmentphcComponent,
    {
      height: '100%',
      width: '100%',
      hasBackdrop:true,
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
   
  });
}
edit(d:any) {
  const dialogRef = this.dialog.open(EditPhcManualAppoinmentComponent,
    {
      height: '100%',
      width: '100%',
      data: {d},
    });
  dialogRef.afterClosed().subscribe(result => {
  
  });
}
delete(d:any) {
  const dialogRef = this.dialog.open(DeletePhcManualAppoinmentComponent,
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
    this.speedSearchPatient();
    this.get_appointment();
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
    this._service.Get_menu_claims(29)
      .subscribe((data) => {       
        if (data[0].claimType == 'ManualappointmentphcAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'ManualappointmentphcView') {
         
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'ManualappointmentphcEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'ManualappointmentphcDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'ManualappointmentphcApprove') {
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
