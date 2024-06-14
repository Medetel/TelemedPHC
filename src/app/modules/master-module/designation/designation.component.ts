import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ApproveDesignationComponent } from './approve-designation/approve-designation.component';
import { DeleteDesignationComponent } from './delete-designation/delete-designation.component';
import { DesignationService } from './designation.service';
import { EditDesignationComponent } from './edit-designation/edit-designation.component';
import { ViewDesignationComponent } from './view-designation/view-designation.component';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private _service: DesignationService) { }
  data: any;
  approve(d: any) {
    const dialogRef = this.dialog.open(ApproveDesignationComponent,
      {        
        width: '60%',        
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }
  view(d: any) {
    const dialogRef = this.dialog.open(ViewDesignationComponent,
      {
        width: '60%',        
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditDesignationComponent,
      {
        width: '60%',        
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteDesignationComponent,
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
    this._service.Get_menu_claims(12)
      .subscribe((data) => {       
        if (data[0].claimType == 'DesignationAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'DesignationView') {         
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'DesignationEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'DesignationDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'DesignationApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
  get_designation() {
    this._service.Get_designation()
      .subscribe((data) => {
        this.data = data        
      })
  }
}
