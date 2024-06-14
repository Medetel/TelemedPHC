import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Notification } from 'src/app/core/Notifications/Notification';
import { AssistantPasswordComponent } from '../assistant-password/assistant-password.component';
import { AssistantService } from '../assistant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assistant',
  templateUrl: './add-assistant.component.html',
  styleUrls: ['./add-assistant.component.scss']
})
export class AddAssistantComponent implements OnInit {
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
  maxDate:any=new Date();
  
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private service: AssistantService, private router: Router, private notif: Notification, public dialog: MatDialog) { }
  assistant = new FormGroup({
    Assi_Photo: new FormControl(''), 
    Assi_FirstName: new FormControl('', [Validators.required,this.alphaValidator,this.spaceValidator]),
    Assi_LastName: new FormControl('', [Validators.required,this.alphaValidator,this.spaceValidator]),
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
    // Assi_skill_id: new FormControl(''),
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
    if ((control.value as string).indexOf('  ') >= 0 || control.value.startsWith(' ') ||  control.value.endsWith(' ')) {
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
    this.get_hospitaldd();
    this.get_qualificationdd();
    this.get_designationdd();   
    this.get_country();
    this.Image_Url = { url: '/asstes/images/profile.png' }
  }

  save() {
    const formdata = new FormData();
    const ass_DOB = new DatePipe('en-US').transform(this.assistant.value.Assi_DOB, 'dd/MM/yyyy')
    formdata.append('Assi_Photo', this.selectedFiles);
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
    formdata.append('gram_Id_Fk', this.assistant.value.gram_Id_Fk==null ? 0 : this.assistant.value.gram_Id_Fk);
    formdata.append('Assi_Village', this.assistant.value.Assi_Village);	
    formdata.append('Assi_PostalCode', this.assistant.value.Assi_PostalCode);
    formdata.append('Assi_Skill_Desc', this.assistant.value.Assi_Skill_Desc);
    this.service.Post_Assistant(formdata)
      .subscribe((res) => {
        this.notif.successmsg("Assistant Added Successfully")
        this.router.navigate(['/base/master/assistant']);
      })
      //this.assistant.reset();
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
  // countrychange(event) {
  //   this.gram = undefined
  //   this.taluk=undefined
  //   this.district = undefined
  //   this.state=undefined 
  //   this.assistant.controls['Assi_PostalCode'].reset();
  //   this.service.Get_State(event)
  //     .subscribe((data) => {
  //       this.state = data

  //       this.assistant.controls['Assi_DI_Id_FK'].reset();
  //       this.assistant.controls['taluk_Id_Fk'].reset();
  //       this.assistant.controls['gram_Id_Fk'].reset();
  //       this.assistant.controls['Assi_PostalCode'].reset();
     
  //     if(this.state.length==0){
  //       this.notif.errorsmsg("Data not found!")
  //     }
  //     })
  // }

  countrychange(event) {
    if (this.assistant.value.Assi_Country_Id_FK !== event) {
      this.assistant.controls['Assi_ST_Id_FK'].setValue('');
      this.assistant.controls['Assi_DI_Id_FK'].setValue('');
      this.assistant.controls['taluk_Id_Fk'].setValue('');
    }
   
    // this.assistant.controls['Assi_ST_Id_FK'].reset();
    // this.assistant.controls['Assi_DI_Id_FK'].reset();
    // this.assistant.controls['taluk_Id_Fk'].reset();

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
          // Handle error if needed
        });
  }
  statechange(event) {
    if (this.assistant.value.Assi_ST_Id_FK !== event) {
      // this.assistant.controls['Assi_ST_Id_FK'].setValue('');
      this.assistant.controls['Assi_DI_Id_FK'].setValue('');
      this.assistant.controls['taluk_Id_Fk'].setValue('');
    }
    this.gram = undefined
    this.taluk=undefined
    this.district = undefined
    this.service.Get_District(event)
      .subscribe((data) => {
        this.district = data
      // },(error:any)=>
      // {
      //   this.assistant.controls['Assi_DI_Id_FK'].reset();
      //   this.assistant.controls['taluk_Id_Fk'].reset();
      //   this.assistant.controls['gram_Id_Fk'].reset();
      });
  }
  distritchange(event) {
    if (this.assistant.value.Assi_DI_Id_FK !== event) {
      this.assistant.controls['taluk_Id_Fk'].setValue('');
    }
    this.gram = undefined
    this.taluk=undefined
    this.service.Get_Taluk(event)
      .subscribe((data) => {
        this.taluk = data
      })
  }


  testempty:any=[];
  gramData:any=[];
  // talukchange(event) {
  //   this.gram = undefined;
  //   this.service.Get_Gram_id(event)
  //     .subscribe((data) => {
  //       this.gram = data
  //     }
  //     ,(error:any)=>
  //    {
       
  //      this.gram=this.testempty;
  //      this.assistant.controls['Assi_PostalCode'].reset();
  //    }
  //    );
  // }
  talukchange(event) {
    // Clear the village and pincode records
    this.assistant.controls['gram_Id_Fk'].reset();
    this.assistant.controls['Assi_PostalCode'].reset();

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
    this.service.Get_skillsetddbyId(event)
      .subscribe((data) => {       
        this.skill = data
        if (this.skill.length == 0) {
          this.notif.errorsmsg("Data not found!");
        }

      })
    this.assistant.controls['Assi_skill_id'].reset();
  }  

  password(d: any) {
    const dialogRef = this.dialog.open(AssistantPasswordComponent,
      {
        width: "100%",
        maxWidth: "400px",
        height: "auto",
        hasBackdrop: true,
        maxHeight: "700px",
        data: { d },
      });
    dialogRef.afterClosed().subscribe(result => {     
    });
  }

}
