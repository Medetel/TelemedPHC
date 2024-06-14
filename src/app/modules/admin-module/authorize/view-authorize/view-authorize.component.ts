import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-view-authorize',
  templateUrl: './view-authorize.component.html',
  styleUrls: ['./view-authorize.component.scss']
})
export class ViewAuthorizeComponent implements OnInit {
role;
data:any;
  constructor(@Inject(MAT_DIALOG_DATA) private _data: any,private service:AdminService,private notif: Notification) { }

  ngOnInit(): void {
    this.get_data();
    this.get_roles();
  }
  get_data(){
       this.service.Get_Roleclamis(this._data.d.id)
       .subscribe((data)=>{
         this.role = data        
       })
  }
  changeCheckbox(menuPos, pagePos, claimPos) {    
    for (let i = 0; i < this.role.length; i++) {
      if (i == menuPos) {
        for (let j = 0; j < this.role[i].subItems.length; j++) {
          if (j == pagePos) {
            for (let k = 0; k < this.role[i].subItems[j].subMenuClaim.length; k++) {
              if (k == claimPos) {
                let val: boolean = null;
                if (this.role[i].subItems[j].subMenuClaim[k].claimValue == true) {
                  val = false;
                  this.role[i].subItems[j].subMenuClaim[k].claimValue = val;
                }
                else {
                  val = true;
                  this.role[i].subItems[j].subMenuClaim[k].claimValue = val;
                }
              }
            }
          }
        }
      }
    }
  }
  updateform() {
    this.service.saveClaims(this._data.d.id, this.role)
    .subscribe(data => {
      this.notif.successmsg("Claims Updated Successfully")      
    })    
  }
  get_roles(){
    this.service.Get_Role()
    .subscribe((data)=>{
      this.data=data
    })
 }
}
