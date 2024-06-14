import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { AdminService } from '../admin.service';
import { ActiveUserComponent } from './active-user/active-user.component';
import { DeleteUsersComponent } from './delete-users/delete-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { ViewUsersComponent } from './view-users/view-users.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog, private _service: AdminService) { }
  data: any;
  view(d: any) {
    const dialogRef = this.dialog.open(ViewUsersComponent,
      {
        height: '50%',
        width: '50%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditUsersComponent,
      {
        height: '450px',
        width: '900px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteUsersComponent,
      {
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        hasBackdrop: true,
        maxHeight: "700px",
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
    

    });
  }

  Inactive(d: any) {
    const dialogRef = this.dialog.open(ActiveUserComponent,
      {
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        hasBackdrop: true,
        maxHeight: "700px",
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true)
      {
      setTimeout(() => {
       window.location.reload();
      }, 700);
    }

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
    this.get_user();
    this._service.Get_menu_claims(2)
      .subscribe((data) => {      
        if (data[0].claimType == 'UsersAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'UsersView') {
          
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'UsersEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'UsersDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
      })
  }
  get_user() {
    this._service.Get_User()
      .subscribe((data) => {
        this.data = data
        
      })
  }
}
