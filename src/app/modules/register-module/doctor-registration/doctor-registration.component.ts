import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ApproveDoctorRegComponent } from './approve-doctor-reg/approve-doctor-reg.component';
import { DeleteDoctorRegistrationComponent } from './delete-doctor-registration/delete-doctor-registration.component';
import { DoctorRegistrationService } from './doctor-registration.service';
import { EditDoctorRegistrationComponent } from './edit-doctor-registration/edit-doctor-registration.component';
import { ViewDoctorRegistrationComponent } from './view-doctor-registration/view-doctor-registration.component';
import { Notification } from 'src/app/core/Notifications/Notification';
@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.scss']
})
export class DoctorRegistrationComponent implements OnInit {
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  roleName: string;
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(private notif: Notification, public dialog: MatDialog, private _service: DoctorRegistrationService) { }
  data: any;
  approve(d: any) {
    const dialogRef = this.dialog.open(ApproveDoctorRegComponent,
      {
        height: '70%',
        width: '70%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  view(d: any) {
    const dialogRef = this.dialog.open(ViewDoctorRegistrationComponent,
      {
        height: '100%',
        width: '100%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditDoctorRegistrationComponent,
      {
        height: '100%',
        width: '100%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteDoctorRegistrationComponent,
      {
        width: "30%",

        height: "200px",

        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  reload() {
    window.location.reload();
  }

  isAdmin(): boolean {
    return this.roleName === "Admin";
  }
  ngOnInit(): void {
    this.roleName = localStorage.getItem('roleName') || '';
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
    this.get_doctor();
    this._service.Get_menu_claims(21)
      .subscribe((data) => {
        if (data[0].claimType == 'DoctorAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'DoctorView') {

          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'DoctorEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'DoctorDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'DoctorApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
  get_doctor() {
    this._service.Get_Doctor()
      .subscribe((data) => {
        this.data = data
      })
  }

}
