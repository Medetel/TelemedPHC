import { Component, OnInit } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Notification } from 'src/app/core/Notifications/Notification';
import { CounsultationService } from '../../counsultation.service';
import { ActivatedRoute, Params } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { ViewPrescriptionComponent } from './view-prescription/view-prescription.component';
import { PrescriptionPdfComponent } from './prescription-pdf/prescription-pdf.component';
import jsPDF from 'jspdf';
import { DeletePrescriptionsComponent } from './delete-prescriptions/delete-prescriptions.component';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {
  dtOptions = {};
  isedit = true;
  isap_id = true;
  issave = false;
  freues: any;
  TooltipPosition: TooltipPosition[] = ['above'];
  freq_order: any;
  data: any;
  prescriptions: FormGroup;
  drugdd: any;
  con_id: any;
  units: any;
  unitss: any;
  drg_Unit: any;
  drg_frq: any;
  drg_type: any;
  category:any;
  prescription: FormGroup;
  enable = true;
  drugs_edit:any;
  constructor(private service: CounsultationService, private fb: FormBuilder, private notif: Notification, private route: ActivatedRoute, public dialog: MatDialog) {
    this.prescriptions = this.fb.group({
      'drg_Category_Id': [''],
      'prc_drug_id_FK': [''],
      'prc_dosage_qty': ['',Validators.pattern(/^[0-9]\d*$/)],
      'prc_drg_frequency_id_FK': [''],
      'prc_intake': [''],
      'prc_drug_duration': ['',Validators.pattern(/^[1-9]\d*$/)],
      'prc_duration_intermof': [''],
      'prc_intake_instaruction': [''],
     
      // 'prc_intake_instaruction': ['', [Validators.pattern("[0-9]{2}$"), Validators.maxLength(2)]],

      'prc_CONS_id_FK': [this.route.snapshot.params['id']],
      'othersDrugName': [''],
    })
    //update
    this.prescription = this.fb.group({
      'prc_id': [''],
      'drg_Category_Id': [''],
      'prc_drug_id_FK': [''],
      'prc_dosage_qty': ['',Validators.pattern(/^[0-9]\d*$/)],
      'prc_drg_frequency_id_FK': [''],
      'prc_intake': [''],
      'prc_drug_duration': ['',Validators.pattern(/^[1-9]\d*$/)],
      'prc_duration_intermof': [''],
      'prc_intake_instaruction': [''],
      
      //'prc_intake_instaruction': ['',[Validators.pattern("[0-9]{2}$"),Validators.maxLength(2), this.nameValidator]],
      'prc_CONS_id_FK': [this.route.snapshot.params['id']],
      'othersDrugName': [''],
    })

    



    this.prescriptions.get('drg_Category_Id').valueChanges.subscribe((categoryId) => {
      if (categoryId === 47) {
        this.prescriptions.get('prc_drug_id_FK').clearValidators();
        this.prescriptions.get('prc_drug_id_FK').updateValueAndValidity();
        this.prescriptions.get('othersDrugName').setValidators([Validators.required]);
      } else {
        this.prescriptions.get('prc_drug_id_FK').setValidators([Validators.required]);
        this.prescriptions.get('othersDrugName').clearValidators();
        this.prescriptions.get('othersDrugName').updateValueAndValidity();
      }
    });

    this.prescription.get('drg_Category_Id').valueChanges.subscribe((categoryId) => {
      if (categoryId === 47) {
        this.prescription.get('prc_drug_id_FK').clearValidators();
        this.prescription.get('prc_drug_id_FK').updateValueAndValidity();
        this.prescription.get('othersDrugName').setValidators([Validators.required]);
      } else {
        this.prescription.get('prc_drug_id_FK').setValidators([Validators.required]);
        this.prescription.get('othersDrugName').clearValidators();
        this.prescription.get('othersDrugName').updateValueAndValidity();
      }
    });

    this.prescriptions.get('drg_Category_Id').valueChanges.subscribe(() => {
      this.prescriptions.get('othersDrugName').reset(); // Reset otherDrugName
    });

    this.prescription.get('drg_Category_Id').valueChanges.subscribe(() => {
      this.prescription.get('othersDrugName').reset(); // Reset otherDrugName
    });

  }


  // alphanumericValidator() {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const value: string = control.value;
  //     const isAlphanumeric: boolean = /^[a-zA-Z0-9]*$/.test(value);

  //     if (!isAlphanumeric) {
  //       return { 'alphanumeric': true }; // Validation failed
  //     }

  //     return null; // Validation passed
  //   };
  // }

  
  

  ngOnInit(): void {
    this.get_categoryDD();
    this.get_frequdd();
    // this.Get_drugdd();
    let id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      id = +params['id'];
      this.con_id = id;
    });
    this.Get_drugpresbyid(this.con_id);

    this.dtOptions = {
      // dom: 'lBfrtip',
      lengthMenu: [[2, 5, 10, -1], [2, 5, 10, "All"]],      
    }
  }


  adddrugs() {
    const drugId = this.prescriptions.value.prc_drug_id_FK || 0;
    const dosageQty = this.prescriptions.value.prc_dosage_qty || 0;
    var prescriptionData={
      prc_CONS_id_FK: this.con_id,
      drg_Category_Id:this.prescriptions.value.drg_Category_Id,
      prc_dosage_qty: dosageQty,
      prc_drg_frequency_id_FK:this.prescriptions.value. prc_drg_frequency_id_FK,
      prc_drug_duration:this.prescriptions.value.prc_drug_duration,
      // prc_drug_id_FK: this.prescriptions.value.prc_drug_id_FK,
      prc_drug_id_FK: drugId,
      prc_duration_intermof:this.prescriptions.value.prc_duration_intermof,
      prc_intake:this.prescriptions.value.prc_intake,
      prc_intake_instaruction: this.prescriptions.value.prc_intake_instaruction,
      othersDrugName: this.prescriptions.value.othersDrugName,
    }
    this.service.Post_prescription(prescriptionData)
      .subscribe((res) => {
        this.notif.successmsg("Prescription Added Successfully")
        this.Get_drugpresbyid(this.con_id);
        this.prescriptions.reset();
        window.location.reload();
      })
      //sindhura
      // this.prescriptions.reset();
      Object.keys(this.prescriptions.controls).forEach(key =>{
        this.prescriptions.controls[key].setErrors(null)
     });
      
      
      
  }
cat1:any;
category_Id:any;
  edit(d: any) {
    console.log(d)
    this.isedit = false;
    this.isap_id = false;
    this.issave = true;
    
    this.prescription.controls['drg_Category_Id'].setValue(d.drg_Category_Id);
    this.prescription.controls['prc_drug_id_FK'].setValue(d.prc_drug_id_FK);
    this.service.Get_drugmastdd(this.prescription.value.drg_Category_Id)
    .subscribe((data) => {
      this.cat1 = data
    })
    
    this.category_Id=this.prescription.value.drg_Category_Id;
   
    //this.prescription.controls['drg_Category_Id'].setValue(d.drg_Category_Id);
    this.prescription.controls['prc_dosage_qty'].setValue(d.prc_dosage_qty);
    this.prescription.controls['prc_drg_frequency_id_FK'].setValue(d.prc_drg_frequency_id_FK);
    this.prescription.controls['prc_intake'].setValue(d.prc_intake);
    this.prescription.controls['prc_drug_duration'].setValue(d.prc_drug_duration);
    this.prescription.controls['prc_duration_intermof'].setValue(d.prc_duration_intermof);
    this.prescription.controls['prc_CONS_id_FK'].setValue(d.prc_CONS_id_FK);
    this.prescription.controls['prc_intake_instaruction'].setValue(d.prc_intake_instaruction);
    this.prescription.controls['prc_id'].setValue(d.prc_id);
    // this.prescription.controls['otherDrugName'].setValue(d.prc_Drg_name);
    this.prescription.controls['othersDrugName'].setValue(d.othersDrugName);
    
   
  }
  get_categoryDD(){
    this.service.get_categoryDD()
    .subscribe((data)=>{
      this.category=data
    })
  }
  get_frequdd() {
    this.service.Get_drugFreqsdd()
      .subscribe((data) => {
        this.freues = data
      })
  }

  // Get_drugdd() {
  //   this.service.()
  //     .subscribe((data) => {
  //       this.drugdd = data
  //       this.units = this.drugdd[0].drg_Unit;        
  //     })
  // } 
  cat:any; 
  typescategory(event){
    this.service.Get_drugmastdd(event)
    .subscribe((data)=>{
      this.cat = data;
    })
}

typescategorys(event){
  this.service.Get_drugmastdd(this.prescription.value.drg_Category_Id)
  .subscribe((data)=>{
    this.cat1=data
    this.prescription.controls['prc_drug_id_FK'].setValue(this.cat1.prc_drug_id_FK);
  })
}
  

// typescategorys(event) {
//   this.prescriptions.controls['drg_Category_Id'].setValue(undefined);
//   this.service.Get_drugmastdd(event)
//     .subscribe((data) => {
//       this.drugs_edit = data
//       this.prescriptions.controls['description_Id'].setValue(this.drugs_edit.prc_drug_id_FK);
//     })
// }
  saverange() {
    var datafilter = this.freues.filter(x => x.drg_freq_Id == this.prescriptions.value.prc_drg_frequency_id_FK);
    this.drg_frq = datafilter[0].drg_frq_order;
    // var datafilter = this.freues.filter(x => x.drg_freq_Id == this.prescription.value.prc_drg_frequency_id_FK);
    // this.drg_frq = datafilter[0].drg_frq_order;  
  }

  saveranges(){
    var datafilter = this.freues.filter(x => x.drg_freq_Id == this.prescription.value.prc_drg_frequency_id_FK);
    this.drg_frq = datafilter[0].drg_frq_order;   
  }


  drugchange() {
    var datafilter = this.cat.filter(x => x.drg_mst_id == this.prescriptions.value.prc_drug_id_FK);
    this.drg_type = datafilter[0].prc_drug_id_FK;
  }

  drugchanges() {
    var datafilter = this.drugdd.filter(x => x.drg_mst_id == this.prescription.value.prc_drug_id_FK);
    this.drg_type = datafilter[0].drg_type_name;
  }

  updatedrugs() {
    // const drugId = this.prescription.value.prc_drug_id_FK || 0;
    this.service.put_presc(this.prescription.value)
      .subscribe((res) => {
        this.notif.successmsg("prescription Updated Successfully")
        this.prescriptions.controls['prc_drug_id_FK'].setValue(undefined);
        this.prescription.controls['drg_Category_Id'].setValue(undefined);
        this.prescriptions.controls['prc_dosage_qty'].setValue(undefined);
        this.prescriptions.controls['prc_drg_frequency_id_FK'].setValue(undefined);
        this.prescriptions.controls['prc_intake'].setValue(undefined);
        this.prescriptions.controls['prc_drug_duration'].setValue(undefined);
        this.prescriptions.controls['prc_duration_intermof'].setValue(undefined);
        this.prescriptions.controls['prc_intake_instaruction'].setValue(undefined);
        this.prescriptions.controls['othersDrugName'].setValue(undefined);
        this.isedit = true;
        this.issave = false;
        this.Get_drugpresbyid(this.con_id);
        this.prescription.reset();
        window.location.reload();
      })
      // this.prescription.reset();
      
     
  }

  istruc() {
    this.enable = false;
  }

  Get_drugpresbyid(id) {
    this.service.Get_drugpresby_id(id)
      .subscribe((data) => {
        this.data = data       
      });
  }

  //view dialog
  view(d: any) {
    const dialogRef = this.dialog.open(ViewPrescriptionComponent,
      {
        height: '60%',
        width: '60%',
        data: { d },
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  delete(d:any) {
    const dialogRef = this.dialog.open(DeletePrescriptionsComponent,
      {
        width: "100%",
          maxWidth: "400px",
          height: "auto",
          hasBackdrop: true,
          maxHeight: "700px",
        data: {d}
      });
    dialogRef.afterClosed().subscribe(result => {
          
    });
  }

  pdf(d) {
    const dialogRef = this.dialog.open(PrescriptionPdfComponent,
      {
        height: '100%',
        width: '100%',
        data: { d: { coN_Id: this.con_id } },
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
