import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';
import { GalleryUploadService } from '../gallery-upload.service';
import { NetworkService } from '../../network/network.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-gallery',
  templateUrl: './delete-gallery.component.html',
  styleUrls: ['./delete-gallery.component.scss']
})
export class DeleteGalleryComponent implements OnInit {
  [x: string]: any;
  @Output() confirm = new EventEmitter<boolean>();

  // confirmDeletion() {
  //   this.confirm.emit(true);
  // }

  cancelDeletion() {
    this.confirm.emit(false);
  }
  constructor(public toastrService: ToastrService, private apiService: GalleryUploadService,@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    const formData = new FormData();
    formData.append('id', this.data.d.id);
  }
  deleteGallery() {

    this.apiService.delete_gallery(this.data.d.id).subscribe(
   (data) => {
    this.data= data;
  
    this.toastrService.success(" deleted successfully")
    window.location.reload(); 

   },
  // (error) => {
  //   console.error('Error deleting gallery:', error);
  // }

  
 );


 this.notify.successmsg("deleted  successfully",)

//  this.notif.successmsg("deleted added successfully", )
//  alert('ok')
// window.location.reload();
   }

// const formData = new FormData();
// formData.append('id', this.data.d.id);
// this.apiService.delete_gallery(this.data.d)
//   .subscribe((res)=>{
//     this.notif.successmsg(" deleted successfully" ,this.data.d)
//     this.dialogRef.close();
//     window.location.reload(); 
//   })

//   }
}