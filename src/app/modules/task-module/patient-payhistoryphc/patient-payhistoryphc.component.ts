import { Component, OnInit } from '@angular/core';
import { PatientPayhistoryphcService } from './patient-payhistoryphc.service';
import { Notification } from 'src/app/core/Notifications/Notification';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-patient-payhistoryphc',
  templateUrl: './patient-payhistoryphc.component.html',
  styleUrls: ['./patient-payhistoryphc.component.scss']
})
export class PatientPayhistoryphcComponent implements OnInit {
  data: any;
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];

  constructor(private service: PatientPayhistoryphcService, private notif: Notification) { }

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
    this.patientpayhistory();
  }
  patientpayhistory() {
    this.service.patientpayhistory()
      .subscribe((data) => {
        console.log('data :' + JSON.stringify(data));
        this.data = data;
      })
  }
}
