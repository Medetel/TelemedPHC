import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Notification } from '../../../core/Notifications/Notification';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { PHCManualAppointService } from '../phc-manual-appoint.service';

@Component({
  selector: 'app-previous-records',
  templateUrl: './previous-records.component.html',
  styleUrls: ['./previous-records.component.scss']
})
export class PreviousRecordsComponent implements OnInit {

  myForm: FormGroup;
  selectedFiles: any;
  base64Image: any;
  Image_Url: any;
  Test1: any;
  document: any;
  patient_id :any;
  constructor(public formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private domSanitizer: DomSanitizer, private service: PHCManualAppointService, private notify: Notification) {
    this.myForm = this.formBuilder.group({
      'Doc_Id': [''],
      'Doc_Type': [''],
      'documentname': [''],
      'file': ['']
    });
  }

  ngOnInit(): void {
    this.patient_id = +this.route.snapshot.params['patient_id'];    
    this.get_documenttype();    
  }
  get_documenttype() {
    this.service.Get_documentdropdown()
      .subscribe((data) => {
        this.document = data        
      })
  }

  

  onSelectFile(fileInput: any) {    
    this.selectedFiles = <File>fileInput.target.files[0];   
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(event.target.result);
      this.Image_Url = this.base64Image     
      
    };
    
  }

  save_document() {    
    //document type
    if (this.myForm.value.Doc_Type == "") {
      this.notify.errorsmsg("Please select document type")
      return;
    }

    if (this.myForm.value.documentname == "") {
      this.notify.errorsmsg("Please enter document name")
      return;
    }
    const name_REGEXP = /^[a-zA-Z ]*$/;
    if (!name_REGEXP.test(this.myForm.value.documentname)) {
      this.notify.errorsmsg("Document name allow character only")
      return;
    }
    if ((this.myForm.value.documentname as string).indexOf('  ') >= 0 || this.myForm.value.documentname.startsWith(' ') || this.myForm.value.documentname.endsWith(' ')) {
      this.notify.errorsmsg('Document name must not contain white space');
      return;
    }
    if (this.myForm.value.file == "") {
      this.notify.errorsmsg("Please choose a file")
      return;
    }
    var doctype = this.myForm.value.Doc_Type.doctype_name.toUpperCase();
    var tExt = this.myForm.value.file.split('.').pop();
    var typeExt = tExt.toUpperCase();

    if (typeExt == 'PDF' || typeExt == 'PNG' || typeExt == 'JPG' || typeExt == 'JPEG') {
     
      if (doctype != typeExt) //cross validation
      {
        this.notify.errorsmsg('Please select correct document type or choose correct file');
        return;
      }

    }
    else {
      //invalid file
      this.notify.errorsmsg("Please choose correct file")
      return;
    }
   
    const formData = new FormData();
    formData.append('PR_Id_FK', this.patient_id);
    formData.append('Doc_Type_Id_FK', this.myForm.value.Doc_Type.doctype_id);
    formData.append('documentname', this.myForm.value.documentname);
    formData.append('Choose_Document', this.selectedFiles);
    formData.append('delete_flag', 'false');
    formData.append('status', '1'); 
    
    this.service.insertpatient(formData)
      .subscribe((data) => {
        this.notify.successmsg("File uploaded successfully")
        
      })
      this.myForm.reset();
  }
  close(){
    this.router.navigate(['/base/task/appointment']);  
  //   setTimeout(() => {
  //     window.location.reload();
  // }, 700);
}
}
