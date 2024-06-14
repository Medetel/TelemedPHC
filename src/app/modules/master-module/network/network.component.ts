import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ApproveNetworkComponent } from './approve-network/approve-network.component';
import { DeleteNetworkComponent } from './delete-network/delete-network.component';
import { EditNetworkComponent } from './edit-network/edit-network.component';
import { NetworkService } from './network.service';
import { ViewNetworkComponent } from './view-network/view-network.component';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {
  dtOptions = {};
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private _service: NetworkService) { }
  data: any;
  approve(d: any) {
    const dialogRef = this.dialog.open(ApproveNetworkComponent,
      {
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  view(d: any) {
    const dialogRef = this.dialog.open(ViewNetworkComponent,
      {
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditNetworkComponent,
      {
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteNetworkComponent,
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
    this.get_network();
    this._service.Get_menu_claims(16)
      .subscribe((data) => {       
        if (data[0].claimType == 'NetworkAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'NetworkView') {        
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'NetworkEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'NetworkDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'NetworkApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
  get_network() {
    this._service.Get_network()
      .subscribe((data) => {
        this.data = data
      })
  }
}
