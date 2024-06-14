import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Notification } from 'src/app/core/Notifications/Notification';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NavbarComponent } from 'src/app/views/layout/navbar/navbar.component';
import { Profile } from 'src/app/views/layout/sidebar/menu.model';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit { 
  selectedFile: any;  
  image_Url;
  username;
  maxDate:any=new Date();

  @Output() public found = new EventEmitter<any>();
  base64Image: any;
  constructor(private service: ProfileService, private notif: Notification, private domSanitizer: DomSanitizer) {
  }
  profileupdate = new FormGroup({
    Id: new FormControl(''),
    Image: new FormControl(''),
    Firstname: new FormControl(''),
    Lastname: new FormControl(''),
    DOB: new FormControl(''),
    Gender: new FormControl(''),
    EmailID: new FormControl(''),
    Phonenumber: new FormControl(''),
  });

  nameValidatorss(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\/,/0-9]/;   
  
    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  }
  nameValidator(control: any): { [key: string]: boolean } {
    const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?/\s/g,''/a-zA-Z]/;
   
    if (control.value && nameRegexp.test(control.value)) {
      return { invalidName: true };
    }
  } 

  onSelectFile(file: any) {
      this.selectedFile = <File>file.target.files[0];  
      var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      var tExt ="."+this.profileupdate.value.Image.split('.').pop();  

    if(!allowedExtensions.exec(tExt)) {      
        this.notif.errorsmsg('Please upload file having extensions .jpeg/.jpg/.png only.');
        return;
    }     
      var reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = (event: any) => {
      this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(event.target.result);
      this.image_Url = this.base64Image
      this.service.changeUserImage(this.image_Url)
      console.log(this.image_Url)
    };

  }
 
  ngOnInit(): void {
    //Saheb    
    this.loaduserprofile();
  }
  loaduserprofile()
  {
    this.service.Get_Userprofile()
      .subscribe((data: any) => {        
        this.profileupdate.controls['Firstname'].setValue(data.firstName);
        this.profileupdate.controls['Lastname'].setValue(data.lastName)
        this.profileupdate.controls['EmailID'].setValue(data.email)
        this.profileupdate.controls['Gender'].setValue(data.gender)
        this.profileupdate.controls['Phonenumber'].setValue(data.phoneNumber)
        this.profileupdate.controls['DOB'].setValue(data.dob)
        this.username = data.userName
        this.profileupdate.controls['Id'].setValue(data.id) 
        //saheb      
        //this.image_Url = 'data:image/jpeg;base64,' + data.imagebyte;
        this.image_Url = data.imagename;
      }) 
      
      //this.profileupdate.controls['EmailID'].disable();
      //this.profileupdate.controls['Phonenumber'].disable();

  }       

  updateprofile() {
   
    if(this.profileupdate.value.Firstname=="")
    {
      this.notif.errorsmsg("Please enter first name");
      document.getElementById("Firstname").focus();
      return;
    }

    const name_REGEXP = /^[a-zA-Z ]*$/;
    if (!name_REGEXP.test(this.profileupdate.value.Firstname)) {
      this.notif.errorsmsg("First name allow character only")
      document.getElementById("Firstname").focus();
      return;
    }
    if((this.profileupdate.value.Firstname as string).indexOf('  ') >= 0 || this.profileupdate.value.Firstname.startsWith(' ') ||  this.profileupdate.value.Firstname.endsWith(' '))
		{ 
			this.notif.errorsmsg('First name must not contain white space');	
      document.getElementById("Firstname").focus();		
			return; 
		}

    //last name 
    if(this.profileupdate.value.Lastname!="")
    {
      if (!name_REGEXP.test(this.profileupdate.value.Lastname)) {
        this.notif.errorsmsg("Last name allow character only")
        document.getElementById("Lastname").focus();	
        return;
      }
      if((this.profileupdate.value.Lastname as string).indexOf('  ') >= 0 || this.profileupdate.value.Lastname.startsWith(' ') ||  this.profileupdate.value.Lastname.endsWith(' '))
      { 
        this.notif.errorsmsg('Last name must not contain white space');
        document.getElementById("Lastname").focus();				
        return; 
      }
      
    } 
    //dob
    if(this.profileupdate.value.DOB=="" || this.profileupdate.value.DOB==null)
    {
      this.notif.errorsmsg("Please select date of birth.");
      document.getElementById("DOB").focus();
      return;
    }

     //gender
     if(this.profileupdate.value.Gender=="" || this.profileupdate.value.Gender==null)
     {
       this.notif.errorsmsg("Please select gender.");
       document.getElementById("Gender").focus();
       return;
     }

     //email
     if(this.profileupdate.value.EmailID=="")
     {
       this.notif.errorsmsg("Please enter email id")
       document.getElementById("EmailID").focus();
       return;
     }   
     const email_REGEXP =/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;  
     if (!email_REGEXP.test(this.profileupdate.value.EmailID)) {
       this.notif.errorsmsg("Please enter valid email id")
       document.getElementById("EmailID").focus();
       return;
     }

     //phone number
    if(this.profileupdate.value.Phonenumber=="")
    {
      this.notif.errorsmsg("Please enter phone number")
      document.getElementById("Phonenumber").focus();
      return;
    }   
    const phone_REGEXP = /[0-9]{10}$/;
    if (!phone_REGEXP.test(this.profileupdate.value.Phonenumber)) {
      this.notif.errorsmsg("Please enter valid 10 digit phone number")
      document.getElementById("Phonenumber").focus();
      return;
    }

    if(this.profileupdate.value.Phonenumber=="0000000000")
    {
      this.notif.errorsmsg("Please enter valid phone number")
      document.getElementById("Phonenumber").focus();
      return;
    } 

    const formData = new FormData();
    const ass_DOB = new DatePipe('en-US').transform(this.profileupdate.value.DOB, 'dd/MM/yyyy')
    formData.append('Id', this.profileupdate.value.Id);
    formData.append('FirstName', this.profileupdate.value.Firstname);
    formData.append('LastName', this.profileupdate.value.Lastname);
    formData.append('DOB', ass_DOB);
    formData.append('Gender', this.profileupdate.value.Gender);
    formData.append('Email', this.profileupdate.value.EmailID);
    formData.append('PhoneNumber', this.profileupdate.value.Phonenumber);
    formData.append('Image', this.selectedFile);  
      
    this.service.update_profile(formData)
      .subscribe((res) => {
        this.notif.successmsg("Profile updated successfully")       
        window.location.reload(); 
      }, (error) => {
        this.notif.errorsmsg("Profile not updated")
      })
  }
 
}