import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute, Params } from '@angular/router';
import { EcgMonitorComponent } from '../../appointment/add-appointment/appointment-patient/ecg-monitor/ecg-monitor.component';
import { PulseOximeterComponent } from '../../appointment/add-appointment/appointment-patient/pulse-oximeter/pulse-oximeter.component';
import { CounsultationService } from '../../consultation/counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';
import { CheckoutFormService } from '../checkout-form.service';
import { PackagesPhcComponent } from '../packages-phc/packages-phc.component';

@Component({
  selector: 'app-view-vitals',
  templateUrl: './view-vitals.component.html',
  styleUrls: ['./view-vitals.component.scss']
})
export class ViewVitalsComponent implements OnInit {

  appoi_id: any;
  paradata: any;
  appoinmt: any;
  fixappointment: FormGroup;
  viewhid: boolean = false;
  cons_id: any;
  cons_pr_id: any;

  TooltipPosition: TooltipPosition[] = ['above'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ViewVitalsComponent>, public dialog: MatDialog, private notif: Notification, private service: CheckoutFormService, private fb: FormBuilder, private route: ActivatedRoute) {
    
    this.fixappointment = this.fb.group({
      'pA_Height': [''],
      'pA_Weight': [''],
      'pA_TempInCelsius': [''],
      'pA_BloodPressure': [''],
      'pA_Sugar': [''],
      'pA_PulseRate': [''],
      'pA_RespiratoryRate': [''],
      'pA_OxygenSaturation': [''],
      'pA_Hemoglobin': [''],
      'pA_ECG': [''],
      'lp_total_cholesterol': [''],
      'lp_triglycerides': [''],
      'lp_hdl_cholesterol': [''],
      'lp_ldl': [''],
      'pA_Id': [''],
      'pA_BMI': [{ value: '', disabled: true }],
      'coN_Id': [this.route.snapshot.params['id']],
      "lp_hiv_First": [''],
      "lp_dengue": [''],
      "lp_malaria": [''],
      "lp_pregnancy": [''],
      "lp_syphilis": [''],
      "lp_Tem_three": [''],
      "lp_Tem_forth": [''],
      "lp_tsh": [''],
      "lp_hiv_two": [''],
      "lp_hepatitis_c": [''],
      "lp_troponin_one": [''],
      "lp_leucocytes": [''],
      "lp_nitrite": [''],
      "lp_pH": [''],
      "lp_protein": [''],
      "lp_blood": [''],
      "lp_specific_gravity": [''],
      "lp_ketone": [''],
      "lp_fev_one": [''],
      "lp_fvc": [''],
      "lp_tlc": [''],
      "lp_fvc_ratio": [''],
      "lp_pef": [''],
      "lp_fef_twentyfive": [''],
      "lp_fef_fifty": [''],
      "lp_fef_seventyfive": [''],
      "lp_tidalvolume": ['']
    })
  }

  package_desc1 = true;
  package_desc2 = true;
  package_desc3 = true;
  package_desc4 = true;
  package_desc5 = true;
  package_desc6 = true;
  package_desc7 = true;

  ngOnInit(): void {
    this.cons_id = this.data.d.cons_id;
    this.cons_pr_id = this.data.d.cons_pr_id;


    this.onHeightWeightChange()
    let id = +this.route.snapshot.params['id'];

    this.route.params.subscribe((params: Params) => {
      id = +params['id'];
      // this.appoi_id = this.data.d.cons_id;
    });

    this.Get_vitalbyid(this.cons_pr_id,this.cons_id);
    

  }


  calculateBMI() {
    const height = this.fixappointment.get('pA_Height').value;
    const weight = this.fixappointment.get('pA_Weight').value;

    if (height && weight) {
      // Calculate BMI using the formula: BMI = weight (kg) / (height (m) * height (m))
      const heightInMeters = height / 100; // Convert height from cm to meters
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2); // Rounded to 2 decimal places

      this.fixappointment.get('pA_BMI').setValue(bmi);
    } else {
      this.fixappointment.get('pA_BMI').setValue(''); // Clear BMI when height or weight is empty
    }
  }

  onHeightWeightChange() {
    this.fixappointment.get('pA_Height').valueChanges.subscribe(() => {
      this.calculateBMI();
    });

    this.fixappointment.get('pA_Weight').valueChanges.subscribe(() => {
      this.calculateBMI();
    });
  }




  Get_vitalbyid(cons_pr_id: any, cons_id: any) {
    this.service.Get_vital_id(cons_pr_id, cons_id)
      .subscribe((data) => {
        this.appoinmt = data
        // console.log("A:", this.appoinmt[0])
        this.fixappointment.controls['pA_Id'].setValue(this.appoinmt[0].coN_PA_Id);
        this.fixappointment.controls['pA_Height'].setValue(this.appoinmt[0].pA_Height);
        this.fixappointment.controls['pA_Weight'].setValue(this.appoinmt[0].pA_Weight);
        this.fixappointment.controls['pA_TempInCelsius'].setValue(this.appoinmt[0].pA_TempInCelsius);
        this.fixappointment.controls['pA_BloodPressure'].setValue(this.appoinmt[0].pA_BloodPressure);
        this.fixappointment.controls['pA_Sugar'].setValue(this.appoinmt[0].pA_Sugar);
        this.fixappointment.controls['pA_PulseRate'].setValue(this.appoinmt[0].pA_PulseRate);
        this.fixappointment.controls['pA_RespiratoryRate'].setValue(this.appoinmt[0].pA_RespiratoryRate);
        this.fixappointment.controls['pA_OxygenSaturation'].setValue(this.appoinmt[0].pA_OxygenSaturation);
        this.fixappointment.controls['pA_Hemoglobin'].setValue(this.appoinmt[0].pA_Hemoglobin);

        this.fixappointment.controls['lp_total_cholesterol'].setValue(this.appoinmt[0].lp_total_cholesterol);
        this.fixappointment.controls['lp_triglycerides'].setValue(this.appoinmt[0].lp_triglycerides);
        this.fixappointment.controls['lp_hdl_cholesterol'].setValue(this.appoinmt[0].lp_hdl_cholesterol);
        this.fixappointment.controls['lp_ldl'].setValue(this.appoinmt[0].lp_ldl);
        this.fixappointment.controls['lp_hiv_First'].setValue(this.appoinmt[0].lp_hiv_First);
        this.fixappointment.controls['lp_dengue'].setValue(this.appoinmt[0].lp_dengue);
        this.fixappointment.controls['lp_malaria'].setValue(this.appoinmt[0].lp_malaria);
        this.fixappointment.controls['lp_pregnancy'].setValue(this.appoinmt[0].lp_pregnancy);
        this.fixappointment.controls['lp_syphilis'].setValue(this.appoinmt[0].lp_syphilis);
        this.fixappointment.controls['lp_Tem_three'].setValue(this.appoinmt[0].lp_Tem_three);
        this.fixappointment.controls['lp_Tem_forth'].setValue(this.appoinmt[0].lp_Tem_forth);
        this.fixappointment.controls['lp_tsh'].setValue(this.appoinmt[0].lp_tsh);
        this.fixappointment.controls['lp_hiv_two'].setValue(this.appoinmt[0].lp_hiv_two);
        this.fixappointment.controls['lp_hepatitis_c'].setValue(this.appoinmt[0].lp_hepatitis_c);
        this.fixappointment.controls['lp_troponin_one'].setValue(this.appoinmt[0].lp_leucocytes);
        this.fixappointment.controls['lp_leucocytes'].setValue(this.appoinmt[0].lp_ldl);
        this.fixappointment.controls['lp_nitrite'].setValue(this.appoinmt[0].lp_nitrite);
        this.fixappointment.controls['lp_pH'].setValue(this.appoinmt[0].lp_pH);
        this.fixappointment.controls['lp_protein'].setValue(this.appoinmt[0].lp_protein);
        this.fixappointment.controls['lp_blood'].setValue(this.appoinmt[0].lp_blood);
        this.fixappointment.controls['lp_specific_gravity'].setValue(this.appoinmt[0].lp_specific_gravity);
        this.fixappointment.controls['lp_ketone'].setValue(this.appoinmt[0].lp_ketone);
        this.fixappointment.controls['lp_fev_one'].setValue(this.appoinmt[0].lp_fev_one);
        this.fixappointment.controls['lp_fvc'].setValue(this.appoinmt[0].lp_fvc);
        this.fixappointment.controls['lp_tlc'].setValue(this.appoinmt[0].lp_tlc);
        this.fixappointment.controls['lp_fvc_ratio'].setValue(this.appoinmt[0].lp_fvc_ratio);
        this.fixappointment.controls['lp_pef'].setValue(this.appoinmt[0].lp_pef);
        this.fixappointment.controls['lp_fef_twentyfive'].setValue(this.appoinmt[0].lp_fef_twentyfive);
        this.fixappointment.controls['lp_fef_fifty'].setValue(this.appoinmt[0].lp_fef_fifty);
        this.fixappointment.controls['lp_fef_seventyfive'].setValue(this.appoinmt[0].lp_fef_seventyfive);
        this.fixappointment.controls['lp_tidalvolume'].setValue(this.appoinmt[0].lp_tidalvolume);

        //disable all controls
        this.fixappointment.controls['pA_Id'].disable();
        this.fixappointment.controls['pA_Height'].disable();
        this.fixappointment.controls['pA_Weight'].disable();
        this.fixappointment.controls['pA_TempInCelsius'].disable();
        this.fixappointment.controls['pA_BloodPressure'].disable();
        this.fixappointment.controls['pA_Sugar'].disable();
        this.fixappointment.controls['pA_PulseRate'].disable();
        this.fixappointment.controls['pA_RespiratoryRate'].disable();
        this.fixappointment.controls['pA_OxygenSaturation'].disable();
        this.fixappointment.controls['pA_Hemoglobin'].disable();
        this.fixappointment.controls['lp_total_cholesterol'].disable();
        this.fixappointment.controls['lp_triglycerides'].disable();
        this.fixappointment.controls['lp_hdl_cholesterol'].disable();
        this.fixappointment.controls['lp_ldl'].disable();
        this.fixappointment.controls['lp_hiv_First'].disable();
        this.fixappointment.controls['lp_dengue'].disable();
        this.fixappointment.controls['lp_malaria'].disable();
        this.fixappointment.controls['lp_pregnancy'].disable();
        this.fixappointment.controls['lp_syphilis'].disable();
        this.fixappointment.controls['lp_Tem_three'].disable();
        this.fixappointment.controls['lp_Tem_forth'].disable();
        this.fixappointment.controls['lp_tsh'].disable();
        this.fixappointment.controls['lp_hiv_two'].disable();
        this.fixappointment.controls['lp_hepatitis_c'].disable();
        this.fixappointment.controls['lp_troponin_one'].disable();
        this.fixappointment.controls['lp_leucocytes'].disable();
        this.fixappointment.controls['lp_nitrite'].disable();
        this.fixappointment.controls['lp_pH'].disable();
        this.fixappointment.controls['lp_protein'].disable();
        this.fixappointment.controls['lp_blood'].disable();
        this.fixappointment.controls['lp_specific_gravity'].disable();
        this.fixappointment.controls['lp_ketone'].disable();
        this.fixappointment.controls['lp_fev_one'].disable();
        this.fixappointment.controls['lp_fvc'].disable();
        this.fixappointment.controls['lp_tlc'].disable();
        this.fixappointment.controls['lp_fvc_ratio'].disable();
        this.fixappointment.controls['lp_pef'].disable();
        this.fixappointment.controls['lp_fef_twentyfive'].disable();
        this.fixappointment.controls['lp_fef_fifty'].disable();
        this.fixappointment.controls['lp_fef_seventyfive'].disable();
        this.fixappointment.controls['lp_tidalvolume'].disable();


        if (this.appoinmt[0].serviceCode == 'PK0001') {
          this.package_desc1 = false
        }
        else if (this.appoinmt[0].serviceCode == 'PK0002') {
          this.package_desc1 = false
          this.package_desc2 = false
        }
        else if (this.appoinmt[0].serviceCode == 'PK0003') {
          this.package_desc1 = false
          this.package_desc2 = false
          this.package_desc3 = false
        }
        else if (this.appoinmt[0].serviceCode == 'PK0004') {
          this.package_desc1 = false
          this.package_desc2 = false
          this.package_desc3 = false
          this.package_desc4 = false
        }
        else if (this.appoinmt[0].serviceCode == 'PK0005') {
          this.package_desc1 = false
          this.package_desc2 = false
          this.package_desc3 = false
          this.package_desc4 = false
          this.package_desc5 = false
        }
        else if (this.appoinmt[0].serviceCode == 'PK0006') {
          this.package_desc1 = false
          this.package_desc2 = false
          this.package_desc3 = false
          this.package_desc4 = false
          this.package_desc5 = false
          this.package_desc6 = false
        }
        // else if (this.appoinmt.serviceCode == 'null') {
        //   this.package_desc1 = true
        //   this.package_desc2 = true
        //   this.package_desc3 = true
        //   this.package_desc4 = true
        //   this.package_desc5 = true
        //   this.package_desc6 = true
        //   this.package_desc7 = false
        // }
        else {
          this.notif.errorsmsg('No Packages Added')
        }
      })
  }
 

  ecgGraphData1() {
    const dialogRef = this.dialog.open(EcgMonitorComponent,
      {
        height: '80%',
        width: '60%',
        data: { d: 1, ApptId: this.appoinmt.coN_APPT_Id_FK }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  pulseOximeterDisplay() {
    const dialogRef = this.dialog.open(PulseOximeterComponent,
      {
        height: '88%',
        width: '58%',
        hasBackdrop: true,
        data: {
          spo2SaturationPercentage: 97,
          spo2PulseRate: 88,
          pulseOxyMeterData: [171.39717250021386, 171.58115643386594, 171.61053461161242, 171.51232291143955, 171.3694836788227, 171.18492200238046, 170.92163376423804, 170.57594707905233, 170.16126082408505, 169.6968970291294, 169.2015253626585, 168.69004959206057, 168.1727712178959, 167.70195918453248, 167.29474569428584, 166.90168911019407, 166.49586109579903, 166.06637464208336, 165.65837281264118, 165.29009302083367, 164.9170430509182, 164.56435311647442, 164.24062558355683, 163.8986150478654, 163.5645911549687, 163.29613168721892, 163.06332388013482, 162.7987457665855, 162.5212326861329, 162.2885667446921, 162.0747585695861, 161.81741469622327, 161.54001457815198, 161.30393842289047, 161.13174837212324, 161.0227520387125, 161.01107974003378, 161.18782185558257, 161.6091419649066, 162.30366251138614, 163.32731105312678, 164.69299217953312, 166.2978064054763, 168.00088813958558, 169.71482493126553, 171.39462321415743, 172.9783222833612, 174.36091842142213, 175.4817466755283, 176.3131427742909]
        }
      });
    dialogRef.afterClosed().subscribe(result => {

    });
  }


}
