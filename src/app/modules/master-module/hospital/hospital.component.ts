import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ApproveHospitalComponent } from './approve-hospital/approve-hospital.component';
import { DeleteHospitalComponent } from './delete-hospital/delete-hospital.component';
import { EditHospitalComponent } from './edit-hospital/edit-hospital.component';
import { HospitalService } from './hospital.service';
import { ViewHospitalComponent } from './view-hospital/view-hospital.component';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  roleName: string;
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private _service: HospitalService) { }
  data: any;
  approve(d: any) {
    const dialogRef = this.dialog.open(ApproveHospitalComponent,
      {
        height: '60%',
        width: '60%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  view(d: any) {
    const dialogRef = this.dialog.open(ViewHospitalComponent,
      {
        height: '100%',
        width: '100%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditHospitalComponent,
      {
        height: '100%',
        width: '100%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteHospitalComponent,
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
    this.get_hospital();
    this._service.Get_menu_claims(19)
      .subscribe((data) => {
        if (data[0].claimType == 'HospitalAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'HospitalView') {
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'HospitalEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'HospitalDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'HospitalApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
  get_hospital() {
    this._service.Get_hospital()
      .subscribe((data) => {
        this.data = data
      }, (error) => {
      })
  }
}
