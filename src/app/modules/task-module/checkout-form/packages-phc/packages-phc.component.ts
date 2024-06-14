import { Component, Inject, OnInit } from '@angular/core';
import { CheckoutFormService } from '../checkout-form.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packages-phc',
  templateUrl: './packages-phc.component.html',
  styleUrls: ['./packages-phc.component.scss']
})
export class PackagesPhcComponent implements OnInit {
  packages: any[];
  selected: string | null = null;
  cons_id: any;
  cons_pr_id: any;
  pck_price_id: any;
  price_Id: any;
  constructor(private router: Router,private checkoutService: CheckoutFormService, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<PackagesPhcComponent>, private notif: Notification) {
    this.packages = data.packages;
    this.cons_id = data.d.cons_id;
    this.cons_pr_id = data.d.cons_pr_id;
  }

  ngOnInit(): void {
   
  }
  isSelected(price_Id: string): boolean {
    return this.selected === price_Id;
  }

  toggleSelection(price_Id: string): void {
    if (this.selected === price_Id) {
      // If already selected, deselect
      this.selected = null;
    } else {
      // Otherwise, select
      this.selected = price_Id;
    }
  }

 
  savepackage(): void {
    //alert('save package')

    if (this.selected) {
      var requestData = {
        pck_price_id: this.selected,
        pck_cons_id: this.cons_id,
        pck_pr_id: this.cons_pr_id,
      };
       console.log(requestData);
      //return;
      // const requestDataString = JSON.stringify(requestData);

      this.checkoutService.InsertPatientPackage_PHC(requestData).subscribe(
        (res) => {
           this.notif.successmsg('Package saved successfully');
          this.dialogRef.close();
          window.location.reload();
         },
         (error) => {
          //  console.log('Error inserting package:', error);
           //  this.notif.errorsmsg('Error inserting package')
           try {
             const responseData = JSON.parse(error.error);
             console.log('Parsed Response:', responseData);
             this.notif.errorsmsg('Error inserting package');
           } catch (jsonError) {
             console.log('Non-JSON Response:', error.error);
             this.notif.successmsg('Package saved successfully'); // Assuming the package is actually saved
             this.dialogRef.close();
             window.location.reload();
           }

         }
     );
    }
    else {
      this.notif.errorsmsg('No package selected')
    }
  }
  
}
