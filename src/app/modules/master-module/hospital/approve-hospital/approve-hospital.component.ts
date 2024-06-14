import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { HospitalService } from '../hospital.service';
import { Notification } from 'src/app/core/Notifications/Notification';

@Component({
  selector: 'app-approve-hospital',
  templateUrl: './approve-hospital.component.html',
  styleUrls: ['./approve-hospital.component.scss']
})
export class ApproveHospitalComponent implements OnInit {

  hos_bran_hid: boolean = true;
  hos_netid: boolean = true;
  Image_Url;
  constructor(private dialogRef: MatDialogRef<ApproveHospitalComponent>,@Inject(MAT_DIALOG_DATA) private _data: any, private service: HospitalService,
    private notif: Notification) { }
  hospital = new FormGroup({
    hos_Id: new FormControl(''),
    Remarks: new FormControl(''),
    hos_HospitalName: new FormControl(''),
    hos_HospitalCode: new FormControl(''),
    RegNo: new FormControl(''),
    hos_HospitalPhoneNo: new FormControl(''),
    hos_HospitalAddress: new FormControl(''),
    primaryorBranch: new FormControl(''),
    hos_Branch: new FormControl(''),
    hos_NE_Id_FK: new FormControl(''),
    hos_ST_Id_FK: new FormControl(''),


  })
  ngOnInit(): void {
    this.disable();
    this.bind();
    // this.Image_Url = 'data:image/jpeg;base64,' + this._data.d.logobyte;
    // this.Image_Url= { url: `${environment.API_Base_URL}` +`Hospital/GetHospital_Images?filename=${this._data.d.hos_HospitalLogo}`  }
    if (this._data.d.primaryorBranch == 'Primary') {
      //this.hos_bran_hid=true;
      this.hos_bran_hid = true;
    }
    else {
      this.hos_bran_hid = false;
    }

    if (this._data.d.primaryorBranch == 'Branch') {
      //this.hos_bran_hid=true;
      this.hos_netid = true;
    }
    else {
      this.hos_netid = false;
    }
  }
  bind() {

    this.hospital.controls['RegNo'].setValue(this._data.d.regNo);
    this.hospital.controls['hos_HospitalName'].setValue(this._data.d.hos_HospitalName);
    this.hospital.controls['hos_HospitalCode'].setValue(this._data.d.hos_HospitalCode);
    this.hospital.controls['hos_HospitalPhoneNo'].setValue(this._data.d.hos_HospitalPhoneNo); 
    this.hospital.controls['hos_HospitalAddress'].setValue(this._data.d.hos_HospitalAddress);
    this.hospital.controls['primaryorBranch'].setValue(this._data.d.primaryorBranch);
    this.hospital.controls['hos_Branch'].setValue(this._data.d.hos_BranchName);
    this.hospital.controls['hos_NE_Id_FK'].setValue(this._data.d.nE_Description);
    this.hospital.controls['hos_ST_Id_FK'].setValue(this._data.d.hos_state_name);
    this.hospital.controls['hos_Id'].setValue(this._data.d.hos_Id);
    console.log("Approve form data :" + JSON.stringify(this._data.d)); 
  }
  disable() {
    this.hospital.controls['RegNo'].disable();
    this.hospital.controls['hos_HospitalName'].disable();
    this.hospital.controls['hos_HospitalCode'].disable();
    this.hospital.controls['hos_HospitalPhoneNo'].disable();
    this.hospital.controls['hos_HospitalAddress'].disable();
    this.hospital.controls['primaryorBranch'].disable();
    this.hospital.controls['hos_Branch'].disable();
    this.hospital.controls['hos_NE_Id_FK'].disable();
    this.hospital.controls['hos_ST_Id_FK'].disable();
  }
  approveform() {
    this.service.Put_Approval(this.hospital.value)
      .subscribe((res) => {
        this.notif.successmsg("hospital Approved Successfully")
        this.dialogRef.close();
    window.location.reload();
      })
    
  }

}
