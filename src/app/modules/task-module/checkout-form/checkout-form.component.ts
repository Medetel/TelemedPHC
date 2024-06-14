import { Component, OnInit } from '@angular/core';
import { CheckoutFormService } from './checkout-form.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PackagesPhcComponent } from './packages-phc/packages-phc.component';
import { VitalsComponent } from './vitals/vitals.component';
import { ViewVitalsComponent } from './view-vitals/view-vitals.component';


@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {
  cons_data: any;
  result: any;
  pat_id: any;
  firstName: any;
  emailId: any;
  phoneNumber: any;
  searchDoctor: string = '';
  //pay_result: any;

  /*
  paydata: {
    cons_id: number;
    cons_pr_id: number;
    do_id: number;
    hos_id: number;
    phc_appt_id: number;
    consultation_fee: number;
    billing_name: string;
    billing_address: string;
    billing_city: string;
    billing_state: string;
    billing_zip: string;
    billing_country: string;
    billing_tel: string;
    billing_email: string;
  };
  */

  constructor(private router: Router, private checkoutService: CheckoutFormService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pat_id = localStorage.getItem('Id');
    this.firstName = localStorage.getItem('firstName');
    this.emailId = localStorage.getItem('emailId');
    this.phoneNumber = localStorage.getItem('phoneNumber');
    this.get_consultationdetails()
  }
  get_consultationdetails() {
    this.checkoutService.Get_consultant_byId().subscribe(data => {
      console.log('consulation data :' ,JSON.stringify(data))
      this.cons_data = data;
      //this.pay_result = data;

    })
  }


  calculateTotalFee(consultationFee: number, packageFee: number): number {
    // return consultationFee + packageFee;
    if (packageFee !== 987654) {
      return consultationFee + packageFee;
    } else {
      return consultationFee;
    }
  }

  package(d: any) {
    this.checkoutService.GetAllPackages_PHC().subscribe(packages => {
    const dialogRef = this.dialog.open(PackagesPhcComponent,
      {
        height: '100%',
        width: '100%',
        data: {
          packages: packages,
          d
             }
      });
      dialogRef.afterClosed().subscribe(result => {
        // window.location.reload();
      
    });
    });
  }

  vitalSigns(d:any) {
    // this.checkoutService.Get_consultant_byId().subscribe(data => {
      const dialogRef = this.dialog.open(VitalsComponent,
        {
          height: '100%',
          width: '100%',
          data: {d}
        });
      dialogRef.afterClosed().subscribe(result => {
        // window.location.reload();

      // });
    });
  }

  viewvitals(d: any) {
    // this.checkoutService.Get_consultant_byId().subscribe(data => {
    const dialogRef = this.dialog.open(ViewVitalsComponent,
      {
        height: '100%',
        width: '100%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
      // window.location.reload();

      // });
    });
  }

  PayNow(d: any){
    //alert('pay now hit')  
    //alert(this.cons_data[0].cons_id);  
    
    var total_amt = this.calculateTotalFee(d.consultation_fee, d.package_fee);
    var paydata= {
      cons_id: d.cons_id,
      cons_pr_id: d.cons_pr_id,
      do_id: d.do_id,
      hos_id: d.hos_id,
      phc_appt_id: d.phc_appt_id,
      amount: total_amt, //this.cons_data[0].consultation_fee,
      billing_name: d.billing_name,
      billing_address: d.billing_address,
      billing_city: d.billing_city,
      billing_state: d.billing_state,
      billing_zip: d.billing_zip,
      billing_country: d.billing_country,
      billing_tel: d.billing_tel,
      billing_email: d.billing_email
    };
    // console.log('Amount :', JSON.stringify(d.amount))
    // console.log('pay data :', paydata)

  
    

    this.checkoutService.Create_PayReq(paydata)
        .subscribe((data) => {
        this.result=data;     
        console.log("payment url: " +JSON.stringify(this.result));          
        this.openPayLink(this.result.payment_url)      
     
      }, (error) => {
        console.log("a0 :" +JSON.stringify(error));
        console.log("a1 :" +error.message_desc)
        console.log("a2 :" +error.error.message_desc)
        
      });  


  }

  openPayLink(url: string){
    window.open(url, "_blank");
}
  applySearch() {
    const searchValue = this.searchDoctor.toLowerCase().trim();
    if (!searchValue) {
      // If search input is empty, reset the data
      this.get_consultationdetails();
      return;
    }

    // Filter appointments based on doctor's name
    this.cons_data = this.cons_data.filter(consultant => {
      return (
        consultant.billing_name.toLowerCase().includes(searchValue)
      );
    });
  }
}
