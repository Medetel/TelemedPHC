import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ApproveDiagnostictestComponent } from './approve-diagnostictest/approve-diagnostictest.component';
import { DeleteDiagnostictestComponent } from './delete-diagnostictest/delete-diagnostictest.component';
import { DiagnostictestService } from './diagnostictest.service';
import { EditDiagnostictestComponent } from './edit-diagnostictest/edit-diagnostictest.component';
import { ViewDiagnostictestComponent } from './view-diagnostictest/view-diagnostictest.component';

@Component({
  selector: 'app-diagnostic-test',
  templateUrl: './diagnostic-test.component.html',
  styleUrls: ['./diagnostic-test.component.scss']
})
export class DiagnosticTestComponent implements OnInit {
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  data: any;
  constructor(public dialog: MatDialog, private service: DiagnostictestService) { }

  ngOnInit(): void {
    this.get_Diagnostictstall();
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
    this.service.Get_menu_claims(18)
      .subscribe((data) => {       
        if (data[0].claimType == 'DiagnosticTestAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'DiagnosticTestView') {          
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'DiagnosticTestEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'DiagnosticTestDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'DiagnosticTestApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }

  get_Diagnostictstall() {
    this.service.Get_Diagnosticttstall()
      .subscribe((data) => {
        this.data = data
      })
  }

  approve(d: any) {
    const dialogRef = this.dialog.open(ApproveDiagnostictestComponent,
      {
        width: '60%',        
        height: '350px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  view(d: any) {
    const dialogRef = this.dialog.open(ViewDiagnostictestComponent,
      {
        width: '60%',        
        height: '350px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditDiagnostictestComponent,
      {
        width: '60%',        
        height: '350px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteDiagnostictestComponent,
      {
        width: '30%',        
        height: '200px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {     

    });
  }

}
