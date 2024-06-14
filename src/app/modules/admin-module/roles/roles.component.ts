import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { AdminService } from '../admin.service';
import { ActiveRolesComponent } from './active-roles/active-roles.component';
import { DeleteRolesComponent } from './delete-roles/delete-roles.component';
import { EditRolesComponent } from './edit-roles/edit-roles.component';
import { ViewRolesComponent } from './view-roles/view-roles.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  dtOptions = {};
  TooltipPosition:TooltipPosition[] = ['above'];
  data:any;
   addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  constructor(public dialog: MatDialog,private _service:AdminService) { }
  view(d:any) {
    const dialogRef = this.dialog.open(ViewRolesComponent,
      {
        height: '35%',
        width: '45%',
        data: {d}
      });
    dialogRef.afterClosed().subscribe(result => {     
    });
  }
  edit(d:any) {
    const dialogRef = this.dialog.open(EditRolesComponent,
      {
        height: '450px',
        width: '900px',
        data: {d}
      });
    dialogRef.afterClosed().subscribe(result => {
   
    });
  }
  delete(d:any) {
    const dialogRef = this.dialog.open(DeleteRolesComponent,
      {
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        hasBackdrop: true,
        maxHeight: "700px",
        data: {d}
      });
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }
  Inactive(d:any) {
    const dialogRef = this.dialog.open(ActiveRolesComponent,
      {
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        hasBackdrop: true,
        maxHeight: "700px",
        data: {d}
      });
    dialogRef.afterClosed().subscribe(result => {     
      setTimeout(() => {
        window.location.reload();
    }, 1000);
    });
  }
  reload(){
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
          className:'btn-primary',
          text: 'Export',
          buttons: [
            {extend:'copy',className:'btn-primary'},
            {extend:'csv',className:'btn-primary'},
            {extend:'excel',className:'btn-primary'},
            {extend:'pdf',className:'btn-primary'},
            {extend:'print',className:'btn-primary'},
            ]   
        },
        {extend:'colvis',
          className:'btn-primary',
          text:'Column Visibility',
         },
      ],
    }
    this.get_roles_grid();
    this._service.Get_menu_claims(3)
      .subscribe((data) => {     
        if (data[0].claimType == 'RolesAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'RolesView') {        
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'RolesEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'RolesDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
      })
  }
get_roles_grid(){
  this._service.Get_Role()
  .subscribe((data)=>{
    this.data=data  
  })
}
}
