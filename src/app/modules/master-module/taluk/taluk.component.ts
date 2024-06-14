import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ApproveTalukComponent } from './approve-taluk/approve-taluk.component';
import { DeleteTalukComponent } from './delete-taluk/delete-taluk.component';
import { EditTalukComponent } from './edit-taluk/edit-taluk.component';
import { TalukService } from './taluk.service';
import { ViewTalukComponent } from './view-taluk/view-taluk.component';

@Component({
  selector: 'app-taluk',
  templateUrl: './taluk.component.html',
  styleUrls: ['./taluk.component.scss']
})
export class TalukComponent implements OnInit {
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  dtOptions = {};
  TooltipPosition:TooltipPosition[] = ['above'];
  constructor(public dialog: MatDialog,private _service:TalukService) { }
data:any;
approve(d:any) {
  const dialogRef = this.dialog.open(ApproveTalukComponent,
    {
      width: '60%',
      height: '350px',
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {

});
}
view(d:any) {
  const dialogRef = this.dialog.open(ViewTalukComponent,
    {
      width: '60%',
      height: '350px',
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
   
  });
}
edit(d:any) {
  const dialogRef = this.dialog.open(EditTalukComponent,
    {
      width: '60%',
      height: '350px',
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
 
  });
}
delete(d:any) {
  const dialogRef = this.dialog.open(DeleteTalukComponent,
    {
      width: '30%',
      height: '200px',
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
  
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
    this.get_allstate();
    this._service.Get_menu_claims(9)
      .subscribe((data) => {
       
        if (data[0].claimType == 'TalukAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'TalukView') {
        
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'TalukEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'TalukDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'TalukApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }
get_allstate(){
  this._service.Get_Taluk()
  .subscribe((data)=>{
    this.data=data
  })
}
}
