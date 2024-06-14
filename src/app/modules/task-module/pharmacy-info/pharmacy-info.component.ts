import { Component, OnInit } from '@angular/core';
import { PharmacyInfoService } from './pharmacy-info.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { SuggestLabComponent } from '../lab-info/suggest-lab/suggest-lab.component';
import { SuggestPrescriptionComponent } from './suggest-prescription/suggest-prescription.component';

@Component({
  selector: 'app-pharmacy-info',
  templateUrl: './pharmacy-info.component.html',
  styleUrls: ['./pharmacy-info.component.scss']
})
export class PharmacyInfoComponent implements OnInit {

  Pharmacyinfo: FormGroup;
  dtOptions = {};
  drugtest: any;
  data: any;
  id: any;
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(private service:PharmacyInfoService, private fb: FormBuilder, private route: ActivatedRoute, private notif: Notification,public dialog: MatDialog) { 
    this.Pharmacyinfo = this.fb.group({
      'id': [''],
      'coN_PR_Id_FK': [''],
      'coN_PR_Name': [''],
      'prc_Drg_name': [''],
      'prc_dosage_qty': [''],
      'prc_drug_duration': [''],
      'status_name': [''],
      // 'prc_intake_instaruction': [''],
      // 'prc_intake_instaruction': ['', [Validators.pattern("[0-9]{2}$"), Validators.maxLength(2)]],

      'prc_CONS_id_FK': [this.route.snapshot.params['id']],
    })
  }
  view(d: any) {
    const dialogRef = this.dialog.open(SuggestPrescriptionComponent,
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
    this.getall_drugprescription();
  }
  getall_drugprescription(){
    this.service. getall_drugprescription()
    .subscribe((data)=>{
         this.drugtest=data
    })
  }
}