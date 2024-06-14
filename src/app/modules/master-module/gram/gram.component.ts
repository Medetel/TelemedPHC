import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ApproveGramComponent } from './approve-gram/approve-gram.component';
import { DeleteGramComponent } from './delete-gram/delete-gram.component';
import { EditGramComponent } from './edit-gram/edit-gram.component';
import { GramService } from './gram.service';
import { ViewGramComponent } from './view-gram/view-gram.component';

@Component({
  selector: 'app-gram',
  templateUrl: './gram.component.html',
  styleUrls: ['./gram.component.scss']
})
export class GramComponent implements OnInit {
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private _service: GramService) { }
  data: any;
  approve(d: any) {
    const dialogRef = this.dialog.open(ApproveGramComponent,
      {        
        width: '60%',
        height: '410px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  view(d: any) {
    const dialogRef = this.dialog.open(ViewGramComponent,
      {
        width: '60%',
        height: '410px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditGramComponent,
      {
        width: '60%',
        height: '410px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteGramComponent,
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
    this._service.Get_menu_claims(10)
      .subscribe((data) => {
       
        if (data[0].claimType == 'GramAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'GramView') {
         
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'GramEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'GramDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'GramApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
  get_allstate() {
    this._service.Get_Gram()
      .subscribe((data) => {
        this.data = data
      })
  }
}
