import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { PHCManualAppointService } from '../../phc-manual-appoint.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-approve-appoinmentphc',
  templateUrl: './approve-appoinmentphc.component.html',
  styleUrls: ['./approve-appoinmentphc.component.scss']
})
export class ApproveAppoinmentphcComponent implements OnInit {

  patient_name;
  patient_id;
  apt_date;
  apt_f_time;
  apt_to_time;
  apt_docor;
  apt_weight;
  apt_height;
  apt_temp;
  apt_pulse;
  apt_res_rate;
  apt_bloodpressure;
  apt_spo2;
  apt_hemoglobin;
  apt_glucose;
  lp_total_cholesterol: any;
  lp_triglycerides: any;
  lp_hdl_cholesterol:any;
  lp_ldl: any;
  complaint: any;
  symptoms: any;
  Diseases: any;
  medications: any;
  Image_Url;
  today = new Date();
  hos_NE_Id_FK;
  allergy;
  apt_bpmeditation;
  apt_sugarmeditation;
  app_hospital;
  mAppt_Id;
  minDate:any = new Date();
  constructor(private dialogRef: MatDialogRef<ApproveAppoinmentphcComponent>,@Inject(MAT_DIALOG_DATA) private _data: any, private service: PHCManualAppointService, private notif: Notification) { }
  patient = new FormGroup({
    pR_Id: new FormControl('')
  })
  fixappointment = new FormGroup({
    phc_Appt_Id: new FormControl(''),
    CON_ConsultedTime: new FormControl(''),
    CON_ConsultedDate: new FormControl(''),
    Remarks: new FormControl(''),
    appt_PatientId_FK: new FormControl(''),
    appt_DateTime: new FormControl(this.today),
    select_toTime: new FormControl(''),
    hos_NE_Id_FK: new FormControl(''),
    select_FrmTime: new FormControl(''),
    select_day: new FormControl(''),
    complaint: new FormControl(''),
    medications: new FormControl(''),
    diseasesDtl: new FormControl(''),
    symptoms: new FormControl(''),
    allergySigns_DTL: new FormControl(''),
    // underBPMedication: new FormControl(''),
    // underSugarMedication: new FormControl(''),
  })

  ngOnInit(): void {    
    this.approve();
    this.bind();
    //this.Image_Url = this._data.d.pR_Image;
  }

  calculateBMI(): string {
    if (this.apt_height && this.apt_weight) {
      // Convert height from cm to meters (1 cm = 0.01 m)
      const heightInMeters = this.apt_height / 100;

      // Calculate BMI
      const bmi = this.apt_weight / (heightInMeters * heightInMeters);

      // Format BMI to display in metric square
      return bmi.toFixed(2) + ' kg/m²';
    }
    // Return an empty string or an appropriate message if height or weight is missing.
    return 'N/A';
  }
  bind() {
    //this.Image_Url =environment.Image_Url +'Images/'+this._data.pR_Photo 
    console.log('patient data :' +JSON.stringify(this._data.d))
    this.patient_name = this._data.d.appt_P_Name;
    this.patient_id = this._data.d.appt_P_Code;
    this.complaint = this._data.d.complaintslist;
    this.symptoms = this._data.d.symptomslist;
    this.Diseases = this._data.d.diseaseslist;
    this.apt_date = this._data.d.select_date;
    this.app_hospital = this._data.d.hos_HospitalName;
    this.apt_f_time = this._data.d.select_FrmTime;
    this.apt_to_time = this._data.d.select_toTime;
    this.Image_Url = this._data.d.pR_Image;
    this.allergy = this._data.d.allergylist;
    this.medications = this._data.d.medicationlist;
    this.apt_height = this._data.d.appt_PA_Height;
    this.apt_weight = this._data.d.appt_PA_Weight;
    this.apt_temp = this._data.d.appt_PA_TempInCelsius;
    this.apt_bloodpressure = this._data.d.appt_PA_BloodPressure;
    this.apt_pulse = this._data.d.appt_PA_PulseRate;
    this.apt_res_rate = this._data.d.appt_PA_RespiratoryRate;
    this.apt_spo2 = this._data.d.appt_PA_OxygenSaturation;
    this.apt_glucose = this._data.d.appt_PA_Sugar;
    this.lp_total_cholesterol=this._data.d.lp_total_cholesterol;
    this.lp_triglycerides=this._data.d.lp_triglycerides;
    this.lp_hdl_cholesterol=this._data.d.lp_hdl_cholesterol;
    this.lp_ldl=this._data.d.lp_ldl;
    this.apt_hemoglobin = this._data.d.appt_PA_Hemoglobin;
    // this.apt_bpmeditation = this._data.d.underBPMedication;
    // this.apt_sugarmeditation = this._data.d.underSugarMedication;
    this.fixappointment.controls['CON_ConsultedDate'].setValue(this._data.d.select_date);

  }
  approve() {
    this.fixappointment.controls['phc_Appt_Id'].setValue(this._data.d.phc_Appt_Id);
  }

  approveform() {
    this.service.Put_Approval(this.fixappointment.value)
      .subscribe((res) => {
        this.notif.successmsg("AppointmentPHC Approved Successfully")
        this.dialogRef.close();
        window.location.reload(); 
      })
      this.fixappointment.reset();
  }

}
