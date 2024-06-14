import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { DeletePatientRegistrationComponent } from './delete-patient-registration/delete-patient-registration.component';
import { EditPatientRegistrationComponent } from './edit-patient-registration/edit-patient-registration.component';
import { PatientRegistrationService } from './patient-registration.service';
import { ViewPatientRegistrationComponent } from './view-patient-registration/view-patient-registration.component';
import { MessageboxComponent } from './messagebox/messagebox.component';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent implements OnInit {

  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  dtOptions = {};
  TooltipPosition:TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private _service: PatientRegistrationService) { }
  data: any;
  
  // openPatientVideo() {
  //   this._service.openVideo('kumar');
  // }

  // openDoctorVideo() {
  //   this._service.openVideo('kumar1');
  // }
view(d:any) {
  const dialogRef = this.dialog.open(ViewPatientRegistrationComponent,
    {
      height: '100%',
      width: '100%',
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
       
  });
}
edit(d:any) {
  const dialogRef = this.dialog.open(EditPatientRegistrationComponent,
    {
      height: '100%',
      width: '100%',
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
   
  });
}
delete(d:any) {
  const dialogRef = this.dialog.open(DeletePatientRegistrationComponent,
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
    this.get_patient();
    this._service.Get_menu_claims(24)
      .subscribe((data) => {
      
        if (data[0].claimType == 'PatientRegistrationAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'PatientRegistrationView') {
        
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'PatientRegistrationEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'PatientRegistrationDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'PatientRegistrationApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
get_patient(){
  this._service.Get_Patient()
  .subscribe((data)=>{
    this.data=data    
  // },(error)=>{
  })
}
} 
