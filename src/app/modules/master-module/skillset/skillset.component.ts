import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ApproveSkillsComponent } from './approve-skills/approve-skills.component';
import { DeleteSkillsetComponent } from './delete-skillset/delete-skillset.component';
import { EditSkillsetComponent } from './edit-skillset/edit-skillset.component';
import { SkillsetService } from './skillset.service';
import { ViewSkillsetComponent } from './view-skillset/view-skillset.component';

@Component({
  selector: 'app-skillset',
  templateUrl: './skillset.component.html',
  styleUrls: ['./skillset.component.scss']
})
export class SkillsetComponent implements OnInit {
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private _service: SkillsetService) { }
  data: any;

  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;

  approve(d: any) {
    const dialogRef = this.dialog.open(ApproveSkillsComponent,
      {
        width: '60%',
        height: '300px',        
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {    
    });
  }
  view(d: any) {
    const dialogRef = this.dialog.open(ViewSkillsetComponent,
      {
        width: '60%',
        height: '300px',    
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {      
    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditSkillsetComponent,
      {
        width: '60%',
        height: '300px',    
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteSkillsetComponent,
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
    this.get_skillset();
    this._service.Get_menu_claims(15)
      .subscribe((data) => {
       
        if (data[0].claimType == 'SkillsetAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'SkillsetView') {
         
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'SkillsetEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'SkillsetDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'SkillsetApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
  get_skillset() {
    this._service.Get_skillset()
      .subscribe((data) => {
        this.data = data
      })
  }
}
