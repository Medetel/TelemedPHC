import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Console } from 'console';
import { filter } from 'lodash';
import { CounsultationService } from './counsultation.service';
import { DeleteconsultComponent } from './deleteconsult/deleteconsult.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent implements OnInit {
  dtOptions = {};
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private service: CounsultationService, private router: Router) { }
  data:any;
  todaydate_records: [];
  future_records: [];
  today = new Date();
  pipe = new DatePipe('en-US');
  todayDate:any = this.pipe.transform(this.today, 'YYYY-MM-dd');
  
  reload() {
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
    this.get_allconsultaion();
    this.service.Get_menu_claims(31)
    .subscribe((data) => {     
      if (data[0].claimType == 'ConsultationappointmentAdd') {
        if (data[0].claimValue == true)
          this.addhid = false;
        else
          this.addhid = true;
      }
      if (data[1].claimType == 'ConsultationappointmentView') {       
        if (data[1].claimValue == true)
          this.viewhid = false;
        else
          this.viewhid = true;
      }
      if (data[2].claimType == 'ConsultationappointmentEdit') {
        if (data[2].claimValue == true)
          this.edithid = false;
        else
          this.edithid = true;
      }
      if (data[3].claimType == 'ConsultationappointmentDelete') {
        if (data[3].claimValue == true)
          this.deletehid = false;
        else
          this.deletehid = true;
      }
      if (data[4].claimType == 'ConsultationappointmentApprove') {
        if (data[4].claimValue == true)
          this.approveid = false;
        else
          this.approveid = true;
      }
    })
  }

  get_allconsultaion() {
    this.service.Get_consultation()
      .subscribe((data) => {
        this.data = data         
        this.todaydate_records=this.data.filter(d=> d.coN_ConsultedDate<=this.todayDate);       
        this.future_records=this.data.filter(d=> d.coN_ConsultedDate>this.todayDate);      
      })
  }

  get_appoinment() {
    this.service.Get_appoinment()
      .subscribe((data) => {
        this.data = data       
      })
  }

  Appointment(d:any) {   
    this.router.navigate(['/base/task/consultation/consult/' + d.coN_Id + '/patienthistory/' + d.coN_PR_Id_FK]);
  }
  
  delete(d:any) {
    const dialogRef = this.dialog.open(DeleteconsultComponent,
      {
        width: "30%",         
          height: "200px",
         
        data: {d}
      });
    dialogRef.afterClosed().subscribe(result => {     

    });
  }

}
