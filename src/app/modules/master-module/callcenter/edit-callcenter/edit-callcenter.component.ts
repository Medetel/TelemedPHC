import { CallcenterService } from '../callcenter.service';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-callcenter',
  templateUrl: './edit-callcenter.component.html',
  styleUrls: ['./edit-callcenter.component.scss']
})
export class EditCallcenterComponent implements OnInit {
  hospitaldd: any;
  qualificationdd: any;
  designationdd: any;
  specilizationdd: any;
  statedd: any;
  districtdd: any;
  selectedFiles: any;
  Image_Url;
  gender = [
    { text: 'Male' },
    { text: 'Female' },
    { text: 'Others' },
  ]
  pincode: any;
  country: any;
  state: any;
  district: any;
  taluk: any;
  gram: any;
  skill: any;
  maxDate: any = new Date();

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private dialogRef: MatDialogRef<EditCallcenterComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private service: CallcenterService, private router: Router, private notif: Notification, public dialog: MatDialog) { }
  callcenter = new FormGroup({
    Call_Ag_Id: new FormControl(''),
    Call_Ag_Photo: new FormControl(''),
    Call_Ag_FirstName: new FormControl('', [Validators.required, this.alphaValidator, this.spaceValidator]),
    Call_Ag_LastName: new FormControl('', [Validators.required, this.alphaValidator, this.spaceValidator]),
    Call_Ag_DOB: new FormControl(''),
    Call_Ag_code: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.maxLength(10), Validators.required, this.nameValidators]),
    Call_Ag_Gender: new FormControl(''),
    Call_Ag_MobileNumber: new FormControl('', [Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    Call_Ag_AlternativeNumber: new FormControl('', [Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    Call_Ag_LandLineNumber: new FormControl('', [Validators.pattern("[0-9]{5,11}$"), this.nameValidator, Validators.maxLength(11)]),
    Call_Ag_Email: new FormControl('', [Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    Call_Ag_Address: new FormControl(''),
    Call_Ag_Hos_Id: new FormControl(''),
    Call_Ag_Qua_Id: new FormControl(''),
    Call_Ag_Des_Id: new FormControl(''),
    Call_Ag_Country_Id: new FormControl(''),
    Call_Ag_ST_Id: new FormControl(''),
    Call_Ag_DI_Id: new FormControl(''),
    taluk_Id_Fk: new FormControl(''),
    gram_Id_Fk: new FormControl(''),
    Call_Ag_Village: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
    Call_Ag_PostalCode: new FormControl('', [Validators.pattern("[0-9]{6}$"), this.nameValidator, Validators.minLength(6), Validators.maxLength(6)]),
    Call_Ag_Skill_Desc: new FormControl('', [Validators.required, this.alphaValidator, this.spaceValidator]),

  })
  nameValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\s/g,''/a-zA-Z]/;

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }
  nameValidators(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/, ''/]/;

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }
  nameValidatorss(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/,/0-9]/;

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }

  alphaValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/,/0-9]/;
    if (control.value && nameRegexp.test(control.value)) {
      return { alphaCheck: true };
    }
  }
  spaceValidator(control: any): { [key: string]: boolean } {
    if ((control.value as string).indexOf('  ') >= 0 || control.value.startsWith(' ') || control.value.endsWith(' ')) {
      return { spaceCheck: true };
    }
  }

  onSelectFile(fileInput: any) {
    this.selectedFiles = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.Image_Url = { url: event.target.result }
    };
  }
  ngOnInit(): void {
    this.bind();
    this.get_hospitaldd();
    this.get_qualificationdd();
    this.get_designationdd();
    this.get_country();
    this.countrychange(this._data.d.call_Ag_Country_Id);
    this.statechange(this._data.d.call_Ag_ST_Id);
    this.distritchange(this._data.d.call_Ag_DI_Id);
    // this.Image_Url = { url: '/asstes/images/profile.png' }
    this.Image_Url = this._data.d.call_Ag_Image;
  }

  updateform() {
    const formdata = new FormData();
    const ass_DOB = new DatePipe('en-US').transform(this.callcenter.value.Call_Ag_DOB, 'dd/MM/yyyy')
    formdata.append('Call_Ag_Photo', this.selectedFiles);
    formdata.append('Call_Ag_Id', this.callcenter.value.Call_Ag_Id);
    formdata.append('Call_Ag_FirstName', this.callcenter.value.Call_Ag_FirstName);
    formdata.append('Call_Ag_LastName', this.callcenter.value.Call_Ag_LastName);
    formdata.append('Call_Ag_DOB', ass_DOB);
    formdata.append('Call_Ag_code', this.callcenter.value.Call_Ag_code);
    formdata.append('Call_Ag_Gender', this.callcenter.value.Call_Ag_Gender);
    formdata.append('Call_Ag_MobileNumber', this.callcenter.value.Call_Ag_MobileNumber);
    formdata.append('Call_Ag_AlternativeNumber', this.callcenter.value.Call_Ag_AlternativeNumber);
    formdata.append('Call_Ag_LandLineNumber', this.callcenter.value.Call_Ag_LandLineNumber);
    formdata.append('Call_Ag_Email', this.callcenter.value.Call_Ag_Email);
    formdata.append('Call_Ag_Address', this.callcenter.value.Call_Ag_Address);
    formdata.append('Call_Ag_Hos_Id', this.callcenter.value.Call_Ag_Hos_Id);
    formdata.append('Call_Ag_Qua_Id', this.callcenter.value.Call_Ag_Qua_Id);
    formdata.append('Call_Ag_Des_Id', this.callcenter.value.Call_Ag_Des_Id);
    formdata.append('Call_Ag_Country_Id', this.callcenter.value.Call_Ag_Country_Id);
    formdata.append('Call_Ag_ST_Id', this.callcenter.value.Call_Ag_ST_Id);
    formdata.append('Call_Ag_DI_Id', this.callcenter.value.Call_Ag_DI_Id);
    formdata.append('taluk_Id_Fk', this.callcenter.value.taluk_Id_Fk);
    formdata.append('gram_Id_Fk', this.callcenter.value.gram_Id_Fk == null ? 0 : this.callcenter.value.gram_Id_Fk);
    formdata.append('Call_Ag_Village', this.callcenter.value.Call_Ag_Village);
    formdata.append('Call_Ag_PostalCode', this.callcenter.value.Call_Ag_PostalCode);
    formdata.append('Call_Ag_Skill_Desc', this.callcenter.value.Call_Ag_Skill_Desc);
    this.service.Put_Callcenter(formdata)
      .subscribe((res) => {
        this.notif.successmsg("Callcenter Agent Updated Successfully")
        this.dialogRef.close();
        window.location.reload();
      })
  }

  bind() {
    // console.log("Assistant Details:", JSON.stringify(this._data.d))

    this.callcenter.controls['Call_Ag_Id'].setValue(this._data.d.call_Ag_Id);
    this.callcenter.controls['Call_Ag_FirstName'].setValue(this._data.d.call_Ag_FirstName);
    this.callcenter.controls['Call_Ag_LastName'].setValue(this._data.d.call_Ag_LastName);
    this.callcenter.controls['Call_Ag_DOB'].setValue(this._data.d.call_Ag_DOB);
    this.callcenter.controls['Call_Ag_code'].setValue(this._data.d.call_Ag_code);
    this.callcenter.controls['Call_Ag_Gender'].setValue(this._data.d.call_Ag_Gender);
    this.callcenter.controls['Call_Ag_MobileNumber'].setValue(this._data.d.call_Ag_MobileNumber);
    this.callcenter.controls['Call_Ag_AlternativeNumber'].setValue(this._data.d.call_Ag_AlternativeNumber == 'null' ? '' : this._data.d.call_Ag_AlternativeNumber);
    this.callcenter.controls['Call_Ag_LandLineNumber'].setValue(this._data.d.call_Ag_LandLineNumber == 'null' ? '' : this._data.d.call_Ag_LandLineNumber);
    this.callcenter.controls['Call_Ag_Email'].setValue(this._data.d.call_Ag_Email);
    this.callcenter.controls['Call_Ag_Address'].setValue(this._data.d.call_Ag_Address);
    this.callcenter.controls['Call_Ag_Hos_Id'].setValue(this._data.d.call_Ag_Hos_Id);
    this.callcenter.controls['Call_Ag_Qua_Id'].setValue(this._data.d.call_Ag_Qua_Id);
    // this.assistant.controls['Assi_skill_id'].setValue(this._data.d.assi_skill_id);
    this.callcenter.controls['Call_Ag_Des_Id'].setValue(this._data.d.call_Ag_Des_Id);
    this.callcenter.controls['Call_Ag_Country_Id'].setValue(this._data.d.call_Ag_Country_Id);
    this.callcenter.controls['Call_Ag_ST_Id'].setValue(this._data.d.call_Ag_ST_Id);
    this.callcenter.controls['Call_Ag_DI_Id'].setValue(this._data.d.call_Ag_DI_Id);
    this.callcenter.controls['taluk_Id_Fk'].setValue(this._data.d.taluk_Id_Fk);
    this.callcenter.controls['gram_Id_Fk'].setValue(this._data.d.gram_Id_Fk == null ? 0 : this._data.d.gram_Id_Fk);
    this.callcenter.controls['Call_Ag_Village'].setValue(this._data.d.call_Ag_Village);
    this.callcenter.controls['Call_Ag_PostalCode'].setValue(this._data.d.call_Ag_PostalCode);
    this.callcenter.controls['Call_Ag_Skill_Desc'].setValue(this._data.d.call_Ag_Skill_Desc);
  }

  get_hospitaldd() {
    this.service.Get_HospitalDD()
      .subscribe((data) => {
        this.hospitaldd = data
      })
  }
  get_qualificationdd() {
    this.service.Get_QualificationDD()
      .subscribe((data) => {
        this.qualificationdd = data
      })
  }

  get_designationdd() {
    this.service.Get_DesignationDD()
      .subscribe((data) => {
        this.designationdd = data
      })
  }

  get_statedd() {
    this.service.Get_StateDD()
      .subscribe((data) => {
        this.statedd = data
      })
  }
  get_districtdd() {
    this.service.Get_DistrictDD()
      .subscribe((data) => {
        this.districtdd = data
      })
  }

  get_country() {
    this.service.Get_country()
      .subscribe((data) => {
        this.country = data
      })
  }

  countrychange(event) {
    if (this.callcenter.value.Call_Ag_Country_Id !== event) {
      this.callcenter.controls['Call_Ag_ST_Id'].setValue('');
      this.callcenter.controls['Call_Ag_DI_Id'].setValue('');
      this.callcenter.controls['taluk_Id_Fk'].setValue('');
    }


    this.state = undefined;
    this.district = undefined;
    this.taluk = undefined;
    this.gram = undefined;

    this.service.Get_State(event)
      .subscribe((data) => {
        this.state = data;
        if (this.state.length == 0) {
          this.notif.errorsmsg("Data not found!");
        }
      },
        (error: any) => {
        });
  }
  statechange(event) {
    if (this.callcenter.value.Call_Ag_ST_Id !== event) {
      this.callcenter.controls['Call_Ag_DI_Id'].setValue('');
      this.callcenter.controls['taluk_Id_Fk'].setValue('');
    }
    this.gram = undefined
    this.taluk = undefined
    this.district = undefined
    this.service.Get_District(event)
      .subscribe((data) => {
        this.district = data
      });
  }
  distritchange(event) {
    if (this.callcenter.value.Call_Ag_DI_Id !== event) {
      this.callcenter.controls['taluk_Id_Fk'].setValue('');
    }
    this.gram = undefined
    this.taluk = undefined
    this.service.Get_Taluk(event)
      .subscribe((data) => {
        this.taluk = data
      })
  }


  testempty: any = [];
  gramData: any = [];
  talukchange(event) {
    this.callcenter.controls['gram_Id_Fk'].reset();
    this.callcenter.controls['Call_Ag_PostalCode'].reset();

    this.gram = undefined;
    this.service.Get_Gram_id(event)
      .subscribe((data) => {
        this.gram = data;
      },
        (error: any) => {
          this.gram = [];
        });
  }


  selectpincode(gram_id) {
    this.pincode = this.gram.filter(x => x.gram_id == gram_id)
    this.callcenter.controls['Call_Ag_PostalCode'].setValue(this.pincode[0].postal_Code)
  }

  qualificationchange(event) {
    this.service.Get_skillsetddbyId(event)
      .subscribe((data) => {
        this.skill = data
        if (this.skill.length == 0) {
          this.notif.errorsmsg("Data not found!");
        }

      })
    this.callcenter.controls['Assi_skill_id'].reset();
  }

}
