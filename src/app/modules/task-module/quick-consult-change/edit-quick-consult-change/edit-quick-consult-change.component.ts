import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Notification } from 'src/app/core/Notifications/Notification';
import { PHCManualAppointService } from '../../phc-manual-appoint.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit-quick-consult-change',
  templateUrl: './edit-quick-consult-change.component.html',
  styleUrls: ['./edit-quick-consult-change.component.scss']
})
export class EditQuickConsultChangeComponent implements OnInit {

  doctordd: any;
  minDate: any = new Date();
  pat: any;
  pat_id?: any;
  appid: number;
  Image_Url;
  complaint: any = [];
  complaint1: any = [];
  today = new Date();
  complaintselected: any;
  patient_name: any;
  patient_id: any;
  patient_dob: any;
  patient_age: any;
  patient_gender: any;
  apt_height: any;
  apt_weight: any;

  view_complaint: any = [];

  constructor(private dialogRef: MatDialogRef<EditQuickConsultChangeComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private service: PHCManualAppointService, private notif: Notification) { }
  @ViewChild('multiUserSearch') multiUserSearchInput: ElementRef;
  patient = new FormGroup({
    pR_Id: new FormControl('')
  })
  fixappointment = new FormGroup({
    appt_Id: new FormControl(''),
    appt_PatientId_FK: new FormControl(''),
    appt_DO_Id_FK: new FormControl('', Validators.required),
    appt_DateTime: new FormControl(this.today),
    select_toTime: new FormControl('', Validators.required),
    select_FrmTime: new FormControl('', Validators.required),
    select_day: new FormControl('', Validators.required),

  })
  ngOnInit(): void {

    this.Patient();
    this.bind();
    this.complaintselected = this.fixappointment.value.complaint;
    this.Get_doctor();
    this.Get_complaint();
    this.Image_Url = this._data.d.pR_Image;
  }
  nameValidators(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?/\s/g,''/a-zA-Z]/;
    // const spaceexp: RegExp =/[/\s/g, '']/
    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }

  isOptionDisabled3(option: any): boolean {
    const selectedOption = this.fixappointment.value.complaint;
    if (selectedOption == '') {
      return;
    }
    const noneOptionSelected = selectedOption && selectedOption.some((item: any) => item.cmst_Name === "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)");
    if (noneOptionSelected) {
      return option.cmst_Name != "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)" && noneOptionSelected;
    }
    else {
      return option.cmst_Name == "Other than Listed(ಪಟ್ಟಿ ಮಾಡಲಾದ ಹೊರತುಪಡಿಸಿ)"
    }

  }

  bind() {
    console.log(this._data.d)
    console.log("Complaint data:", this._data.d.complaintslist)
    this.view_complaint = this._data.d.complaintslist;
    this.apt_height = this._data.d.height;
    this.apt_weight = this._data.d.weight;
    //this.fixappointment.controls['complaint'].setValue(this._data.d.complaintslist);    
    this.fixappointment.controls['appt_Id'].setValue(this._data.d.appt_Id);
    this.fixappointment.controls['appt_PatientId_FK'].setValue(this._data.d.appt_PatientId_FK);
    this.fixappointment.controls['appt_DO_Id_FK'].setValue(this._data.d.appt_DO_Id_FK);
    this.fixappointment.controls['appt_DateTime'].setValue(this._data.d.appt_DateTime);
    this.fixappointment.controls['select_toTime'].setValue(this._data.d.select_toTime);
    this.fixappointment.controls['select_FrmTime'].setValue(this._data.d.select_FrmTime);
    this.fixappointment.controls['select_day'].setValue(this._data.d.select_day);
  }

  Get_doctor() {
    this.service.Get_Doctordd()
      .subscribe((data) => {
        this.doctordd = data
      })
  }

  updateform() {
    /*
    const formdata = new FormData();
    //const ass_DOB = new DatePipe('en-US').transform(this.doctor.value.DO_DOB, 'dd/MM/yyyy')
    formdata.append('height', this.fixappointment.value.height);
    formdata.append('weight', this.fixappointment.value.weight);
    formdata.append('complaint',this.fixappointment.value.complaint);
    formdata.append('underBPMedication', this.fixappointment.value.underBPMedication);
    formdata.append('underSugarMedication', this.fixappointment.value.underSugarMedication);
    formdata.append('select_day', this.fixappointment.value.select_day);
    formdata.append('select_FrmTime', this.fixappointment.value.select_FrmTime);
    formdata.append('select_toTime', this.fixappointment.value.select_toTime);
    formdata.append('appt_DO_Id_FK', this.fixappointment.value.appt_DO_Id_FK); 
    formdata.append('PR_Id', this._data.d.appt_PatientId_FK) 
    */
    // console.log("Edit data: ",this.fixappointment.value ) 

    if (this.apt_height == null || this.apt_height == "") {
      this.apt_height = null;
    }
    if (this.apt_weight == null || this.apt_weight == "") {
      this.apt_weight = null;
    }
    const selectedDate = new DatePipe('en-US').transform(this.fixappointment.value.select_day, 'yyyy-MM-dd')
    var postData = {
      'appt_Id': this._data.d.appt_Id,
      'height': this.apt_height,
      'weight': this.apt_weight,
      'complaint': this.view_complaint,
      'select_day': selectedDate,
      'select_FrmTime': this.fixappointment.value.select_FrmTime,
      'select_toTime': this.fixappointment.value.select_toTime,
      'appt_DO_Id_FK': this.fixappointment.value.appt_DO_Id_FK,
      'appt_PatientId_FK': this._data.d.appt_PatientId_FK
    }
    console.log("Edit data: ", JSON.stringify(postData))

    //return;
    this.service.Put_phcappmt(postData)
      .subscribe((res) => {
        this.notif.successmsg("Appointment Updated Successfully")
        this.dialogRef.close();
        window.location.reload();
      })
  }

  Patient() {
    console.log("top data :" + JSON.stringify(this._data.d))
    this.patient_name = this._data.d.appt_P_Name;
    this.patient_id = this._data.d.appt_P_Code;
    this.patient_dob = this._data.d.appt_P_DOB;
    this.patient_age = this._data.d.appt_P_Age;
    this.patient_gender = this._data.d.appt_P_Gender;
  }

  disable() {
    this.fixappointment.controls['height'].disable();
    this.fixappointment.controls['weight'].disable();
    this.fixappointment.controls['complaint'].disable();
  }

  public objectComparisonFunctioncomplaint = function (option, value): boolean {
    return option.cmst_Id === value.cmst_Id;
  }

  resetSearchInput(inputElement: ElementRef<HTMLInputElement>) {
    inputElement.nativeElement.value = '';
  }

  resetComplaintSearchInput() {
    this.resetSearchInput(this.multiUserSearchInput);
    this.complaint = this.complaint1; // Reset the filtered complaint list to the original list
  }

  onToppingRemovedcomplaint(topping: string) {
    const toppings = this.fixappointment.value.complaint;
    this.removeFirst(toppings, topping);
    this.fixappointment.controls['complaint'].setValue(toppings);
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  onInputChange() {
    console.log(this.multiUserSearchInput.nativeElement.value);
    const searchInput = this.multiUserSearchInput.nativeElement.value ?
      this.multiUserSearchInput.nativeElement.value.toLowerCase() : '';
    this.complaint = this.complaint1.filter(c => {
      const name: string = c.cmst_Name.toLowerCase();
      return name.indexOf(searchInput) > -1;

    });
  }

  Get_complaint() {
    this.service.Get_Compliant()
      .subscribe((data) => {
        this.complaint = data
        this.complaint1 = data
      })
  }
}
