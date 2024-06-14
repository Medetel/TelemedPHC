import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { DeleteDrugsComponent } from './delete-drugs/delete-drugs.component';
import { DrugApprovelComponent } from './drug-approvel/drug-approvel.component';
import { DrugserviceService } from './drugservice.service';
import { EditDrugsComponent } from './edit-drugs/edit-drugs.component';
import { ViewDrugsComponent } from './view-drugs/view-drugs.component';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss']
})
export class DrugsComponent implements OnInit {

  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, public _service: DrugserviceService,) { }
  data: any;
  approve(d: any) {
    const dialogRef = this.dialog.open(DrugApprovelComponent,
      {
        width: '70%',
        height: '500px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  view(d: any) {
    const dialogRef = this.dialog.open(ViewDrugsComponent,
      {
        width: '70%',
        height: '500px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditDrugsComponent,
      {
        width: '70%',
        height: '500px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteDrugsComponent,
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
    this.Get_alldrug();
    this._service.Get_menu_claims(17)
      .subscribe((data) => {       
        if (data[0].claimType == 'DrugsAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'DrugsView') {
        
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'DrugsEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'DrugsDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'DrugsApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
  Get_alldrug() {
    this._service.get_alldrugs()
      .subscribe((data) => {
        this.data = data        
      })
  }

}
