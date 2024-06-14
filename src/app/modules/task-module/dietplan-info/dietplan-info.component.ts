import { Component, OnInit } from '@angular/core';
import { SuggestDietplanComponent } from './suggest-dietplan/suggest-dietplan.component';
import { ActivatedRoute } from '@angular/router';
import { DietplanInfoService } from './dietplan-info.service';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-dietplan-info',
  templateUrl: './dietplan-info.component.html',
  styleUrls: ['./dietplan-info.component.scss']
})
export class DietplanInfoComponent implements OnInit {
  Dietplansuggest: FormGroup;
  dtOptions = {};
  mainData: any;
  data: any;
  id: any;
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(private service: DietplanInfoService, private fb: FormBuilder, private route: ActivatedRoute, private notif: Notification, public dialog: MatDialog) {
    this.Dietplansuggest = this.fb.group({
      'dp_Id': [''],
      'dp_intake': [''],
      'dp_duration': [''],
      'dp_dura_interof': [''],
      'dp_instruction': [''],
      'status_name': [''],
      'dP_CON_Id_FK': [this.route.snapshot.params['id']],
    })
  }
  view(d: any) {
    const dialogRef = this.dialog.open(SuggestDietplanComponent,
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
       this.getall_dietplan()
  }

  getall_dietplan() {
    this.service.getall_dietplan()
      .subscribe((data) => {
        this.mainData = data;
      })
  }

}
