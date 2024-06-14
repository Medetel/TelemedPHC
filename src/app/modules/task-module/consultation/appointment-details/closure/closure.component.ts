import { Component,Inject, Input,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { CounsultationService } from '../../counsultation.service';
import { Router } from '@angular/router';
import { ReferralComponent } from '../referral/referral.component';

@Component({
  selector: 'app-closure',
  templateUrl: './closure.component.html',
  styleUrls: ['./closure.component.scss']
})


export class ClosureComponent implements OnInit {
 
  //enable=true;
  refId: number;
  revId: number;
  cid:any;
  constructor(private dialogRef: MatDialogRef<ClosureComponent>,@Inject(MAT_DIALOG_DATA) private data: any,private router: Router, private service: CounsultationService) { }

  ngOnInit(): void {
   
   
  }

  delete(){    

   
    this.service.Close_consultation(this.data)
      .subscribe((res) => {
        this.dialogRef.close();
        this.router.navigate(['/base/task/consultation']);       
      },
      (error:any)=>
      {
        console.log("error :" +JSON.stringify(error));
      }
      ) ; 
        
  }
}
