import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { AdminService } from '../admin.service';
import { ViewAuthorizeComponent } from './view-authorize/view-authorize.component';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.scss']
})
export class AuthorizeComponent implements OnInit {
  data:any;
  dtOptions = {};
  TooltipPosition:TooltipPosition[] = ['above'];
  viewhid: boolean = false;
  constructor(public dialog: MatDialog,private service:AdminService) { }
  view(d:any) {
    const dialogRef = this.dialog.open(ViewAuthorizeComponent,
      {
        height: '100%',
        width: '100%',
        data: {d}
      });
    dialogRef.afterClosed().subscribe(result => {      
    });
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
    this.get_roles();
    this.service.Get_menu_claims(4)
      .subscribe((data) => {        
        if (data[1].claimType == 'AuthorizeView') {          
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }        
      })
  }
get_roles(){
   this.service.Get_Role()
   .subscribe((data)=>{
     this.data=data
   })
}
}
