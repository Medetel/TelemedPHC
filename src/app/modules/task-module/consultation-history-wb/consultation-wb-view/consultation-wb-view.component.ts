import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EcgMonitorComponent } from '../../appointment/add-appointment/appointment-patient/ecg-monitor/ecg-monitor.component';
import { PulseOximeterComponent } from '../../appointment/add-appointment/appointment-patient/pulse-oximeter/pulse-oximeter.component';
import { CounsultationService } from '../../consultation/counsultation.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-consultation-wb-view',
  templateUrl: './consultation-wb-view.component.html',
  styleUrls: ['./consultation-wb-view.component.scss']
})
export class ConsultationWbViewComponent implements OnInit {
 viewhid: boolean = false;
  data: any;
  TooltipPosition: TooltipPosition[] = ['above'];
  coN_Id: any;
  revisit: any;
  CON_Id: any;
  constructor(private fb: FormBuilder, private notif: Notification, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private _data: any, private service: CounsultationService, private route: ActivatedRoute) { }
  package_desc1 = true;
  package_desc2 = true;
  package_desc3 = true;
  package_desc4 = true;
  package_desc5 = true;
  package_desc6 = true;
  package_desc7 = true;
  ngOnInit(): void {
    this.Get_Consultation_id();
    this.Get_diagbyid();
    this.Get_drugpresbyid();
    this.get_labtestbyid();
    this.Get_dietbyid();
    this.Get_refarelbyid();
    this.get_document();
    this.data = this._data.d;
    let id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      id = +params['id'];
      this.coN_Id = id;
      // console.log("Grid data:",JSON.stringify(this._data.d))
    });
    this.Get_revisitbyid();
  }

  documentdetails: any;
  Image_Url: any;
  
  get_document() {
    this.service.Get_documentdetail_patientid(this._data.d.coN_PR_Id_FK)
      .subscribe((res) => {
        this.documentdetails = res
        this.Image_Url = environment.Image_Url + 'PatientDocuments';
      })
  }
  Get_Consultation_id() {
    this.service.Get_Consultation_id(this._data.d.coN_Id)
      .subscribe((data) => {
        this.data = data
        console.log("Consultation Details:", JSON.stringify(this.data))
        if (this.data.serviceCode == 'PK0001') {
          this.package_desc1 = false
        }
        else if (this.data.serviceCode == 'PK0002') {
          this.package_desc1 = false
          this.package_desc2 = false
        }
        else if (this.data.serviceCode == 'PK0003') {
          this.package_desc1 = false
          this.package_desc2 = false
          this.package_desc3 = false
        }
        else if (this.data.serviceCode == 'PK0004') {
          this.package_desc1 = false
          this.package_desc2 = false
          this.package_desc3 = false
          this.package_desc4 = false
        }
        else if (this.data.serviceCode == 'PK0005') {
          this.package_desc1 = false
          this.package_desc2 = false
          this.package_desc3 = false
          this.package_desc4 = false
          this.package_desc5 = false
        }
        else if (this.data.serviceCode == 'PK0006') {
          this.package_desc1 = false
          this.package_desc2 = false
          this.package_desc3 = false
          this.package_desc4 = false
          this.package_desc5 = false
          this.package_desc6 = false
        }
        else {
          this.notif.errorsmsg('No Vitals Found')
        }
      })
  }

  data1: any;
  Get_diagbyid() {
    this.service.Get_diagnosisbyid(this._data.d.coN_Id)
      .subscribe((data) => {
        this.data1 = data
      });
  }

  data2: any;
  Get_drugpresbyid() {
    this.service.Get_drugpresby_id(this._data.d.coN_Id)
      .subscribe((data) => {
        this.data2 = data
      });
  }

  data3: any;
  get_labtestbyid() {
    this.service.get_labtestbyid(this._data.d.coN_Id)
      .subscribe((data) => {
        this.data3 = data
      });
  }
  data4: any;
  Get_dietbyid() {
    this.service.Get_dietbyid(this._data.d.coN_Id)
      .subscribe((data) => {
        this.data4 = data
      });
  }

  data5: any;
  Get_refarelbyid() {
    this.service.Get_referralby_id(this._data.d.coN_Id)
      .subscribe((data) => {
        this.data5 = data
      });
  }
  data6: any;
  Get_revisitbyid() {
    this.service.Get_revistby_id(this._data.d.coN_Id)
      .subscribe((data) => {
        this.data6 = data
      });
  }

  calculateBMI(): string {
    if (this.data.coN_Height && this.data.coN_Weight) {
      // Convert height from cm to meters (1 cm = 0.01 m)
      const heightInMeters = this.data.coN_Height / 100;

      // Calculate BMI
      const bmi = this.data.coN_Weight / (heightInMeters * heightInMeters);

      // Format BMI to display in metric square
      return bmi.toFixed(2) + ' kg/m²';
    }
    // Return an empty string or an appropriate message if height or weight is missing.
    return 'N/A';
  }

  ecgGraphData() {
    const dialogRef = this.dialog.open(EcgMonitorComponent,
      {
        height: '80%',
        width: '60%',
        data: { d: 1, ApptId: this._data.d.Appt_Id }
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
