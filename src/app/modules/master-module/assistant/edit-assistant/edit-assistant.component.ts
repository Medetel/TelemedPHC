import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { environment } from 'src/environments/environment';
import { AssistantService } from '../assistant.service';

@Component({
  selector: 'app-edit-assistant',
  templateUrl: './edit-assistant.component.html',
  styleUrls: ['./edit-assistant.component.scss']
})
export class EditAssistantComponent implements OnInit {
  hospitaldd: any;
  qualificationdd: any;
  designationdd: any;
  specilizationdd: any;
  statedd: any;
  districtdd: any;
  selectedFiles: any;
  Image_Url;
  pincode: any;
  country: any;
  state: any;
  district: any;
  taluk: any;
  gram: any;
  gender = [
    { text: 'Male' },
    { text: 'Female' },
    { text: 'Others' },
  ]
  skill: any;
  maxDate: any = new Date();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private dialogRef: MatDialogRef<EditAssistantComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private service: AssistantService, private notif: Notification) { }
  assistant = new FormGroup({
    Assi_Id: new FormControl(''),
    Assi_Photo: new FormControl(''),
    Assi_FirstName: new FormControl('', [Validators.required, this.alphaValidator, this.spaceValidator]),
    Assi_LastName: new FormControl('', [Validators.required, this.alphaValidator, this.spaceValidator]),
    Assi_DOB: new FormControl(''),
    Assi_code: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.maxLength(10), Validators.required, this.nameValidators]),
    Assi_Gender: new FormControl(''),
    Assi_MobileNumber: new FormControl('', [Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    Assi_AlternativeNumber: new FormControl('', [Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    Assi_LandLineNumber: new FormControl('', [Validators.pattern("[0-9]{5,11}$"), this.nameValidator, Validators.maxLength(11)]),
    Assi_Email: new FormControl('', [Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    Assi_Address: new FormControl(''),
    Assi_Hos_Id_FK: new FormControl(''),
    Assi_Qua_Id_FK: new FormControl(''),
    Assi_Des_Id_FK: new FormControl(''),
    // Assi_skill_id: new FormControl('', Validators.required),
    Assi_Country_Id_FK: new FormControl(''),
    Assi_ST_Id_FK: new FormControl(''),
    Assi_DI_Id_FK: new FormControl(''),
    taluk_Id_Fk: new FormControl(''),
    gram_Id_Fk: new FormControl(''),
    Assi_Village: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
    Assi_PostalCode: new FormControl('', [Validators.pattern("[0-9]{6}$"), this.nameValidator, Validators.minLength(6), Validators.maxLength(6)]),
    Assi_Skill_Desc: new FormControl('', [Validators.required, this.alphaValidator, this.spaceValidator]),
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
    // this.qualificationchange(this._data.d.assi_Qua_Id_FK);
    this.countrychange(this._data.d.assi_Country_Id_FK);
    this.statechange(this._data.d.assi_ST_Id_FK);
    this.distritchange(this._data.d.assi_DI_Id_FK);
    //this.talukchange(this._data.d.taluk_Id_Fk);  
    // this.assistant.controls['Assi_skill_id'].setValue(this._data.d.assi_skill_id);
    this.Image_Url = this._data.d.assi_Image;
  }
  updateform() {
    // if (this.assistant.value.Assi_skill_id == "" || this.assistant.value.Assi_skill_id == null) {
    //   return;
    // }
    const formdata = new FormData();
    const ass_DOB = new DatePipe('en-US').transform(this.assistant.value.Assi_DOB, 'dd/MM/yyyy')
    formdata.append('Assi_Photo', this.selectedFiles);
    formdata.append('Assi_Id', this.assistant.value.Assi_Id);
    formdata.append('Assi_FirstName', this.assistant.value.Assi_FirstName);
    formdata.append('Assi_LastName', this.assistant.value.Assi_LastName);
    formdata.append('Assi_DOB', ass_DOB);
    formdata.append('Assi_code', this.assistant.value.Assi_code);
    formdata.append('Assi_Gender', this.assistant.value.Assi_Gender);
    formdata.append('Assi_MobileNumber', this.assistant.value.Assi_MobileNumber);
    formdata.append('Assi_AlternativeNumber', this.assistant.value.Assi_AlternativeNumber);
    formdata.append('Assi_LandLineNumber', this.assistant.value.Assi_LandLineNumber);
    formdata.append('Assi_Email', this.assistant.value.Assi_Email);
    formdata.append('Assi_Address', this.assistant.value.Assi_Address);
    formdata.append('Assi_Hos_Id_FK', this.assistant.value.Assi_Hos_Id_FK);
    formdata.append('Assi_Qua_Id_FK', this.assistant.value.Assi_Qua_Id_FK);
    formdata.append('Assi_Des_Id_FK', this.assistant.value.Assi_Des_Id_FK);
    // formdata.append('Assi_skill_id', this.assistant.value.Assi_skill_id);
    formdata.append('Assi_Country_Id_FK', this.assistant.value.Assi_Country_Id_FK);
    formdata.append('Assi_ST_Id_FK', this.assistant.value.Assi_ST_Id_FK);
    formdata.append('Assi_DI_Id_FK', this.assistant.value.Assi_DI_Id_FK);
    formdata.append('taluk_Id_Fk', this.assistant.value.taluk_Id_Fk);
    // formdata.append('gram_Id_Fk', this.assistant.value.gram_Id_Fk);
    formdata.append('Assi_Village', this.assistant.value.Assi_Village);
    formdata.append('Assi_PostalCode', this.assistant.value.Assi_PostalCode); 
    formdata.append('Assi_Skill_Desc', this.assistant.value.Assi_Skill_Desc);
    this.service.Put_Assistant(formdata)
      .subscribe((res) => {
        this.notif.successmsg("Assistant Updated Successfully")
        this.dialogRef.close();
        window.location.reload();
      })
  }
  bind() {
    console.log("Assistant Details:", JSON.stringify(this._data.d))

    this.assistant.controls['Assi_Id'].setValue(this._data.d.assi_Id);
    this.assistant.controls['Assi_FirstName'].setValue(this._data.d.assi_FirstName);
    this.assistant.controls['Assi_LastName'].setValue(this._data.d.assi_LastName);
    this.assistant.controls['Assi_DOB'].setValue(this._data.d.assi_DOB);
    this.assistant.controls['Assi_code'].setValue(this._data.d.assi_code);
    this.assistant.controls['Assi_Gender'].setValue(this._data.d.assi_Gender);
    this.assistant.controls['Assi_MobileNumber'].setValue(this._data.d.assi_MobileNumber);
    this.assistant.controls['Assi_AlternativeNumber'].setValue(this._data.d.assi_AlternativeNumber == 'null' ? '' : this._data.d.assi_AlternativeNumber);
    this.assistant.controls['Assi_LandLineNumber'].setValue(this._data.d.assi_LandLineNumber == 'null' ? '' : this._data.d.assi_LandLineNumber);
    this.assistant.controls['Assi_Email'].setValue(this._data.d.assi_Email);
    this.assistant.controls['Assi_Address'].setValue(this._data.d.assi_Address);
    this.assistant.controls['Assi_Hos_Id_FK'].setValue(this._data.d.assi_Hos_Id_FK);
    this.assistant.controls['Assi_Qua_Id_FK'].setValue(this._data.d.assi_Qua_Id_FK);
    // this.assistant.controls['Assi_skill_id'].setValue(this._data.d.assi_skill_id);
    this.assistant.controls['Assi_Des_Id_FK'].setValue(this._data.d.assi_Des_Id_FK);
    this.assistant.controls['Assi_Country_Id_FK'].setValue(this._data.d.assi_Country_Id_FK);
    this.assistant.controls['Assi_ST_Id_FK'].setValue(this._data.d.assi_ST_Id_FK);
    this.assistant.controls['Assi_DI_Id_FK'].setValue(this._data.d.assi_DI_Id_FK);
    this.assistant.controls['taluk_Id_Fk'].setValue(this._data.d.taluk_Id_Fk);
    this.assistant.controls['gram_Id_Fk'].setValue(this._data.d.gram_Id_Fk == null ? 0 : this._data.d.gram_Id_Fk);
    this.assistant.controls['Assi_Village'].setValue(this._data.d.assi_Village);
    this.assistant.controls['Assi_PostalCode'].setValue(this._data.d.assi_PostalCode); 
    this.assistant.controls['Assi_Skill_Desc'].setValue(this._data.d.assi_Skill_Desc);
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

  get_country() {
    this.service.Get_country()
      .subscribe((data) => {
        this.country = data
      })
  }
  get_state() {
    this.service.Get_state_f()
      .subscribe((data) => {
        this.state = data
      })
  }

  get_district() {
    this.service.Get_alldistrict()
      .subscribe((data) => {
        this.district = data
      })
  }

  get_taluk() {
    this.service.Get_allTaluk()
      .subscribe((data) => {
        this.taluk = data
      })
  }

  get_gram() {
    this.service.Get_allgram()
      .subscribe((data) => {
        this.gram = data
      })
  }

  // countrychange(event){
  //   //this.assistant.value.Assi_DI_Id_FK=undefined
  //   this.gram = undefined
  //   this.taluk=undefined
  //   this.district = undefined
  //   this.state=undefined
  //     this.service.Get_State(event)
  //     .subscribe((data)=>{
  //       this.state=data


  //       if(this.state==''){
  //         this.assistant.controls['Assi_ST_Id_FK'].setValue('');
  //         this.assistant.controls['Assi_DI_Id_FK'].setValue('');
  //         this.assistant.controls['taluk_Id_Fk'].setValue('');
  //         this.assistant.controls['gram_Id_Fk'].setValue('');
  //         this.assistant.controls['Assi_PostalCode'].setValue('');

  //       }
  //     })
  // }
  countrychange(event) {
    if (this.assistant.value.Assi_Country_Id_FK !== event) {
      this.assistant.controls['Assi_ST_Id_FK'].setValue('');
      this.assistant.controls['Assi_DI_Id_FK'].setValue('');
      this.assistant.controls['taluk_Id_Fk'].setValue('');
    }
    this.state = undefined;
    this.district = undefined;
    this.taluk = undefined;
    this.gram = undefined;

    this.service.Get_State(event)
      .subscribe((data) => {
        this.state = data;
        // if (this.state == '') {
        //   this.assistant.controls['Assi_ST_Id_FK'].setValue('');
        //   this.assistant.controls['Assi_DI_Id_FK'].setValue('');
        //   this.assistant.controls['taluk_Id_Fk'].setValue('');
        //   this.assistant.controls['gram_Id_Fk'].setValue('');

        // }
        if (this.state.length == 0) {
          this.notif.errorsmsg("Data not found!");
        }
      });
  }


  statechange(event) {
    if (this.assistant.value.Assi_ST_Id_FK !== event) {
      this.assistant.controls['Assi_DI_Id_FK'].setValue('');
      this.assistant.controls['taluk_Id_Fk'].setValue('');
    }
    this.gram = undefined
    this.taluk = undefined
    this.district = undefined
    this.service.Get_District(event)
      .subscribe((data) => {
        this.district = data
      // }, (error: any) => {

      //   this.assistant.controls['Assi_DI_Id_FK'].setValue('');
      //   this.assistant.controls['taluk_Id_Fk'].setValue('');
      //   this.assistant.controls['gram_Id_Fk'].setValue('');
        //  this.assistant.controls['Assi_PostalCode'].setValue('');
      });
  }

  distritchange(event) {
    if (this.assistant.value.Assi_DI_Id_FK !== event) {
      this.assistant.controls['taluk_Id_Fk'].setValue(''); // Reset postal code
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

  // talukchange(event){
  //   if (this.assistant.value.taluk_Id_Fk!== event) {
  //     this.assistant.controls['gram_Id_Fk'].setValue(''); // Reset village selection
  //     this.assistant.controls['Assi_PostalCode'].setValue(''); // Reset postal code
  //     }

  //     this.gram = undefined;
  //     this.service.Get_Gram_id(event)
  //     .subscribe(
  //     (data) => {
  //     this.gram = data;
  //     },
  //     (error) => {
  //     this.gram = this.testempty;
  //     }
  //     );
  // }

  talukchange(event) {
    // Clear the village and pincode records
    if (this.assistant.value.taluk_Id_Fk !== event) {
      this.assistant.controls['gram_Id_Fk'].setValue('');
      this.assistant.controls['Assi_PostalCode'].setValue('');
    }
    this.gram = undefined;
    this.service.Get_Gram_id(event)
      .subscribe((data) => {
        this.gram = data;
      },
        (error: any) => {
          // Handle error if needed
          this.gram = [];
        });
  }

  selectpincode(gram_id) {
    this.pincode = this.gram.filter(x => x.gram_id == gram_id)
    this.assistant.controls['Assi_PostalCode'].setValue(this.pincode[0].postal_Code)
  }

  qualificationchange(event) {
    //sindhura
    this.assistant.controls['Assi_skill_id'].reset();
    this.assistant.controls['Assi_skill_id'].setValidators(Validators.required);
    this.assistant.controls['Assi_skill_id'].updateValueAndValidity();
    this.service.Get_skillsetddbyId(event)
      .subscribe((data) => {
        this.skill = data
        if (this.skill.length == 0) {
          this.assistant.controls['Assi_skill_id'].reset();
          this.notif.errorsmsg("Data not found!");
        }

      })

  }

}
