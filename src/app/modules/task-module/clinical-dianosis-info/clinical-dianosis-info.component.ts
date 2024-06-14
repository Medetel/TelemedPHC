import { Component, OnInit } from '@angular/core';
import { ClinicalDianosisInfoViewComponent } from './clinical-dianosis-info-view/clinical-dianosis-info-view.component';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormBuilder } from '@angular/forms';
import { ClinicalDiagnosisInfoService } from './clinical-diagnosis-info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clinical-dianosis-info',
  templateUrl: './clinical-dianosis-info.component.html',
  styleUrls: ['./clinical-dianosis-info.component.scss']
})
export class ClinicalDianosisInfoComponent implements OnInit {
  dtOptions = {};
  mainData: any;
  data: any;
  id: any;
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(private service: ClinicalDiagnosisInfoService, private fb: FormBuilder, private route: ActivatedRoute, public dialog:MatDialog) { }

  ngOnInit(): void {
    // this.dtOptions = {
    //   dom: 'lBfrtip',
    //   lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
    //   scroll: "250px",
    //   select: true,
    //   buttons: [
    //     {
    //       extend: 'collection',
    //       className: 'btn-primary',
    //       text: 'Export',
    //       buttons: [
    //         { extend: 'copy', className: 'btn-primary' },
    //         { extend: 'csv', className: 'btn-primary' },
    //         { extend: 'excel', className: 'btn-primary' },
    //         { extend: 'pdf', className: 'btn-primary' },
    //         { extend: 'print', className: 'btn-primary' },
    //       ]
    //     },
    //     {
    //       extend: 'colvis',
    //       className: 'btn-primary',
    //       text: 'Column Visibility',
    //     },
    //   ],
    // }
  }

  view() {
    this.dialog.open(ClinicalDianosisInfoViewComponent,
      {
        height: '100%',
        width: '100%',
        // data: { d },
      });
    // dialogRef.afterClosed().subscribe(result => {

    // });
  }

}
