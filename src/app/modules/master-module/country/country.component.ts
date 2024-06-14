import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ApproveCountryComponent } from './approve-country/approve-country.component';
import { CountryService } from './country.service';
import { DeleteCountryComponent } from './delete-country/delete-country.component';
import { EditCountryComponent } from './edit-country/edit-country.component';
import { ViewCountryComponent } from './view-country/view-country.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private _service: CountryService) { }
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
    const dialogRef = this.dialog.open(ViewCountryComponent,
      {
        width: '60%',        
        height: '300px',
        hasBackdrop: true,      
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     

    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditCountryComponent,
      {            
        width: '60%',        
        height: '300px',
        hasBackdrop: true,    
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteCountryComponent,
      {
        width: '30%',        
        height: '200px',
        hasBackdrop: true, 
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
    this.get_allcountry();
    this._service.Get_menu_claims(6)
      .subscribe((data) => {        
        if (data[0].claimType == 'CountryAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'CountryView') {         
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'CountryEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'CountryDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'CountryApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }

      })
  }
  get_allcountry() {
    this._service.Get_country()
      .subscribe((data) => {
        this.data = data
      })
  }

}
