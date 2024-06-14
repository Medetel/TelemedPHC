import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { CounsultationService } from '../../counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';
import { ViewDiagComponent } from './view-diag/view-diag.component';
import { EditDiagComponent } from './edit-diag/edit-diag.component';
import { DeleteDiagComponent } from './delete-diag/delete-diag.component';

@Component({
  selector: 'app-diagnois',
  templateUrl: './diagnois.component.html',
  styleUrls: ['./diagnois.component.scss']
})
export class DiagnoisComponent implements OnInit {
  diagnosisdd: any;
  Diagnosis:FormGroup;
  diagnosisBtn = 'Add';
  data:any;
  isedit = true;
  isap_id = true;
  issave = false;
  dtOptions = {};
  con_id: any;
  Diagnosist:FormGroup;
  constructor(private service: CounsultationService, private fb: FormBuilder, private notif: Notification, private route: ActivatedRoute,public dialog: MatDialog) {
    this.Diagnosis = this.fb.group({
      'con_dia_mas_id_FK': [''],
      'con_dia_des_id_FK':[''],
      // 'con_diag_descrip': [''],
      'con_diag_conid_FK': [this.route.snapshot.params['id']],
      'remarks': [''],
    })
    this.Diagnosist = this.fb.group({
      'con_diag_id': [''],
      'con_dia_mas_id_FK': [''],
      'con_dia_des_id_FK': [''],
      // 'dD_Master': [''],
      // 'con_diag_descrip': [''],
      'remarks': [''],
      'con_diag_conid_FK':[this.route.snapshot.params['id']]
   })
   }


   nameValidators(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/,''/]/;
    // const spaceexp: RegExp =/[/\s/g, '']/

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }
  //  namevalidator(control:any):{ [key: string]: boolean } {
  //   const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\s/g,''/a-zA-Z]/;
  //   if (control.value && nameRegexp.test(control.value)) {
  //     return { invalidName: true };
  //   }
  //  }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      id = +params['id'];
      this.con_id = id;
    })
    this.Get_diagbyid(this.con_id);
    this.dtOptions = {
      //dom: 'lBfrtip',
      lengthMenu: [[5, 10, -1], [5, 10, "All"]],
      scroll: "300px",
    }
    this.Get_diagnosis_Catdd();
  }

  save(){   
    this.service.Post_diagnosis(this.Diagnosis.value)
      .subscribe((res) => {
        this.notif.successmsg("Diagnosis Added Successfully")
        this.Get_diagbyid(this.con_id);
        // this.Diagnosis.reset();
      })
      this.Diagnosis.reset();
  }
  Get_diagnosis_Catdd() {
    this.service.Get_diagnosis_Catdd()
      .subscribe((data) => {
        this.diagnosisdd = data
      })
  }

Get_diagbyid(id){
  this.service.Get_diagnosisbyid(id)
  .subscribe((data) => {
    this.data = data
    
  });
}
  //view dialog
  view(d: any) {
    const dialogRef = this.dialog.open(ViewDiagComponent,
      {
        height: '50%',
        width: '50%',
        data: { d },
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  discriptiondd: any;
  typescategory(event) {
    this.Diagnosis.controls['con_dia_des_id_FK'].setValue(undefined);
    this.service.Get_diagnosis_Desdd(event)
      .subscribe((data) => {
        this.discriptiondd = data       
        this.Diagnosis.controls['con_dia_des_id_FK'].setValue(this.discriptiondd);
        console.log('dd', this.discriptiondd)
      })
  }


  typescategorys(event) {
    // alert(JSON.stringify(event))
    //return;
    this.Diagnosist.controls['con_dia_des_id_FK'].setValue(undefined);
    this.service.Get_diagnosis_Desdd(event)
      .subscribe((data) => {
        this.discriptions_edit = data
        this.Diagnosist.controls['con_dia_des_id_FK'].setValue(this.discriptions_edit.dD_Id);
      })
  }

  discriptions_edit: any;
  edit(d: any) {
    this.isedit = false;
    this.isap_id = false;
    this.issave = true;
    console.log("edit single row data :" + JSON.stringify(d.con_dia_mas_id_FK))
    this.Diagnosist.controls['con_dia_mas_id_FK'].setValue(d.dM_Id); 
    this.Diagnosist.controls['con_dia_des_id_FK'].setValue(d.dD_Id);
    this.service.Get_diagnosis_Desdd(this.Diagnosist.value.con_dia_mas_id_FK)
      .subscribe((data) => {
        this.discriptions_edit = data
      })
    // this.Diagnosist.controls['con_diag_descrip'].setValue(d.con_diag_descrip);
    this.Diagnosist.controls['con_diag_id'].setValue(d.con_diag_id);
    this.Diagnosist.controls['con_diag_conid_FK'].setValue(d.con_diag_conid_FK);
    this.Diagnosist.controls['remarks'].setValue(d.remarks);
  }

  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteDiagComponent,
      {
        height: '30%',
        width: '30%',
        data: { d },
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  update(){
    this.service.Put_diagnosis(this.Diagnosist.value)
    .subscribe((res) => {
      //this.diagnosisBtn = 'Add'
      this.notif.successmsg("Diagnosis Updated Successfully")
      this.Get_diagbyid(this.con_id);
      // this.Diagnosist.controls['con_diag_descrip'].setValue(undefined);
      // this.Diagnosist.reset();
      this.isedit = true;
      this.issave = false;
    })
    this.Diagnosist.reset();
  }

}
