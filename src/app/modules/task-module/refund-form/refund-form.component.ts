import { Component, OnInit } from '@angular/core';
import { RefundFormService } from './refund-form.service';
import { TooltipPosition } from '@angular/material/tooltip';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-refund-form',
  templateUrl: './refund-form.component.html',
  styleUrls: ['./refund-form.component.scss']
})
export class RefundFormComponent implements OnInit {
  
  dtOptions = {};
  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(private service: RefundFormService, private notif: Notification) { }
  data: any;
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
    console.log('dtOptions:', this.dtOptions);
    this.getall_refund()
  }
  getall_refund() {
    this.service.getall_refund()
      .subscribe((data) => {
        this.data = data;
        console.log('data :' + JSON.stringify(this.data))
      })
  }

  refund(tracking_id:any, consultation_fee:number): void {
      var refundData = {
        referenceNo: tracking_id,
        refundAmount: consultation_fee
      };
    console.log(refundData);
    this.service.RefundReq(refundData).subscribe(
      (res) => {
        console.log('response data :' +JSON.stringify(res));
          this.notif.successmsg('Refunded successfully');
          window.location.reload();
        },
        // (error) => {
        //    this.notif.errorsmsg('Error while refunding')
        

        // }
      );
    
    
  }

}
