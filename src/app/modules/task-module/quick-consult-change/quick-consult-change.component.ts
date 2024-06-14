import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { color } from 'd3';
import { PHCManualAppointService } from '../phc-manual-appoint.service';
import { ViewQuickConsultChangeComponent } from './view-quick-consult-change/view-quick-consult-change.component';
import { EditQuickConsultChangeComponent } from './edit-quick-consult-change/edit-quick-consult-change.component';
import { DeleteQuickConsultChangeComponent } from './delete-quick-consult-change/delete-quick-consult-change.component';



@Component({
  selector: 'app-quick-consult-change',
  templateUrl: './quick-consult-change.component.html',
  styleUrls: ['./quick-consult-change.component.scss']
})
export class QuickConsultChangeComponent implements OnInit {
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  dtOptions = {};
  TooltipPosition:TooltipPosition[] = ['above'];
  searchTextData: any;

  constructor(public dialog: MatDialog,private _service:PHCManualAppointService) { }
data:any;


view(d:any) {
  const dialogRef = this.dialog.open(ViewQuickConsultChangeComponent,
    {
      height: '100%',
      width: '100%',
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
    
  });
}

edit(d:any) {
  const dialogRef = this.dialog.open(EditQuickConsultChangeComponent,
    {
      height: '100%',
      width: '100%',
      data: {d},
    });
  dialogRef.afterClosed().subscribe(result => {
  
  });
}
delete(d:any) {
  const dialogRef = this.dialog.open(DeleteQuickConsultChangeComponent,
    {
      width: "30%",    
      height: "200px",      
      data: {d}
    });
  dialogRef.afterClosed().subscribe(result => {
   
  });
}
reload(){
  window.location.reload();
}
  ngOnInit(): void {
    this.getall_quick_consult();

   
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
    this._service.Get_menu_claims(29)
      .subscribe((data) => {       
        if (data[0].claimType == 'ManualappointmentphcAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'ManualappointmentphcView') {
         
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'ManualappointmentphcEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'ManualappointmentphcDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'ManualappointmentphcApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
  }


  getall_quick_consult(){
    this._service.GetAll_quick_consult()
    .subscribe((data)=>{    
      this.data=data
      console.log("Quick Consult data:", JSON.stringify(this.data))     
        
    })
  }

}





