import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class Notification {
    constructor(private Tost: ToastrService) { }
    successmsg(Msg:string) {
        this.Tost.success(Msg, 'Success')
    }
    errorsmsg(Msg:string) {
         this.Tost.error(Msg,'Error')      
    }
}