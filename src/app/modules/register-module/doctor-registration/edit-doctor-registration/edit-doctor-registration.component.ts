import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { event } from 'jquery';
import { Notification } from 'src/app/core/Notifications/Notification';
import { environment } from 'src/environments/environment';
import { DoctorRegistrationService } from '../doctor-registration.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-doctor-registration',
  templateUrl: './edit-doctor-registration.component.html',
  styleUrls: ['./edit-doctor-registration.component.scss']
})
export class EditDoctorRegistrationComponent implements OnInit {
  [x: string]: any;
  country: any;
  state: any;
  district: any;
  taluk: any;
  gram: any;
  pincode: any;
  hospitaldd: any;
  languagedd: any;
  qualificationdd: any;
  designationdd: any;
  disciplinedd: any;
  specilizationdd: any;
  statedd: any;
  districtdd: any;
  selectedFiles: any;
  selectedPhotos: any;
  selectFiles: any;
  Image_Url;
  Sign_Url;
  Doc_Url: any;
  MOU_Url: any;
  gender = [
    { text: 'Male' },
    { text: 'Female' },
    { text: 'Others' },
  ]
  specs: any;
  base64Image: any;
  servcharge: any;
  servicedata_dd: any;
  chargedetail: any;
  pricedata: any;
  servcode: any;
  maxDate: any = new Date();
  selectedSigns: any;


  constructor(private dialogRef: MatDialogRef<EditDoctorRegistrationComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private service: DoctorRegistrationService, private notif: Notification, private sanitizer: DomSanitizer) { }
  doctor = new FormGroup({
    DO_Id: new FormControl(''),
    Doc_Signature_Doc: new FormControl(''),
    DO_Photo: new FormControl(''),
    Regno: new FormControl('', [Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"), Validators.maxLength(20)]),
    DO_FirstName: new FormControl('', [Validators.required, this.alphaValidator, this.spaceValidator]),
    DO_LastName: new FormControl('', [Validators.required, this.alphaValidator, this.spaceValidator]),
    DO_MotherTongue: new FormControl(''),
    DO_DOB: new FormControl(''),
    DO_Gender: new FormControl(''),
    DO_MobileNumber: new FormControl('', [Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    DO_Alernative_Numb: new FormControl('', [Validators.pattern("[0-9]{10}$"), this.nameValidator, Validators.minLength(10), Validators.maxLength(10)]),
    DO_OfficialNumber: new FormControl('', [Validators.pattern("[0-9]{5,11}$"), this.nameValidator, Validators.maxLength(11)]),
    DO_Email: new FormControl('', [Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    PaNno: new FormControl('', [Validators.pattern("^[a-zA-Z0-9 ]{10}$"), Validators.minLength(10), Validators.maxLength(10), this.nameValidators]),
    DO_Address: new FormControl(''),
    DO_HO_Id_FK: new FormControl(''),
    DO_QU_Id_FK: new FormControl(''),
    DO_DE_Id_FK: new FormControl(''),
    DO_CD_Id_FK: new FormControl(''),
    DO_SC_Id_FK: new FormControl(''),
    DO_Choose_Document: new FormControl(''),
    MOUDocument: new FormControl(''),
    DO_Country_Id_FK: new FormControl(''),
    DO_ST_Id_FK: new FormControl(''),
    DO_DI_Id_FK: new FormControl(''),
    DO_Taluk_Id: new FormControl(''),
    DO_Gram_Id: new FormControl(''),
    DO_Village: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.required, this.nameValidatorss]),
    DO_PostalCode: new FormControl('', [Validators.pattern("[0-9]{6}$"), this.nameValidator, Validators.minLength(6), Validators.maxLength(6)]),
    DoctorLanguage: new FormControl(''),
    ClinicName: new FormControl('', [Validators.pattern("^\\S{0}.{0,24}\\S{1}$"), Validators.minLength(1), Validators.required, this.nameValidatorss, Validators.maxLength(35)]),
    services_FK: new FormControl('', Validators.required),
    price_Id_FK: new FormControl('', Validators.required),
    service_charge: new FormControl(''),
    DO_Type: new FormControl(''),
    DO_Spc_Id_FK: new FormControl(''),
    DO_SP_Id_FK: new FormControl(''),
    DO_NE_Id_FK: new FormControl('', [Validators.required]),
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
  servicecodeValidators(control: any): { [key: string]: boolean } {
    const scodeRegexp: RegExp = /[]/;

    if (control.value && scodeRegexp.test(control.value)) {
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
      this.base64Image = this.sanitizer.bypassSecurityTrustUrl(event.target.result);
      //this.Image_Url = this.base64Image

    };
  }
  onselectfiles(fileInput: any) {
    this.selectFiles = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.base64Image = this.sanitizer.bypassSecurityTrustUrl(event.target.result);
      //this.Image_Url = this.base64Image

    };
  }

  onSelectPhoto(fileInput: any) {
    this.selectedPhotos = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.base64Image = this.sanitizer.bypassSecurityTrustUrl(event.target.result);
      this.Image_Url = this.base64Image
    };
  }

  onSelectSig(fileInput: any) {
    this.selectedSigns = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(event.target.result);
      this.Sign_Url = this.base64Image
      // this.signs = false;
    };
  }

  ngOnInit(): void {
    this.bind();
    this.get_specialistdoctordd();
    this.get_hospitaldd();
    this.get_qualificationdd();
    this.get_designationdd();
    this.get_specilizationdd()
    // this.Get_specilizationdd(this._data.d.dO_CD_Id_FK);
    this.get_discipline();
    this.get_country();
    this.Get_language();
    this.getservicedd();
    this.get_network();
    this.countrychange(this._data.d.dO_Country_Id_FK);
    this.statechange(this._data.d.dO_ST_Id_FK);
    this.distritchange(this._data.d.dO_DI_Id_FK);
    //this.talukchange(this._data.d.dO_Taluk_Id);
    this.servicechange(this._data.d.services_FK);
    this.codechange(this._data.d.price_Id_FK);
    this.doctor.controls['service_charge'].disable();

    //this.Image_Url = 'data:image/jpeg;base64,' + this._data.d.imagebyte;
    //this.Image_Url = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ${this._data.d.imagebyte}`);
    // this.Image_Url= { url: `${environment.API_Base_URL}` +`Doctor/GetDoctor_Images?filename=${this._data.d.dO_Photo}`}
  }

  viewDocument(): void {
    if (this._data.d.mouDocument === 'https://telemedicinepvtapi.esdinfra.com/DoctorDocuments/') {
      this.notif.errorsmsg("No document uploaded")
    } else {
      window.open(this._data.d.mouDocument, '_blank');
    }
  }

  viewdocument(): void {
    if (this._data.d.dO_Choose_Document === 'https://telemedicinepvtapi.esdinfra.com/DoctorDocuments/') {
      this.notif.errorsmsg("No document uploaded")
    } else {
      window.open(this._data.d.dO_Choose_Document, '_blank');
    }
  }

  bind() {

    this.service.Get_Specialization_Desdd(this._data.d.dO_SC_Id_FK)
      .subscribe((data) => {
        this.discriptiondd = data
      })

    console.log('edit view data :' + JSON.stringify(this._data.d));
    //console.log('edit views data :' +JSON.stringify(this._data.t));

    this.Image_Url = this._data.d.dO_Image; //photo   
    // this.Doc_Url=this._data.d.dO_Choose_Document; //experince
    // this.MOU_Url=this._data.d.mouDocument; //MOU
    //this.Do_Type=this._data.d.data.dO_Type
    this.Sign_Url = this._data.d.doc_Signature_Doc;



    this.doctor.controls['DO_Id'].setValue(this._data.d.dO_Id);
    //this.doctor.controls['DO_Photo'].setValue(this._data.d.dO_Photo);
    this.doctor.controls['DO_FirstName'].setValue(this._data.d.dO_FirstName);
    this.doctor.controls['DO_LastName'].setValue(this._data.d.dO_LastName);
    this.doctor.controls['Regno'].setValue(this._data.d.regno == null ? '' : this._data.d.regno);
    this.doctor.controls['PaNno'].setValue(this._data.d.paNno == null ? '' : this._data.d.paNno);
    this.doctor.controls['DO_DOB'].setValue(this._data.d.dO_DOB);
    this.doctor.controls['DO_CD_Id_FK'].setValue(this._data.d.dO_CD_Id_FK);
    this.doctor.controls['DO_MotherTongue'].setValue(this._data.d.dO_MotherTongue);
    this.doctor.controls['DO_Gender'].setValue(this._data.d.dO_Gender);
    this.doctor.controls['DO_MobileNumber'].setValue(this._data.d.dO_MobileNumber);
    this.doctor.controls['DO_Alernative_Numb'].setValue(this._data.d.dO_Alernative_Numb == null ? '' : this._data.d.dO_Alernative_Numb);
    this.doctor.controls['DO_OfficialNumber'].setValue(this._data.d.dO_OfficialNumber == null ? '' : this._data.d.dO_OfficialNumber);
    this.doctor.controls['DO_Email'].setValue(this._data.d.dO_Email);
    this.doctor.controls['DO_Address'].setValue(this._data.d.dO_Address);
    //this.doctor.controls['DO_HO_Id_FK'].setValue(this._data.d.dO_HO_Id_FK);
    this.doctor.controls['DO_QU_Id_FK'].setValue(this._data.d.dO_QU_Id_FK);
    this.doctor.controls['DO_DE_Id_FK'].setValue(this._data.d.dO_DE_Id_FK);
    this.doctor.controls['DO_SC_Id_FK'].setValue(this._data.d.dO_SC_Id_FK);
    this.doctor.controls['DO_Country_Id_FK'].setValue(this._data.d.dO_Country_Id_FK);
    this.doctor.controls['DO_ST_Id_FK'].setValue(this._data.d.dO_ST_Id_FK);
    this.doctor.controls['DO_DI_Id_FK'].setValue(this._data.d.dO_DI_Id_FK);
    this.doctor.controls['DO_Taluk_Id'].setValue(this._data.d.dO_Taluk_Id);
    // this.doctor.controls['DO_Gram_Id'].setValue(this._data.d.dO_Gram_Id==null ? 0 : this._data.d.dO_Gram_Id);
    this.doctor.controls['DO_Village'].setValue(this._data.d.dO_Village);
    this.doctor.controls['DO_PostalCode'].setValue(this._data.d.dO_PostalCode);
    this.doctor.controls['DoctorLanguage'].setValue(this._data.d.dO_PostalCode);
    this.doctor.controls['DO_Type'].setValue(this._data.d.dO_Type);
    this.doctor.controls['services_FK'].setValue(this._data.d.services_FK);
    this.doctor.controls['price_Id_FK'].setValue(this._data.d.price_Id_FK);
    this.doctor.controls['service_charge'].setValue(this._data.d.charges);
    this.doctor.controls['DO_Spc_Id_FK'].setValue(this._data.d.dO_Spc_Id_FK);
    this.doctor.controls['DO_SP_Id_FK'].setValue(this._data.d.dO_SP_Id_FK);
    this.doctor.controls['DO_NE_Id_FK'].setValue(this._data.d.dO_NE_Id_FK);
    if (this._data.d.dO_Type == "Clinic") {
      this.doctor.controls['DO_HO_Id_FK'].disable();
      this.doctor.controls['ClinicName'].enable();
      this.doctor.controls['ClinicName'].setValue(this._data.d.clinicName);
      this.doctor.controls['DO_HO_Id_FK'].setValue("");
    }
    else {
      this.doctor.controls['DO_HO_Id_FK'].enable();
      this.doctor.controls['ClinicName'].disable();
      this.doctor.controls['DO_HO_Id_FK'].setValue(this._data.d.dO_HO_Id_FK);
      this.doctor.controls['ClinicName'].setValue("")

    }


  }
  photo_data: any;
  updateform() {
    //this.Image_Url
    if (this.selectedPhotos == "" || this.selectedPhotos == undefined) {
      //this.photo_data=this.Image_Url.split('Images','');
      //this.selectedPhotos=this.photo_data[1];
      this.selectedPhotos = null;
    }
    if (this.selectedSigns == "" || this.selectedSigns == undefined) {
      this.selectedSigns = null;
    }
    if (this.selectedFiles == "" || this.selectedFiles == undefined) {
      this.selectedFiles = null;
    }
    if (this.selectFiles == "" || this.selectFiles == undefined) {
      this.selectFiles = null;
    }
    const formdata = new FormData();
    const ass_DOB = new DatePipe('en-US').transform(this.doctor.value.DO_DOB, 'dd/MM/yyyy')
    formdata.append('DO_Photo', this.selectedPhotos);
    formdata.append('Doc_Signature_Doc', this.selectedSigns);
    formdata.append('DO_Id', this.doctor.value.DO_Id);
    formdata.append('DO_FirstName', this.doctor.value.DO_FirstName);
    formdata.append('DO_LastName', this.doctor.value.DO_LastName);
    formdata.append('Regno', this.doctor.value.Regno);
    formdata.append('PaNno', this.doctor.value.PaNno);
    formdata.append('DO_DOB', ass_DOB);
    formdata.append('DO_MotherTongue', this.doctor.value.DO_MotherTongue);
    formdata.append('DO_CD_Id_FK', this.doctor.value.DO_CD_Id_FK);
    formdata.append('DO_Gender', this.doctor.value.DO_Gender);
    formdata.append('DO_MobileNumber', this.doctor.value.DO_MobileNumber);
    formdata.append('DO_Alernative_Numb', this.doctor.value.DO_Alernative_Numb);
    formdata.append('DO_OfficialNumber', this.doctor.value.DO_OfficialNumber);
    formdata.append('DO_Email', this.doctor.value.DO_Email);
    formdata.append('DO_Address', this.doctor.value.DO_Address);
    //formdata.append('DO_HO_Id_FK', this.doctor.value.DO_HO_Id_FK==undefined ? null : this.doctor.value.DO_HO_Id_FK);

    formdata.append('DO_QU_Id_FK', this.doctor.value.DO_QU_Id_FK);
    formdata.append('DO_DE_Id_FK', this.doctor.value.DO_DE_Id_FK);
    formdata.append('DO_SC_Id_FK', this.doctor.value.DO_SC_Id_FK);
    formdata.append('DO_Country_Id_FK', this.doctor.value.DO_Country_Id_FK);
    formdata.append('DO_ST_Id_FK', this.doctor.value.DO_ST_Id_FK);
    formdata.append('DO_DI_Id_FK', this.doctor.value.DO_DI_Id_FK);
    formdata.append('DO_Taluk_Id', this.doctor.value.DO_Taluk_Id);
    formdata.append('DO_Village', this.doctor.value.DO_Village);
    formdata.append('DO_PostalCode', this.doctor.value.DO_PostalCode);
    formdata.append('DoctorLanguage', this.doctor.value.DoctorLanguage);
    formdata.append('DO_Choose_Document', this.selectedFiles);
    formdata.append('DO_Type', this.doctor.value.DO_Type);
    formdata.append('MOUDocument', this.selectFiles);
    formdata.append('Services_FK', this.doctor.value.services_FK);
    formdata.append('Price_Id_FK', this.doctor.value.price_Id_FK);
    formdata.append('Charges', this.pricedata);
    formdata.append('ClinicName', this.doctor.value.ClinicName == undefined ? "" : this.doctor.value.ClinicName);
    formdata.append('DO_HO_Id_FK', this.doctor.value.DO_HO_Id_FK == undefined ? "" : this.doctor.value.DO_HO_Id_FK);
    formdata.append('DO_Spc_Id_FK', this.doctor.value.DO_Spc_Id_FK);
    formdata.append('DO_SP_Id_FK', this.doctor.value.DO_SP_Id_FK);
    formdata.append('DO_NE_Id_FK', this.doctor.value.DO_NE_Id_FK);

    console.log("update form data :" + JSON.stringify(formdata));


    this.service.Put_Doctor(formdata)
      .subscribe((res) => {
        this.notif.successmsg("Doctor Updated Successfully")
        this.dialogRef.close();
        window.location.reload();
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
  networkdd : any;
  get_network() {
    this.service.Get_network()
      .subscribe((data) => {
        this.networkdd = data
      })
  }
  get_gram() {
    this.service.Get_allgram()
      .subscribe((data) => {
        this.gram = data
      })
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

  get_discipline() {
    this.service.Get_Discipline()
      .subscribe((data) => {
        this.disciplinedd = data
      })
  }
  get_country() {
    this.service.Get_country()
      .subscribe((data) => {
        this.country = data
      })
  }
  getservicedd() {
    this.service.Get_Servicecharge_DD()
      .subscribe((data) => {
        this.servcharge = data
        this.servcharge = this.servcharge.filter(x => x.service_Id != 7)
        console.log("Services", JSON.stringify(this.servcharge))
      })

  }

  get_specilizationdd() {
    this.service.Get_SpecializationDD()
      .subscribe((data) => {
        this.specs = data
      })
  }

  specialistdoctordd: any;
  get_specialistdoctordd() {
    this.service.Get_specialistdocDD()
      .subscribe((data) => {
        this.specialistdoctordd = data
      })
  }


  discriptiondd: any;
  typescategorys(event) {
    // this.Diagnosis.controls['DO_SD_Id_FK'].setValue(undefined);
    this.service.Get_Specialization_Desdd(event)
      .subscribe((data) => {
        this.discriptiondd = data
        this.Diagnosis.controls['DO_SP_Id_FK'].setValue(this.discriptiondd.sP_Id);
      })
  }

  // typescategorys(event) {
  //   this.Labedit.controls['description_Id'].setValue(undefined);
  //   this.service.Get_labdecrptndd(event)
  //     .subscribe((data) => {
  //       this.discriptions_edit = data
  //       this.Labedit.controls['description_Id'].setValue(this.discriptions_edit.dt_Id);
  //     })
  // }


  servicecodeValidator(control: any): { [key: string]: boolean } {
    const scodeRegexp: RegExp = /^\d+$/;
    if (control.value && scodeRegexp.test(control.value) == false) {
      return { codeCheck: true };
    }
  }

  servicechange($event) {
    this.servcode = null;
    this.chargedetail = null;
    this.doctor.controls['service_charge'].reset();
    this.service.Get_Servicecode_DD($event)

      .subscribe((data) => {
        this.servcode = data
      })

    this.doctor.controls['price_Id_FK'].setValue('');
    this.pricedata = '';
    if ($event == 7) {
      this.doctor.controls['price_Id_FK'].disable();
    }
    else {
      this.doctor.controls['price_Id_FK'].enable();
    }
  }

  codechange(event) {
    this.chargedetail = null;
    this.doctor.controls['service_charge'].reset();
    //here get serice code and passd and dget the service charge and display in charge text box
    this.service.Get_Servicecharge_Detail(event)
      .subscribe((data) => {
        console.log('service data ' + JSON.stringify(data))
        this.chargedetail = data
        this.pricedata = this.chargedetail.charges;
        this.doctor.controls['service_charge'].setValue(this.chargedetail.charges);
        this.doctor.controls['price_Id_FK'].setValue(this.chargedetail.price_Id);

      })

  }

  // countrychange(event) {
  //   //this.doctor.value.DO_DI_Id_FK=undefined
  //   this.gram = undefined
  //   this.taluk=undefined
  //   this.district = undefined
  //   this.state=undefined
  //   this.service.Get_State(event)
  //     .subscribe((data) => {
  //       this.state = data

  //       if(this.state==''){
  //         this.doctor.controls['DO_ST_Id_FK'].setValue('');
  //         this.doctor.controls['DO_DI_Id_FK'].setValue('');
  //         this.doctor.controls['DO_Taluk_Id'].setValue('');
  //         this.doctor.controls['DO_Gram_Id'].setValue('');
  //         this.doctor.controls['DO_PostalCode'].setValue('');

  //       }
  //     })
  // }
  countrychange(event) {
    if (this.doctor.value.DO_Country_Id_FK !== event) {
      this.doctor.controls['DO_ST_Id_FK'].setValue('');
      this.doctor.controls['DO_DI_Id_FK'].setValue('');
      this.doctor.controls['DO_Taluk_Id'].setValue('');
    }
    this.state = undefined;
    this.district = undefined;
    this.taluk = undefined;
    this.gram = undefined;

    this.service.Get_State(event)
      .subscribe((data) => {
        this.state = data;
        // if (this.state == '') {
        //   this.doctor.controls['DO_ST_Id_FK'].setValue('');
        //   this.doctor.controls['DO_DI_Id_FK'].setValue('');
        //   this.doctor.controls['DO_Taluk_Id'].setValue('');
        // }
        if (this.state.length == 0) {
          this.notif.errorsmsg("Data not found!");
        }
      });
  }
  statechange(event) {
    if (this.doctor.value.DO_ST_Id_FK !== event) {
      this.doctor.controls['DO_DI_Id_FK'].setValue('');
      this.doctor.controls['DO_Taluk_Id'].setValue('');
    }
    this.gram = undefined
    this.taluk = undefined
    this.district = undefined
    this.service.Get_District(event)
      .subscribe((data) => {
        this.district = data
        // }, (error: any) => {

        //   this.doctor.controls['DO_DI_Id_FK'].setValue('');
        //   this.doctor.controls['DO_Taluk_Id'].setValue('');
        // this.doctor.controls['DO_Gram_Id'].setValue('');
        // this.doctor.controls['DO_PostalCode'].setValue('');
      });
  }
  distritchange(event) {
    if (this.doctor.value.DO_DI_Id_FK !== event) {
      this.doctor.controls['DO_Taluk_Id'].setValue(''); // Reset village selection
      // this.doctor.controls['DO_PostalCode'].setValue(''); // Reset postal code
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
    if (this.doctor.value.DO_Taluk_Id !== event) {
      // this.doctor.controls['DO_Gram_Id'].setValue(''); // Reset village selection
      // this.doctor.controls['DO_PostalCode'].setValue(''); // Reset postal code
    }

    this.gram = undefined;
    this.service.Get_Gram_id(event)
      .subscribe(
        (data) => {
          this.gram = data;
        },
        (error) => {
          this.gram = this.testempty;
        }
      );
  }

  selectpincode(gram_id) {

    this.pincode = this.gram.filter(x => x.gram_id == gram_id)
    this.doctor.controls['DO_PostalCode'].setValue(this.pincode[0].postal_Code)
  }
  Get_language() {
    this.service.Get_Language()
      .subscribe((data) => {
        this.languagedd = data
      })
  }
  Get_specilizationdd(dO_CD_Id_FK) {
    this.service.Get_SpecializationDDby(dO_CD_Id_FK)
      .subscribe((data) => {
        this.specs = data
      })
  }
  discpchange(event) {
    this.service.Get_SpecializationDDby(event)
      .subscribe((data) => {
        this.specs = data
        this.doctor.controls['DO_SP_Id_FK'].reset();
      })
  }

}
