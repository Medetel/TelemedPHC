import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { CounsultationService } from '../../counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';
import { EditlabComponent } from './editlab/editlab.component';
import { DeletelabComponent } from './deletelab/deletelab.component';
import { LabtestPdfComponent } from './labtest-pdf/labtest-pdf.component';

@Component({
  selector: 'app-lab-test',
  templateUrl: './lab-test.component.html',
  styleUrls: ['./lab-test.component.scss']
})
export class LabTestComponent implements OnInit {
  isedit = true;
  isap_id = true;
  issave = false;
  Labadd: FormGroup;
  Labedit: FormGroup;
  con_id: any;
  catogory: any;
  discription: any;
  data: any;
  discriptions_edit: any;
  constructor(private service: CounsultationService, private fb: FormBuilder, private notif: Notification, private route: ActivatedRoute, public dialog: MatDialog) {
    this.Labadd = this.fb.group({
      'category_Id': [''],
      'description_Id': [''],
      'othersLabTest':[''],
      'coN_Id': [this.route.snapshot.params['id']],
    })
    //update
    this.Labedit = this.fb.group({
      'id': [''],
      'category_Id': [''],
      'description_Id': [''],
      'othersLabTest': [''],
      'coN_Id': [this.route.snapshot.params['id']],
    })

    this.Labadd.get('category_Id').valueChanges.subscribe((categoryId) => {
      if (categoryId === 69) {
        this.Labadd.get('description_Id').clearValidators();
        this.Labadd.get('description_Id').updateValueAndValidity();
        this.Labadd.get('othersLabTest').setValidators([Validators.required]);
      } else {
        this.Labadd.get('description_Id').setValidators([Validators.required]);
        this.Labadd.get('othersLabTest').clearValidators();
        this.Labadd.get('othersLabTest').updateValueAndValidity();
      }
    });

    this.Labedit.get('category_Id').valueChanges.subscribe((categoryId) => {
      if (categoryId === 69) {
        this.Labedit.get('description_Id').clearValidators();
        this.Labedit.get('description_Id').updateValueAndValidity();
        this.Labedit.get('othersLabTest').setValidators([Validators.required]);
      } else {
        this.Labedit.get('description_Id').setValidators([Validators.required]);
        this.Labedit.get('othersLabTest').clearValidators();
        this.Labedit.get('othersLabTest').updateValueAndValidity();
      }
    });

    this.Labadd.get('category_Id').valueChanges.subscribe(() => {
      this.Labadd.get('othersLabTest').reset(); 
    });

    this.Labedit.get('category_Id').valueChanges.subscribe(() => {
      this.Labedit.get('othersLabTest').reset(); 
    });
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      id = +params['id'];
      this.con_id = id;
    });
    this.get_Labcategorydd();
    //this.Get_discptnall();
    this.get_labtestbyid(this.con_id);
  }


  get_Labcategorydd() {
    this.service.Get_labcategorydd()
      .subscribe((data) => {
        this.catogory = data
      })
  }

  typescategory(event) {
    this.Labadd.controls['description_Id'].setValue(undefined);
    this.service.Get_labdecrptndd(event)
      .subscribe((data) => {
        this.discription = data
        this.Labadd.controls['description_Id'].setValue(this.discription.dt_Id);
      })
  }

  typescategorys(event) {
    // alert(JSON.stringify(event))
    //return;
    this.Labedit.controls['description_Id'].setValue(undefined);
    this.service.Get_labdecrptndd(event)
      .subscribe((data) => {
        this.discriptions_edit = data
        this.Labedit.controls['description_Id'].setValue(this.discriptions_edit.dt_Id);
      })
  }

  Get_discptnall() {
    this.service.Get_discriptionall()
      .subscribe((data) => {
        this.discriptions_edit = data
      })
  }

  edit(d: any) {
    // alert('edit')
    this.isedit = false;
    this.isap_id = false;
    this.issave = true;
    console.log("edit single row data :" + JSON.stringify(this.Labedit.value.category_Id))
    this.Labedit.controls['category_Id'].setValue(d.category_Id);
    this.Labedit.controls['description_Id'].setValue(d.dt_Id)
    this.service.Get_labdecrptndd(this.Labedit.value.category_Id)
      .subscribe((data) => {
        this.discriptions_edit = data
      })
    this.Labedit.controls['coN_Id'].setValue(d.coN_Id);
    this.Labedit.controls['id'].setValue(d.id);
    this.Labedit.controls['othersLabTest'].setValue(d.othersLabTest);
  }

  save() {   
    const descId = this.Labadd.value.description_Id || 0;
    var labData={
      category_Id:this.Labadd.value.category_Id,
      coN_Id:this.con_id,
      description_Id: descId,
      othersLabTest: this.Labadd.value.othersLabTest
    }    
    this.service.Post_labtest(labData)
      .subscribe((res) => {
        this.notif.successmsg("Lab test info added successfully")
        this.get_labtestbyid(this.con_id);
        this.Labadd.reset();
        window.location.reload();
      })
      // this.Labadd.reset();
  }

  get_labtestbyid(id) {
    this.service.get_labtestbyid(id)
      .subscribe((data) => {
        this.data = data
        
      });
  }
  update() {
    // const descId = this.Labadd.value.description_Id || 0;
    this.service.Put_Lab(this.Labedit.value)
      .subscribe((res) => {
        this.notif.successmsg("Lab test info updated successfully")
        this.Labedit.controls['category_Id'].setValue(undefined);
        this.Labedit.controls['description_Id'].setValue(undefined);
        this.Labedit.controls['othersLabTest'].setValue(undefined);
        this.isedit = true;
        this.issave = false;
        this.get_labtestbyid(this.con_id);
        this.Labedit.reset();
        window.location.reload();
      })
      // this.Labedit.reset();
  }

  view(d: any) {
    const dialogRef = this.dialog.open(EditlabComponent,
      {
        height: '60%',
        width: '60%',
        data: { d },
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

  delete(d:any) {
    const dialogRef = this.dialog.open(DeletelabComponent,
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
    const dialogRef = this.dialog.open(LabtestPdfComponent,
      {
        height: '100%',
        width: '100%',
        data: { d: { coN_Id: this.con_id } },
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
