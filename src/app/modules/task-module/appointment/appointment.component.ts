import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { AppointmentPatientComponent } from './add-appointment/appointment-patient/appointment-patient.component';
import { ViewPatientComponent } from './add-appointment/view-patient/view-patient.component';
import { AppointmentService } from './appointment.service';
import { ApprvAppointmentComponent } from './apprv-appointment/apprv-appointment.component';
import { DltAppointmentComponent } from './dlt-appointment/dlt-appointment.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  dtOptions = {};
  TooltipPosition:TooltipPosition[] = ['above'];
  addhid: boolean= false;
  viewhid: boolean= false;
  edithid: boolean= false;
  deletehid: boolean= false;
  approveid: boolean= false;
  videocall: boolean= false;
  
  constructor(public dialog: MatDialog,private _service:AppointmentService) { }
data:any;
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

approve(d:any) {
    const dialogRef = this.dialog.open(ApprvAppointmentComponent,
      {
        height: '100%',
        width: '100%',
        data: {d}
      });
    dialogRef.afterClosed().subscribe(result => {     
    });
  }

  delete(d:any) {
    const dialogRef = this.dialog.open(DltAppointmentComponent,
      {
        width: "30%",       
        height: "200px",        
        data: {d}
      });
    dialogRef.afterClosed().subscribe(result => {      
    //   setTimeout(() => {
    //     window.location.reload();
    // }, 700);
    });
  }


Appointment(d:any) {
  const dialogRef = this.dialog.open(AppointmentPatientComponent,
    {
      height: '100%',
      width: '100%',
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
    this.Get_Approval_detail();
    this._service.Get_menu_claims(27)
    .subscribe((data) => {      
      if (data[0].claimType == 'AppointmentAdd') {
        if (data[0].claimValue == true)
          {
			this.addhid = false;
			this.videocall=false;
		}  
        else
        {
          this.addhid = true;
          this.videocall=true;
        }
      }
      if (data[1].claimType == 'AppointmentView') {       
        if (data[1].claimValue == true)
          this.viewhid = false;
        else
          this.viewhid = true;
      }
      if (data[2].claimType == 'AppointmentEdit') {
        if (data[2].claimValue == true)
          this.edithid = false;
        else
          this.edithid = true;
      }
      if (data[3].claimType == 'AppointmentDelete') {
        if (data[3].claimValue == true)
          this.deletehid = false;
        else
          this.deletehid = true;
      }
      if (data[4].claimType == 'AppointmentApprove') {
        if (data[4].claimValue == true)
          this.approveid = false;
        else
          this.approveid = true;
      }
    })

   
  }

  Get_Approval_detail(){
    // console.log("Appointment Page hit")
    this._service.Get_Approval_detail()
    .subscribe((data)=>{
      this.data=data
      console.log('appt data :' +JSON.stringify(this.data))
      
    })
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
