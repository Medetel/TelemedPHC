import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ApproveAssistantComponent } from './approve-assistant/approve-assistant.component';
import { AssistantService } from './assistant.service';
import { DeleteAssistantComponent } from './delete-assistant/delete-assistant.component';
import { EditAssistantComponent } from './edit-assistant/edit-assistant.component';
import { ViewAssistantComponent } from './view-assistant/view-assistant.component';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss']
})
export class AssistantComponent implements OnInit {
  dtOptions = {};
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  roleName: string;
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private _service: AssistantService) { }
  data: any;
  approve(d: any) {
    const dialogRef = this.dialog.open(ApproveAssistantComponent,
      {
        height: '65%',
        width: '63%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  view(d: any) {
    const dialogRef = this.dialog.open(ViewAssistantComponent,
      {
        height: '100%',
        width: '100%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditAssistantComponent,
      {
        height: '100%',
        width: '100%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteAssistantComponent,
      {
        width: "30%",
        height: "200px",
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  reload() {
    window.location.reload();
  }

  isAdmin(): boolean {
    return this.roleName === "Admin";
  }
  ngOnInit(): void {
    this.roleName = localStorage.getItem('roleName') || '';
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
    this.get_assistant();
    this._service.Get_menu_claims(20)
      .subscribe((data) => {
        if (data[0].claimType == 'AssistantAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'AssistantView') {
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'AssistantEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'AssistantDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'AssistantApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
  get_assistant() {
    this._service.Get_Assistant()
      .subscribe((data) => {
        this.data = data
      }, (error) => {
      })
  }
}
