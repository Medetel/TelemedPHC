import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { data } from 'jquery';
import { CounsultationService } from '../../counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ViewReferralComponent } from './view-referral/view-referral.component';
import { DeleteReferralComponent } from './delete-referral/delete-referral.component';
import { ApproveReferralComponent } from './approve-referral/approve-referral.component';
import { Console } from 'console';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {

  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  referral: FormGroup;
  referralupdate: FormGroup;
  coN_Id: any;
  data: any;
  splhospt: any;
  isedit = true;
  isap_id = true;
  issave = false;
  mindate:any = new Date();
  refbtnname ='Add';
  ref_Id:any;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: CounsultationService, private notif: Notification, public dialog: MatDialog) {
    this.referral = this.fb.group({      
      'hos_Id': [''],
      'ref_Date': [''],
      'splObs': [''],
      'remarks': [''],
      'coN_Id': [this.route.snapshot.params['id']],
    })

  }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      id = +params['id'];
      this.coN_Id = id;
    });
    this.Get_splhosptdd();
    this.Get_refarelbyid(this.coN_Id)

    this.dtOptions = {
      // dom: 'lBfrtip',
      lengthMenu: [[2, 5, 10, -1], [2, 5, 10, "All"]],
    }
  }

  add() {  
    var datePipe = new DatePipe('en-US');
    this.referral.value.ref_Date = datePipe.transform(this.referral.value.ref_Date, 'yyyy-MM-dd');
    var refdata={
      coN_Id: this.coN_Id,
      hos_Id: this.referral.value.hos_Id,
      ref_Date: this.referral.value.ref_Date,
      splObs: this.referral.value.splObs,
      remarks: this.referral.value.remarks,
      ref_Id: this.ref_Id,
      delete_flag: false,
      status: 1
    }
    
    this.service.Post_referral(refdata)
      .subscribe((res) => {        
        this.notif.successmsg("Referral saved successfully");      
        this.Get_refarelbyid(this.coN_Id)
      })
  }

  Get_splhosptdd() {
    this.service.Get_splhospital_DD()
      .subscribe((data) => {
        this.splhospt = data;

      })
  }  

  //view dialog
  view(d: any) {
    const dialogRef = this.dialog.open(ViewReferralComponent,
      {
        height: '45%',
        width: '45%',
        data: { d },
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteReferralComponent,
      {
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        hasBackdrop: true,
        maxHeight: "700px",
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
      this.Get_refarelbyid(this.coN_Id)
     
    });
  }

  approve(d:any){
    const dialogRef = this.dialog.open(ApproveReferralComponent,
      {
        height: '50%',
        width: '60%',
        data: { d },
      });
    dialogRef.afterClosed().subscribe(result => {
      this.Get_refarelbyid(this.coN_Id)
      
    });
  }

  edit(d: any) {
   
    this.refbtnname = 'Update'
    // this.isedit = false;
    // this.isap_id = false;
    // this.issave = true;
    
  }
  Get_refarelbyid(id) {
    this.service.Get_referralby_id(id)
      .subscribe((data:any) => {
        this.data=data;
        //alert(this.data[0].ref_Id)
        this.ref_Id=this.data[0].ref_Id
        if (data.length > 0) {
          this.data = data
          this.bind(this.data);
        }
        this.referral.value.ref_Id = 0;
       
       
      });
   
  }

  bind(d: any) {
   
    this.ref_Id=d[0].ref_Id;
    //this.referral.controls['ref_Id'].setValue(d[0].ref_Id);
    this.referral.controls['hos_Id'].setValue(d[0].hos_Id);
    this.referral.controls['ref_Date'].setValue(d[0].ref_Date);
    this.referral.controls['splObs'].setValue(d[0].splObs);
    this.referral.controls['remarks'].setValue(d[0].remarks);

  }
}