import { Component, OnInit } from '@angular/core';
import { DeleteGalleryComponent } from './delete-gallery/delete-gallery.component';
import { EditGalleryComponent } from './edit-gallery/edit-gallery.component';
import { ViewGalleryComponent } from './view-gallery/view-gallery.component';
import { GalleryUploadService } from './gallery-upload.service';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ApproveGalleryComponent } from './approve-gallery/approve-gallery.component';

@Component({
  selector: 'app-gallery-upload',
  templateUrl: './gallery-upload.component.html',
  styleUrls: ['./gallery-upload.component.scss']
})
export class GalleryUploadComponent implements OnInit {


  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];

  constructor(public dialog: MatDialog, private _service: GalleryUploadService) { }
  data: any;
  addhid: boolean = false;
  viewhid: boolean = false;
  edithid: boolean = false;
  deletehid: boolean = false;
  approveid: boolean = false;
  approve(d: any) {
    const dialogRef = this.dialog.open(ApproveGalleryComponent,
      {        
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  view(d: any) {
    const dialogRef = this.dialog.open(ViewGalleryComponent,
      {
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  edit(d: any) {
    const dialogRef = this.dialog.open(EditGalleryComponent,
      {
        width: '60%',
        height: '300px',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteGalleryComponent,
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
    this.get_allstate();
    this._service.Get_menu_claims(7)
      .subscribe((data) => {       
        if (data[0].claimType == 'StateAdd') {
          if (data[0].claimValue == true)
            this.addhid = false;
          else
            this.addhid = true;
        }
        if (data[1].claimType == 'StateView') {
        
          if (data[1].claimValue == true)
            this.viewhid = false;
          else
            this.viewhid = true;
        }
        if (data[2].claimType == 'StateEdit') {
          if (data[2].claimValue == true)
            this.edithid = false;
          else
            this.edithid = true;
        }
        if (data[3].claimType == 'StateDelete') {
          if (data[3].claimValue == true)
            this.deletehid = false;
          else
            this.deletehid = true;
        }
        if (data[4].claimType == 'StateApprove') {
          if (data[4].claimValue == true)
            this.approveid = false;
          else
            this.approveid = true;
        }
      })
   
  }

  
  get_allstate() {
    this._service.getVideos()
      .subscribe((data) => {
        this.data = data
      })
  }

}
