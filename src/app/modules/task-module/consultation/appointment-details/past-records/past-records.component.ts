import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CounsultationService } from '../../counsultation.service';



@Component({
  selector: 'app-past-records',
  templateUrl: './past-records.component.html',
  styleUrls: ['./past-records.component.scss']
})
export class PastRecordsComponent implements OnInit {
  previousRecordForm: FormGroup;
  document: any;
  patient_id: any;
  documentdetails: any;
  selectedFiles: any;
  Image_Url;
  test=environment.Image_Url +'PatientDocuments';
  base64Image: any;
  
  
  constructor(private route: ActivatedRoute,private domSanitizer: DomSanitizer, private formBuilder: FormBuilder, private service:CounsultationService) {

    this.previousRecordForm = this.formBuilder.group({
      'Doc_Id': [''],
      'Doc_Type_Id_FK': [''],
      'documentname': [''],
      'file': ['']
    });
    this.dataSource.data = this.PeriodicElement;
  }

  PeriodicElement = [
    {position: 1, DocumentType: '', DocumentName: '', Document: ''},
  ];

  displayedColumns: string[] = ['position', 'DocumentType', 'DocumentName', 'Document'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {

    let id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {     
      id = +params['id'];
      this.patient_id=id;      
    });
    
    this.get_document();  

  }

  onSelectFile(fileInput: any) {
    this.selectedFiles = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event: any) => {
      this.base64Image = this.domSanitizer.bypassSecurityTrustUrl(event.target.result);     
    };
  }

  
  get_document() {
    this.service.Get_documentdetail_patientid(this.patient_id)
      .subscribe((res) => {
        this.documentdetails = res       
        this.dataSource= new MatTableDataSource(this.documentdetails);        
        this.dataSource.paginator=this.paginator;
        this.Image_Url=environment.Image_Url +'PatientDocuments';
      })
  }
  
}

