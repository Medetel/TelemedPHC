import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { CallcenterService } from './callcenter.service';
import { ApproveCallcenterComponent } from './approve-callcenter/approve-callcenter.component';
import { DeleteCallcenterComponent } from './delete-callcenter/delete-callcenter.component';
import { EditCallcenterComponent } from './edit-callcenter/edit-callcenter.component';
import { ViewCallcenterComponent } from './view-callcenter/view-callcenter.component';

@Component({
  selector: 'app-callcenter',
  templateUrl: './callcenter.component.html',
  styleUrls: ['./callcenter.component.scss']
})
export class CallcenterComponent implements OnInit {

  dtOptions = {};
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  roleName: string;
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private _service: CallcenterService) { }
  data: any;
  approve(d: any) {
    const dialogRef = this.dialog.open(ApproveCallcenterComponent,
      {
        height: '70%',
        width: '70%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  view(d: any) {
    const dialogRef = this.dialog.open(ViewCallcenterComponent,
      {
        height: '100%',
        width: '100%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditCallcenterComponent,
      {
        height: '100%',
        width: '100%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteCallcenterComponent,
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
    this.get_Callcenter();
    this._service.Get_menu_claims(71)
      .subscribe((data) => {
        if (data[0].claimType == 'SupportAgentAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'SupportAgentView') {
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'SupportAgentEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'SupportAgentDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'SupportAgentApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
  get_Callcenter() {
    this._service.Get_Callcenter()
      .subscribe((data) => {
        this.data = data
      }, (error) => {
      })
  }
}
