import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ApproveSpecializationComponent } from './approve-specialization/approve-specialization.component';
import { DeleteSpecilizationComponent } from './delete-specilization/delete-specilization.component';
import { EditSpecilizationComponent } from './edit-specilization/edit-specilization.component';
import { SpecilizationService } from './specilization.service';
import { ViewSpecilizationComponent } from './view-specilization/view-specilization.component';

@Component({
  selector: 'app-specilization',
  templateUrl: './specilization.component.html',
  styleUrls: ['./specilization.component.scss']
})
export class SpecilizationComponent implements OnInit {
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private _service: SpecilizationService) { }
  data: any;
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  approve(d: any) {
    const dialogRef = this.dialog.open(ApproveSpecializationComponent,
      {
        width: '60%',        
        height: '310px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  view(d: any) {
    const dialogRef = this.dialog.open(ViewSpecilizationComponent,
      {
        width: '60%',        
        height: '310px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditSpecilizationComponent,
      {
        width: '60%',        
        height: '310px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteSpecilizationComponent,
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
    this._service.Get_menu_claims(14)
      .subscribe((data) => {
       
        if (data[0].claimType == 'SpecilizationAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'SpecilizationView') {
         
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'SpecilizationEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'SpecilizationDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'SpecilizationApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
  get_designation() {
    this._service.Get_specilization()
      .subscribe((data) => {
        this.data = data
      })
  }
}
