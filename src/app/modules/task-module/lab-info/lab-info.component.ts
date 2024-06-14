import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { DeletelabComponent } from '../consultation/appointment-details/lab-test/deletelab/deletelab.component';
import { EditlabComponent } from '../consultation/appointment-details/lab-test/editlab/editlab.component';
import { Notification } from 'src/app/core/Notifications/Notification';
import { LabInfoService } from './lab-info.service';
import { MatPaginator } from '@angular/material/paginator';
import { TooltipPosition } from '@angular/material/tooltip';
import { SuggestLabComponent } from './suggest-lab/suggest-lab.component';
@Component({
  selector: 'app-lab-info',
  templateUrl: './lab-info.component.html',
  styleUrls: ['./lab-info.component.scss']
})
export class LabInfoComponent implements OnInit {
  Labsuggest: FormGroup;
  dtOptions = {};
  mainData: any;
  data: any;
  id: any;
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(private service:LabInfoService, private fb: FormBuilder, private route: ActivatedRoute, private notif: Notification,public dialog: MatDialog) { 
    this.Labsuggest = this.fb.group({
      'id': [''],
      'category_Id': [''],
      'description_Id': [''],
      'coN_Id': [this.route.snapshot.params['id']],
    })
  }
  view(d: any) {
    const dialogRef = this.dialog.open(SuggestLabComponent,
      {
        height: '100%',
        width: '100%',
        data: { d },
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
    this.getall_consultlabtest();
    //this.Get_labcategorydd();
    //this.Get_labdecrptndd(id);
    //this.get_labtestbyid()
  }
     
  getall_consultlabtest(){
    this.service. getall_consultlabtest()
    .subscribe((data)=>{
      this.mainData = data;
    })
  }
  // Get_labcategorydd(){
  //   this.service. Get_labcategorydd()
  //   .subscribe((data)=>{
  //        this.data=data
  //   })
  // }
  // get_labtestbyid(){
  //   this.service.get_labtestbyid(this.id)
  //   .subscribe((data)=>{
  //        this.labtest=data
  //   })
  // }
 
}