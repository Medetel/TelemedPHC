import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { DoctorRegistrationService } from '../doctor-registration.service';

@Component({
  selector: 'app-approve-doctor-reg',
  templateUrl: './approve-doctor-reg.component.html',
  styleUrls: ['./approve-doctor-reg.component.scss']
})
export class ApproveDoctorRegComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ApproveDoctorRegComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private service: DoctorRegistrationService, private notif: Notification) { }
  doctor = new FormGroup({
    Remarks: new FormControl(''),
    DO_Id: new FormControl(''),
    DO_FirstName: new FormControl(''),
    DO_LastName: new FormControl(''),
    DO_Gender: new FormControl(''),
    DO_MobileNumber: new FormControl(''),
    Regno: new FormControl(''),
    DO_HO_Id_FK: new FormControl(''),
    DO_DE_Id_FK: new FormControl(''),
    DO_CD_Id_FK: new FormControl(''),
    DO_SP_Id_FK: new FormControl(''),
    DO_Spc_Id_FK: new FormControl(''),
    DO_SC_Id_FK: new FormControl(''),
    // DO_SD_Id_FK: new FormControl(''),
    DO_NE_Id_FK: new FormControl(''),


  })
  ngOnInit(): void {
    this.bind();
    this.disable();
    //this.Image_Url= { url: `${environment.API_Base_URL}` +`Doctor/GetDoctor_Images?filename=${this._data.d.dO_Photo}`}
  }
  bind() {
    this.doctor.controls['DO_FirstName'].setValue(this._data.d.dO_FirstName);
    this.doctor.controls['DO_LastName'].setValue(this._data.d.dO_LastName);
    this.doctor.controls['DO_Id'].setValue(this._data.d.dO_Id);
    this.doctor.controls['DO_CD_Id_FK'].setValue(this._data.d.dO_ClinicalDiscipline);
    this.doctor.controls['DO_Gender'].setValue(this._data.d.dO_Gender);
    this.doctor.controls['DO_MobileNumber'].setValue(this._data.d.dO_MobileNumber);
    this.doctor.controls['Regno'].setValue(this._data.d.regno);
    // this.doctor.controls['DO_HO_Id_FK'].setValue(this._data.d.dO_Hospital);
    this.doctor.controls['DO_DE_Id_FK'].setValue(this._data.d.dO_Designation);
    // this.doctor.controls['DO_SP_Id_FK'].setValue(this._data.d.dO_Specialization);
    if (this._data.d.dO_Type === 'Clinic') {
      // If dO_Type is 'Clinic', bind the clinicName
      this.doctor.controls['DO_HO_Id_FK'].setValue(this._data.d.clinicName);
    } else {
      // Otherwise, bind the hospital
      this.doctor.controls['DO_HO_Id_FK'].setValue(this._data.d.dO_Hospital);
      this.doctor.controls['DO_NE_Id_FK'].setValue(this._data.d.nE_Description);
    }
    this.doctor.controls['DO_Spc_Id_FK'].setValue(this._data.d.sD_ClinicalSpecilist);
    this.doctor.controls['DO_SC_Id_FK'].setValue(this._data.d.spc_Name);
    this.doctor.controls['DO_SP_Id_FK'].setValue(this._data.d.sP_Specialization);
  }
  disable() {
    this.doctor.controls['DO_FirstName'].disable();
    this.doctor.controls['DO_LastName'].disable();
    this.doctor.controls['DO_CD_Id_FK'].disable();
    this.doctor.controls['DO_Gender'].disable();
    this.doctor.controls['DO_MobileNumber'].disable();
    this.doctor.controls['Regno'].disable();
    this.doctor.controls['DO_HO_Id_FK'].disable();
    this.doctor.controls['DO_DE_Id_FK'].disable();
    // this.doctor.controls['DO_SP_Id_FK'].disable();
    this.doctor.controls['DO_Spc_Id_FK'].disable();
    this.doctor.controls['DO_SC_Id_FK'].disable();
    this.doctor.controls['DO_SP_Id_FK'].disable();
    this.doctor.controls['DO_NE_Id_FK'].disable();
  }
  approveform() {
    this.service.Put_Approval(this.doctor.value)
      .subscribe((res) => {
        this.notif.successmsg("doctor Approved Successfully")
        this.dialogRef.close();
        window.location.reload();
      })
  }

}
