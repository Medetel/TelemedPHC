import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ApprovelDistricComponent } from './approvel-distric/approvel-distric.component';
import { DeleteDistrictComponent } from './delete-district/delete-district.component';
import { DistrictService } from './district.service';
import { EditDistrictComponent } from './edit-district/edit-district.component';
import { ViewDistrictComponent } from './view-district/view-district.component';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {

  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  approveid: boolean = false;
  constructor(public dialog: MatDialog, private _service: DistrictService) { }
  data: any;
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approve(d: any) {
    const dialogRef = this.dialog.open(ApprovelDistricComponent,
      {
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  view(d: any) {
    const dialogRef = this.dialog.open(ViewDistrictComponent,
      {
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditDistrictComponent,
      {
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteDistrictComponent,
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
    this.get_allstate();
    this._service.Get_menu_claims(8)
      .subscribe((data) => {       
        if (data[0].claimType == 'DistrictAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'DistrictView') {
         
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'DistrictEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'DistrictDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'DistrictApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
  get_allstate() {
    this._service.Get_alldistrict()
      .subscribe((data) => {
        this.data = data
      })
  }
}
