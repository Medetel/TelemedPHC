import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { SpecialistDoctorService } from './specialist-doctor.service';
import { ViewSpecialistDoctorComponent } from './view-specialist-doctor/view-specialist-doctor.component';
import { ApproveSpecialistDoctorComponent } from './approve-specialist-doctor/approve-specialist-doctor.component';
import { DeleteSpecialistDoctorComponent } from './delete-specialist-doctor/delete-specialist-doctor.component';
import { EditSpecialistDoctorComponent } from './edit-specialist-doctor/edit-specialist-doctor.component';

@Component({
  selector: 'app-specialist-doctor',
  templateUrl: './specialist-doctor.component.html',
  styleUrls: ['./specialist-doctor.component.scss']
})
export class SpecialistDoctorComponent implements OnInit {
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private _service: SpecialistDoctorService) { }
  data: any;
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  approve(d: any) {
    const dialogRef = this.dialog.open(ApproveSpecialistDoctorComponent,
      {
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  view(d: any) {
    const dialogRef = this.dialog.open(ViewSpecialistDoctorComponent,
      {
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditSpecialistDoctorComponent,
      {
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteSpecialistDoctorComponent,
      {
        width: '30%',
        height: '200px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
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
    this.GetAll_specialistdoc();
    this._service.Get_menu_claims(64)
      .subscribe((data) => {

        if (data[0].claimType == 'SpecilistdoctorAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'SpecilistdoctorView') {

          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'SpecilistDoctorEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'SpecilistDoctorDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'SpecilistDoctorApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
  GetAll_specialistdoc() {
    this._service.GetAll_specialistdoc()
      .subscribe((data) => {
        this.data = data
      })
  }

}
