import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { CounsultationService } from '../../counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';
import { TooltipPosition } from '@angular/material/tooltip';
import { ViewDietComponent } from './view-diet/view-diet.component';
import { DeleteDietComponent } from './delete-diet/delete-diet.component';

@Component({
  selector: 'app-diet-plan',
  templateUrl: './diet-plan.component.html',
  styleUrls: ['./diet-plan.component.scss']
})
export class DietPlanComponent implements OnInit {
  Dietplan: FormGroup;
  con_id: any;
  data: any;
  dtOptions = {};
  isedit = true;
  isap_id = true;
  issave = false;
  TooltipPosition: TooltipPosition[] = ['above'];
  Dietplans: FormGroup;

  constructor(private service: CounsultationService, private fb: FormBuilder, private notif: Notification, private route: ActivatedRoute, public dialog: MatDialog) {
    this.Dietplan = this.fb.group({
      'dp_intake': [''],
      'dp_duration': ['',Validators.pattern(/^[0-9]\d*$/)],
      'dp_dura_interof': [''],
      'dp_instruction': [''],
      //'dP_CON_Id_FK': [this.route.snapshot.params['id']],
    })
    //update
    this.Dietplans = this.fb.group({
      'dp_Id': [''],
      'dp_intake': [''],
      'dp_duration': ['',Validators.pattern(/^[0-9]\d*$/)],
      'dp_dura_interof': [''],
      'dp_instruction': [''],
      //'dP_CON_Id_FK': [this.route.snapshot.params['id']],
    })
  }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      id = +params['id'];
      this.con_id = id;
    });
    this.Get_dietbyid(this.con_id)

    this.dtOptions = {
      //dom: 'lBfrtip',
      lengthMenu: [[2, 5, 10, -1], [2, 5, 10, "All"]],
      scroll: "300px",
    }
  }

  save() {
    if (this.Dietplan.value.dp_duration === '') {
      this.Dietplan.patchValue({ dp_duration: 0 });
    }

    var dietSavedata={
      'dp_intake':this.Dietplan.value.dp_intake,
      'dp_duration':this.Dietplan.value.dp_duration,
      'dp_dura_interof':this.Dietplan.value.dp_dura_interof,
      'dp_instruction':this.Dietplan.value.dp_instruction,     
      'dP_CON_Id_FK':this.con_id
      }
    this.service.Post_diet(dietSavedata)
      .subscribe((res) => {
        this.notif.successmsg("Diet plan added successfully")
        this.Get_dietbyid(this.con_id);
        // this.Dietplan.reset();
      })
      this.Dietplan.reset();
  }

  Get_dietbyid(id) {
    this.service.Get_dietbyid(id)
      .subscribe((data) => {
        this.data = data
      });
  }

  edit(d: any) {
    this.isedit = false;
    this.isap_id = false;
    this.issave = true;
    this.Dietplans.controls['dp_intake'].setValue(d.dp_intake);
    this.Dietplans.controls['dp_duration'].setValue(d.dp_duration);
    this.Dietplans.controls['dp_dura_interof'].setValue(d.dp_dura_interof);
    this.Dietplans.controls['dp_instruction'].setValue(d.dp_instruction);
    this.Dietplans.controls['dp_Id'].setValue(d.dp_Id);
  }

  Update() {
    if (this.Dietplans.value.dp_duration === '') {
      this.Dietplans.patchValue({ dp_duration: 0 });
    }
    // if(this.Dietplans.invalid){
    //   return;
    // }
    var dietUpdatedata={
    'dp_intake':this.Dietplans.value.dp_intake,
    'dp_duration':this.Dietplans.value.dp_duration,
    'dp_dura_interof':this.Dietplans.value.dp_dura_interof,
    'dp_instruction':this.Dietplans.value.dp_instruction,
    'dp_Id':this.Dietplans.value.dp_Id,
    'dP_CON_Id_FK':this.con_id
    }

    this.service.Put_diet(dietUpdatedata)
      .subscribe((res) => {
        this.notif.successmsg("Diet plan updated successfully")
        this.Dietplan.controls['dp_intake'].setValue(undefined);
        this.Dietplan.controls['dp_duration'].setValue(undefined);
        this.Dietplan.controls['dp_dura_interof'].setValue(undefined);
        this.Dietplan.controls['dp_instruction'].setValue(undefined);
        this.isedit = true;
        this.issave = false;
        this.Get_dietbyid(this.con_id);
        
      })
      this.Dietplans.reset();
  }

  view(d: any) {
    const dialogRef = this.dialog.open(ViewDietComponent,
      {
        height: '52%',
        width: '60%',
        data: { d },
      });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  delete(d: any) {
    const dialogRef = this.dialog.open(DeleteDietComponent,
      {
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        hasBackdrop: true,
        maxHeight: "700px",
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

}
