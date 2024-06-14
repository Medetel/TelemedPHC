import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from 'src/app/core/Notifications/Notification';
import { AdminService } from '../../admin.service';
import { CustomvalidationService } from '../../customvalidation.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  office: any;
  role: any;
  partnerData: any;
  user_register: FormGroup;
  rolecategory: any;
  hospital: any;
  pharmacy: any;
  OfficeCategory: any;
  diagnostic: any;
  phoneNumber: string;
  emailId: any
  firstName: any
  lastName: any
  checkPartnerData: any = [];
  emptyData: any;
  checkRolecategoryData: any = [];
  partnerRoleId: any;
  newphide = true;
  conphide = true;
  isReadonly = true;
  checkRoleId: any;

  constructor(private _service: AdminService, private fb: FormBuilder, private router: Router, private notif: Notification, private customValidator: CustomvalidationService) {
    this.user_register = this.fb.group({
      'OfficeId': [''],
      'RoleId': [''],
      'PartnerId': [''],
      'FirstName': [''],
      'LastName': [''],
      'PhoneNumber': [''],
      'EmailId': [''],
      'Password': [''],
      'ConfirmPassword': [''],
    },
    )
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.user_register.controls[controlName].hasError(errorName);
  }

  nameValidators(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/,/0-9]/;

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }

  nameValidatorTest(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\s/g,''/a-zA-Z]/;

    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.user_register.controls;
  }

  ngOnInit(): void {
    this.setDefaultValue();
    this.get_role();
    this.get_hospital();
    //this.get_pharmacy();
    //this.get_diagnostic();
  }
  save() {

    if (this.user_register.value.RoleId == "") {
      this.notif.errorsmsg("Please select role name")
      return;
    }

    if (this.checkRoleId == 10 || this.checkRoleId == 2 || this.checkRoleId == 5 || this.checkRoleId == 7 || this.partnerRoleId == 26 || this.partnerRoleId == 1) {
      if (this.user_register.value.OfficeId == "") {
        this.notif.errorsmsg("Please select office name")
        return;
      }
    }
    else {
      this.notif.errorsmsg("Office(s) name not found")
      return;
    }

    if (this.checkRoleId == 5 || this.checkRoleId == 7 || this.partnerRoleId == 26) //partner
    {
      if (this.user_register.value.PartnerId == "") {
        this.notif.errorsmsg("Please select partner name")
        return;
      }
    }

    if (this.checkRoleId == 10 || this.checkRoleId == 2 || this.partnerRoleId == 1) {
      if (this.user_register.value.FirstName == "") {
        this.notif.errorsmsg("Please enter first name")
        return;
      }
      const name_REGEXP = /^[a-zA-Z ]*$/;
      if (!name_REGEXP.test(this.user_register.value.FirstName)) {
        this.notif.errorsmsg("First name allow character only")
        return;
      }
      if ((this.user_register.value.FirstName as string).indexOf('  ') >= 0 || this.user_register.value.FirstName.startsWith(' ') || this.user_register.value.FirstName.endsWith(' ')) {
        this.notif.errorsmsg('First name must not contain white space');
        return;
      }

      //last name 
      if (this.user_register.value.LastName != "") {
        if (!name_REGEXP.test(this.user_register.value.LastName)) {
          this.notif.errorsmsg("Last name allow character only")
          return;
        }
        if ((this.user_register.value.LastName as string).indexOf('  ') >= 0 || this.user_register.value.LastName.startsWith(' ') || this.user_register.value.LastName.endsWith(' ')) {
          this.notif.errorsmsg('Last name must not contain white space');
          return;
        }

      }

      //phone number
      if (this.user_register.value.PhoneNumber == "") {
        this.notif.errorsmsg("Please enter phone number")
        return;
      }
      const phone_REGEXP = /[0-9]{10}$/;
      if (!phone_REGEXP.test(this.user_register.value.PhoneNumber)) {
        this.notif.errorsmsg("Please enter valid 10 digit phone number")
        return;
      }

      if (this.user_register.value.PhoneNumber == "0000000000") {
        this.notif.errorsmsg("Please enter valid phone number")
        return;
      }

      //email
      if (this.user_register.value.EmailId == "") {
        this.notif.errorsmsg("Please enter email id")
        return;
      }
      const email_REGEXP = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;  ///[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (!email_REGEXP.test(this.user_register.value.EmailId)) {
        this.notif.errorsmsg("Please enter valid email id")
        return;
      }

    }

    //password
    if (this.user_register.value.Password == "") {
      this.notif.errorsmsg("Please enter password")
      return;
    }

    if (this.user_register.value.Password.length < 6) {
      this.notif.errorsmsg("Password must contain at least 6 characters")
      return;
    }
    if (!(this.user_register.value.Password.includes("@") || this.user_register.value.Password.includes("#")
      || this.user_register.value.Password.includes("!") || this.user_register.value.Password.includes("~")
      || this.user_register.value.Password.includes("$") || this.user_register.value.Password.includes("%")
      || this.user_register.value.Password.includes("^") || this.user_register.value.Password.includes("&")
      || this.user_register.value.Password.includes("*") || this.user_register.value.Password.includes("(")
      || this.user_register.value.Password.includes(")") || this.user_register.value.Password.includes("-")
      || this.user_register.value.Password.includes("+") || this.user_register.value.Password.includes("/")
      || this.user_register.value.Password.includes(":") || this.user_register.value.Password.includes(".")
      || this.user_register.value.Password.includes(", ") || this.user_register.value.Password.includes("<")
      || this.user_register.value.Password.includes(">") || this.user_register.value.Password.includes("?")
      || this.user_register.value.Password.includes("|"))) {
      this.notif.errorsmsg("Password must have at least one special character")
      return;
    }

    const number_REGEXP = /\d/;
    if (!number_REGEXP.test(this.user_register.value.Password)) {
      this.notif.errorsmsg("Password must have at least one numeric digit")
      return;
    }

    const upper_REGEXP = /[A-Z]/;
    if (!upper_REGEXP.test(this.user_register.value.Password)) {
      this.notif.errorsmsg("Password must have at least one uppercase letter")
      return;
    }

    const lower_REGEXP = /[a-z]/;
    if (!lower_REGEXP.test(this.user_register.value.Password)) {
      this.notif.errorsmsg("Password must have at least one lowercase letter")
      return;
    }

    if ((this.user_register.value.Password as string).indexOf('  ') >= 0 || this.user_register.value.Password.startsWith(' ') || this.user_register.value.Password.endsWith(' ')) {
      this.notif.errorsmsg('Password must not contain white space');
      return;
    }

    //confirm password
    if (this.user_register.value.ConfirmPassword == "") {
      this.notif.errorsmsg("Please enter confirm password")
      return;
    }

    if (this.user_register.value.Password != this.user_register.value.ConfirmPassword) {
      this.notif.errorsmsg("Confirm password does not match!")
      return;
    }

    var userData: any;
    if (this.partnerRoleId == 5 || this.partnerRoleId == 7) // partner
    {

      userData = {
        firstname: this.firstName,
        lastname: this.lastName,
        officeId: this.user_register.value.OfficeId,
        roleId: this.user_register.value.RoleId,
        userId: this.user_register.value.PartnerId,
        phonenumber: String(this.phoneNumber),
        email: this.emailId,
        password: this.user_register.value.Password,
        confirmPassword: this.user_register.value.ConfirmPassword
      }

    }
    else // 10->super admin,  2->hospital admin
    {
      userData = {
        firstname: this.user_register.value.FirstName,
        lastname: this.user_register.value.LastName,
        officeId: this.user_register.value.OfficeId,
        roleId: this.user_register.value.RoleId,
        userId: "0", //this.user_register.value.PartnerId,
        phonenumber: String(this.user_register.value.PhoneNumber),
        email: this.user_register.value.EmailId,
        password: this.user_register.value.Password,
        confirmPassword: this.user_register.value.ConfirmPassword
      }

    }

    this._service.post_user(userData)
      .subscribe((res) => {
        this.notif.successmsg("User saved successfully")
        this.clearAllCtrls();
        this.user_register.controls['RoleId'].setValue('');
        this.router.navigate(['/base/admin/users']);
      })


  }
  checkFilterRole(data) {
    this.user_register.controls['OfficeId'].setValue('');
    this.user_register.controls['PartnerId'].setValue('');
    this.rolecategory = this.role.filter(c => c.id == data.value);
    this.checkRoleId = this.rolecategory[0].roleId;

    this.checkRolecategoryData = this.rolecategory;
    if (Object.keys(this.checkRolecategoryData).length > 0) {
      this.partnerRoleId = this.rolecategory[0].roleId;
      // 10->super admin, 2->hospital admin, 5->medical asisstant, 7->doctor
      if (this.partnerRoleId == 10 || this.partnerRoleId == 2 || this.partnerRoleId == 5 || this.partnerRoleId == 7 || this.partnerRoleId == 1 || this.partnerRoleId == 26) {
        this.clearAllCtrls();
        this.get_hospital();
        this.office = this.hospital;
      }
      else {
        this.clearAllCtrls();
      }
    }
    else {
      //Data not found
    }

  }

  clearAllCtrls() {
    this.user_register.controls['OfficeId'].setValue('');
    this.user_register.controls['PartnerId'].setValue('');
    this.office = this.emptyData;
    this.partnerData = this.emptyData;
    this.firstName = "";
    this.lastName = "";
    this.phoneNumber = "";
    this.emailId = "";
    this.user_register.controls['FirstName'].setValue('');
    this.user_register.controls['LastName'].setValue('');
    this.user_register.controls['PhoneNumber'].setValue('');
    this.user_register.controls['EmailId'].setValue('');
    this.user_register.controls['FirstName'].enable();
    this.user_register.controls['LastName'].enable();
    this.user_register.controls['PhoneNumber'].enable();
    this.user_register.controls['EmailId'].enable();
    this.user_register.controls['Password'].setValue('');
    this.user_register.controls['ConfirmPassword'].setValue('');
  }


  setDefaultValue() {
    this.partnerData = this.emptyData;
  }
  checkFilterOffice(data) {
    this.user_register.controls['PartnerId'].setValue('');
    var hospitaldata = this.office.filter(c => c.cat_Id == data.value);

    var hospitalid = hospitaldata[0].cat_Id;
    if (this.partnerRoleId == 7) //doctor
    {

      this.GetDoctorDetails(hospitalid);
      this.user_register.controls['FirstName'].disable();
      this.user_register.controls['LastName'].disable();
      this.user_register.controls['PhoneNumber'].disable();
      this.user_register.controls['EmailId'].disable();

    }
    if (this.partnerRoleId == 5) //medical assistant
    {
      this.GetMedicalAssistDetails(hospitalid)
      this.user_register.controls['FirstName'].disable();
      this.user_register.controls['LastName'].disable();
      this.user_register.controls['PhoneNumber'].disable();
      this.user_register.controls['EmailId'].disable();
    }
    if (this.partnerRoleId == 2 || this.partnerRoleId == 10 || this.partnerRoleId == 1) //hospital admin or super admin
    {
      this.user_register.controls['FirstName'].enable();
      this.user_register.controls['LastName'].enable();
      this.user_register.controls['PhoneNumber'].enable();
      this.user_register.controls['EmailId'].enable();
    }

    if (this.partnerRoleId == 26) //call agent
    {
      this.GetCallagentDetails(hospitalid)
      this.user_register.controls['FirstName'].disable();
      this.user_register.controls['LastName'].disable();
      this.user_register.controls['PhoneNumber'].disable();
      this.user_register.controls['EmailId'].disable();
    }

  }

  GetDoctorDetails(hospitalid: any) {
    this._service.GetDoctorDetails(hospitalid)
      .subscribe((data) => {
        this.checkPartnerData = data;
        if (Object.keys(this.checkPartnerData).length > 0) {
          this.partnerData = data;
          if (this.phoneNumber != "" || this.emailId != "" || this.firstName != "" || this.lastName != "") {
            this.phoneNumber = "";
            this.emailId = "";
            this.firstName = "";
            this.lastName = "";
          }

        }
        //not hitting
        /*
        else{
                     
        }
        */
      },
        error => {
          this.partnerData = this.emptyData;
          this.phoneNumber = "";
          this.emailId = "";
          this.firstName = "";
          this.lastName = "";

        }

      );
  }


  GetCallagentDetails(hospitalid: any) {
    this._service.GetCallagentDetails(hospitalid)
      .subscribe((data) => {
        this.checkPartnerData = data;
        if (Object.keys(this.checkPartnerData).length > 0) {
          this.partnerData = data;
          if (this.phoneNumber != "" || this.emailId != "" || this.firstName != "" || this.lastName != "") {
            this.phoneNumber = "";
            this.emailId = "";
            this.firstName = "";
            this.lastName = "";
          }

        }
        //not hitting
        /*
        else{
                   
        }
        */
      },
        error => {
          this.partnerData = this.emptyData;
          this.phoneNumber = "";
          this.emailId = "";
          this.firstName = "";
          this.lastName = "";

        }

      );
  }



  GetMedicalAssistDetails(hospitalid: any) {
    this._service.GetMedicalAssistDetails(hospitalid)
      .subscribe((data) => {
        this.checkPartnerData = data;
        if (Object.keys(this.checkPartnerData).length > 0) {
          this.partnerData = data;
          if (this.phoneNumber != "" || this.emailId != "" || this.firstName != "" || this.lastName != "") {
            this.phoneNumber = "";
            this.emailId = "";
            this.firstName = "";
            this.lastName = "";
          }

        }
        //not hitting
        /*
        else{
                   
        }
        */
      },
        error => {
          this.partnerData = this.emptyData;
          this.phoneNumber = "";
          this.emailId = "";
          this.firstName = "";
          this.lastName = "";

        }

      );
  }

  checkFilterPartner(data) {
    console.log("partner dd chamge :" + JSON.stringify(data.value));
    var hospitaldata = this.partnerData.filter(c => c.userID == data.value);
    console.log("hospital :" + JSON.stringify(hospitaldata));
    this.phoneNumber = hospitaldata[0].mobileNumber;
    this.emailId = hospitaldata[0].email;
    this.firstName = hospitaldata[0].firstName;
    this.lastName = hospitaldata[0].lastName;

  }

  get_office() {
    this._service.Get_Office()
      .subscribe((data) => {
        this.OfficeCategory = data
      })
  }
  get_role() {
    this._service.Get_RoleDD()
      .subscribe((data) => {
        this.role = data

      })
  }
  get_hospital() {
    this._service.Get_Hospital()
      .subscribe((data) => {
        this.hospital = data
      })
  }

  // get_hospital() {
  //   if (this.partnerRoleId === 1) {
  //     this.hospital = [{ cat_Id: 2363, code: "HOS12414", name: "Medetel Health Hospital" }];
  //   } else {
  //     this._service.Get_Hospital()
  //       .subscribe((data) => {
  //         this.hospital = data;
  //       });
  //   }
  // }

  get_pharmacy() {
    this._service.Get_Pharmacy()
      .subscribe((data) => {
        this.pharmacy = data
      })
  }
  get_diagnostic() {
    this._service.Get_Diagnostic()
      .subscribe((data) => {
        this.diagnostic = data
      })
  }
}