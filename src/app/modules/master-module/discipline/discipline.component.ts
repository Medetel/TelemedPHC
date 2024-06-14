import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ApproveDisciplineComponent } from './approve-discipline/approve-discipline.component';
import { DeleteDisciplineComponent } from './delete-discipline/delete-discipline.component';
import { DisciplineService } from './discipline.service';
import { EditDisciplineComponent } from './edit-discipline/edit-discipline.component';
import { ViewDisciplineComponent } from './view-discipline/view-discipline.component';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private _service: DisciplineService) { }
  data: any;
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  approve(d: any) {
    const dialogRef = this.dialog.open(ApproveDisciplineComponent,
      {       
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  view(d: any) {
    const dialogRef = this.dialog.open(ViewDisciplineComponent,
      {
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditDisciplineComponent,
      {
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteDisciplineComponent,
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
    this.get_designation();
    this._service.Get_menu_claims(13)
      .subscribe((data) => {
       
        if (data[0].claimType == 'DisciplineAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'DisciplineView') {
         
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'DisciplineEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'DisciplineDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'DisciplineApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
  get_designation() {
    this._service.Get_discipline()
      .subscribe((data) => {
        this.data = data
      })
  }
}
