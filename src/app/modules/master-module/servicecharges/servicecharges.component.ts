import { Component, OnInit } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ApprovalservicechargeComponent } from './approvalservicecharge/approvalservicecharge.component';
import { DeleteservicechargeComponent } from './deleteservicecharge/deleteservicecharge.component';
import { EditservicechargeComponent } from './editservicecharge/editservicecharge.component';
import { ViewservicechargesComponent } from './viewservicecharges/viewservicecharges.component';
import { ApproveCountryComponent } from '../country/approve-country/approve-country.component';
import { ServicechargeService } from '../servicecharges/servicecharge.service';


@Component({
  selector: 'app-servicecharges',
  templateUrl: './servicecharges.component.html',
  styleUrls: ['./servicecharges.component.scss']
})

export class ServicechargesComponent implements OnInit {
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private _service: ServicechargeService) { }
  data: any;
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  
  approve(d: any) {
    const dialogRef = this.dialog.open(ApproveCountryComponent,
      {
        width: '60%',        
        height: '300px',  
        hasBackdrop: true, 
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  view(d: any) {
    //console.log('view data :' +JSON.stringify(d));
    const dialogRef = this.dialog.open(ViewservicechargesComponent,
      {
        width: '60%',        
        height: '350px',        
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     

    });
  }
  edit(d: any) {
    //console.log('edit data :' +JSON.stringify(d));
    const dialogRef = this.dialog.open(EditservicechargeComponent,
      {            
        width: '60%',        
        height: '350px',      
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  delete(d: any) {
   // console.log('delete data :' +JSON.stringify(d));
    const dialogRef = this.dialog.open(DeleteservicechargeComponent,
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
    setTimeout(function () {
      $(function () {
        $('#user-table').DataTable();
      });
    }, 3000);
    this.Get_Servicecharge(); // get all services
    this._service.Get_menu_claims(17)
      .subscribe((data) => {        
        if (data[0].claimType == 'ServicesAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'ServicesView') {         
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'ServicesEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'ServicesApprove') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'Serviceapprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }

      })
  }
  Get_Servicecharge() {
    this._service.Get_Servicecharge()
    .subscribe((data) => {
      this.data = data
    })
  }
}
