import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ViewDiagnosticComponent } from './view-diagnostic/view-diagnostic.component';
import { EditDiagnosticComponent } from './edit-diagnostic/edit-diagnostic.component';
import { DeleteDiagnosticComponent } from './delete-diagnostic/delete-diagnostic.component';
import { DiagnosticService } from './diagnostic.service';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss']
})
export class DiagnosticComponent implements OnInit {
  dtOptions = {};
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  roleName: string;
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private _service: DiagnosticService) { }

  data: any;
  view(d: any) {
    const dialogRef = this.dialog.open(ViewDiagnosticComponent,
      {
        height: '100%',
        width: '100%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditDiagnosticComponent,
      {
        height: '100%',
        width: '100%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteDiagnosticComponent,
      {
        width: "30%",
        maxHeight: "200px",
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
    this.get_diagnostic();
    this._service.Get_menu_claims(23)
      .subscribe((data) => {
        if (data[0].claimType == 'Diag.CenterAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'Diag.CenterView') {
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'Diag.CenterEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'Diag.CenterDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'Diag.CenterApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
  get_diagnostic() {
    this._service.Get_diagnostic()
      .subscribe((data) => {
        this.data = data
      }, (error) => {
      })
  }
}
