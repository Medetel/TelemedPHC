import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { CounsultationService } from '../../counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';
import { ViewRevisitComponent } from './view-revisit/view-revisit.component';
import { DeleteRevisitComponent } from './delete-revisit/delete-revisit.component';
import { ApproveRevisitComponent } from './approve-revisit/approve-revisit.component';
import { TooltipPosition } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-re-visite',
  templateUrl: './re-visite.component.html',
  styleUrls: ['./re-visite.component.scss']
})
export class ReVisiteComponent implements OnInit {

  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  revisit: FormGroup;
  update_revisit: FormGroup;
  splhospt: any;
  con_id: any;
  data: any;
  isedit = true;
  isap_id = true;
  issave = false;
  revisitBtnName = 'Add';
  minDate: any = new Date();
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: CounsultationService, private notif: Notification, public dialog: MatDialog) {
    this.revisit = this.fb.group({
      'rV_Id': [0],
      'date': ['2022-11-30'],
      'hos_Id': [0],
      'rV_Date': [''],
      'rV_Time': [''],
      'remarks': [''],
      'coN_Id': [this.route.snapshot.params['id']],
    })
    // this.revisit = this.fb.group({
    //   'rV_Id':[0],
    //   'date': [''],
    //   'hos_Id': [0],
    //   'rV_Date': [''],
    //   'rV_Time': [''],
    //   'remarks': [''],
    //   'coN_Id': [this.route.snapshot.params['id']],
    // })
  }

  ngOnInit(): void {
    this.Get_splhosptdd();
    let id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      id = +params['id'];
      this.con_id = id;
    });
    this.Get_revisitbyid(this.con_id);
    this.revisit.controls['rV_Time'].setValue[this.minDate]
  }

  Get_splhosptdd() {
    this.service.Get_splhospital_DD()
      .subscribe((data) => {
        this.splhospt = data;
      })
  }

  save() {   
    
    var datePipe = new DatePipe('en-US');
    this.revisit.value.rV_Date = datePipe.transform(this.revisit.value.rV_Date, 'yyyy-MM-dd');
    // console.log(this.revisit.value)
    // return;
    this.service.Post_revist(this.revisit.value)
      .subscribe((res) => {
        this.Get_revisitbyid(this.con_id);       
        this.notif.successmsg("Re-visit Added Successfully")
        // this.revisit.reset();
      })
      this.revisit.reset();
  }

  Get_revisitbyid(id) {
    this.service.Get_revistby_id(id)
      .subscribe((data: any) => {
        if (data.length > 0) {
          this.data = data
          this.bind(this.data);
        }
        this.revisit.value.rV_Id = 0;
      });
  }

  //view dialog


  bind(d: any) {   
    this.revisit.controls['rV_Date'].setValue(d[0].rV_Date);
    this.revisit.controls['rV_Time'].setValue(d[0].rV_Time);
    this.revisit.controls['remarks'].setValue(d[0].remarks);
    this.revisit.controls['rV_Id'].setValue(d[0].rV_Id);

  }

}