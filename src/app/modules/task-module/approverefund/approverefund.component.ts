import { Component, OnInit } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { Notification } from 'src/app/core/Notifications/Notification';
import { RefundFormService } from '../refund-form/refund-form.service';

@Component({
  selector: 'app-approverefund',
  templateUrl: './approverefund.component.html',
  styleUrls: ['./approverefund.component.scss']
})
export class ApproverefundComponent implements OnInit {
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
    this.getall_refund_admin()
  }
  getall_refund_admin() {
    this.service.getall_refund_admin()
      .subscribe((data) => {
        this.data = data;
        console.log('data :' + JSON.stringify(this.data))
      })
  }

  refund(tracking_id: any, consultation_fee: number): void {
    var refundData = {
      referenceNo: tracking_id,
      refundAmount: consultation_fee
    };
    console.log(refundData);
    this.service.RefundApprove(refundData).subscribe(
      (res) => {
        console.log('response data :' + JSON.stringify(res));
        this.notif.successmsg('Refunded successfully');
      },
      // (error) => {
      //    this.notif.errorsmsg('Error while refunding')


      // }
    );


  }

}
