import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ApproveDiagnosisComponent } from './approve-diagnosis/approve-diagnosis.component';
import { DeleteDiagnosisComponent } from './delete-diagnosis/delete-diagnosis.component';
import { EditDiagnosisComponent } from './edit-diagnosis/edit-diagnosis.component';
import { ViewDiagnosisComponent } from './view-diagnosis/view-diagnosis.component';
import { DiagnosisService } from './diagnosis.service';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private _service: DiagnosisService) { }
  data: any;
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  approve(d: any) {
    const dialogRef = this.dialog.open(ApproveDiagnosisComponent,
      {
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  view(d: any) {
    const dialogRef = this.dialog.open(ViewDiagnosisComponent,
      {
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditDiagnosisComponent,
      {
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteDiagnosisComponent,
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
    this.GetAll_diagnosis();
    this._service.Get_menu_claims(65)
      .subscribe((data) => {

        if (data[0].claimType == 'DiagnosisAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'DiagnosisView') {

          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'DiagnosisEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'DiagnosisDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'DiagnosisApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
  GetAll_diagnosis() {
    this._service.GetAll_diagnosis()
      .subscribe((data) => {
        this.data = data
      })
  }

}
