import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { image } from 'd3';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FooterComponent } from 'src/app/views/layout/footer/footer.component';
import { CounsultationService } from '../../../counsultation.service';


@Component({
	selector: 'app-prescription-pdf',
	templateUrl: './prescription-pdf.component.html',
	styleUrls: ['./prescription-pdf.component.scss']
})
export class PrescriptionPdfComponent implements OnInit {
	do_reg_no: any;
	imageUrl2: any;
	mainData: any;
	childData: any;
	imageUrl: string;
	hospital_Name: any;
	hospital_Address: any;
	gram_name: any;
	taluk_name: any;
	district_name: any;
	state_name: any;
	postalcode: any;
	country_name: any;
	hospital_Email: any;
	hos_phoneNo: any;
	hos_url: any;
	coN_DO_Name: any;
	coN_PR_Name: any;
	coN_Date: any;
	coN_Id: any;
	pr_Id: any;
	page_title: any;
	imageUrl3: any;
	download() {

		const element = document.getElementById('pdfTable');
		html2canvas(element, {
			scale: 2,
		}).then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
			const doc = new jsPDF('p', 'mm', 'a4');
			const imgWidth = 190;
			const pageHeight = 295;
			const imgHeight = (canvas.height * imgWidth) / canvas.width;
			let heightLeft = imgHeight;
			let position = 10;
			doc.addImage(imgData, 'PNG', position, position, imgWidth, imgHeight);
			heightLeft -= pageHeight;
			while (heightLeft >= 0) {
				position = heightLeft - imgHeight;
				doc.addPage();
				doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
				heightLeft -= pageHeight;
			}
			const Filename = "Drug prescription-" + this._data.d.coN_Id + ".pdf";
			doc.save(Filename);
		});

	}

	constructor(@Inject(MAT_DIALOG_DATA) private _data: any, private service: CounsultationService) { }


	printThisPage() {
		window.print();
	}


	ngOnInit(): void {
		this.service.GetConsult_DrugPrescriptionById(this._data.d.coN_Id).subscribe((data: any) => {
			this.mainData = data;
			console.log('main data :' + JSON.stringify(this.mainData))
			this.hospital_Name = this.mainData[0].hospital_Name;
			this.hospital_Address = this.mainData[0].hospital_Address;
			this.gram_name = this.mainData[0].gram_name;
			this.taluk_name = this.mainData[0].taluk_name;
			this.district_name = this.mainData[0].district_name;
			this.state_name = this.mainData[0].state_name;
			this.postalcode = this.mainData[0].postalcode;
			this.country_name = this.mainData[0].country_name;
			this.hospital_Email = this.mainData[0].hospital_Email;
			this.hos_phoneNo = this.mainData[0].hos_phoneNo;
			this.hos_url = this.mainData[0].hos_url;
			this.coN_Id = this.mainData[0].coN_Id;
			this.pr_Id = this.mainData[0].coN_PR_Id_FK;
			this.coN_DO_Name = this.mainData[0].coN_DO_Name;
			this.coN_PR_Name = this.mainData[0].coN_PR_Name;
			this.coN_Date = this.mainData[0].coN_Date;
			this.childData = data[0].getallprescription;
			this.imageUrl = this.mainData[0].hospital_Logo;
			this.do_reg_no = this.mainData[0].do_reg_no;
			this.imageUrl2 = this.mainData[0].do_signature;
			this.imageUrl3 = this.mainData[0].hos_NetworkLogo;
			this.page_title = 'Rx' + '-' + 'ConsId' + this.coN_Id + '-' + 'PId' + this.pr_Id;

		})
	}

	//${this.service_Id}

	printForm(): void {
		let printContents, popupWin;
		printContents = document.getElementById('print-section').innerHTML;
		popupWin = window.open('', '_blank', 'top=0,left=0,height=700,width=700');
		popupWin.document.open();
		popupWin.document.write(`
      <html>
        <head>
          <title>${this.page_title}</title>         
          <style>
          .form{
            background: #f2f2f2;
            border: 1px solid #ccc;
            padding:20px;
        }  
              
        .awardtable{
            margin-top: -10px;
        }
        
        .awardtable td{
            padding:5px;
            font-size:15px;
        }
        
        .form .container{
            background: #fff;
        }      
        
        .padding0{
            padding:0;
        }
        
        .form-label{
            /* font-size:12px;
            display: block;
            padding:10px 0px 0px 0px;
            color:#aaa; */
            font-size: 16px;
            width: 44%;
            display: inline-block;
            color: #797878;
        }
        
        .data{
            font-size: 16px;
            display: inline-block;
            width: 50%;
            padding: 5px;
            vertical-align: middle;
        }   
        
        
        .sub-title{
            font-size:18px;
            padding-left:20px;
            text-decoration: underline;
        }
        
        .row{
            padding:10px;
        }
        
        .row:nth-child(odd){
            background:#ffffff;
        }
        
        .table-header{
            background: grey;
            color: #fff;
        }
        
        .highlight-row{
            background:#f1ecec;
        }
        
        .sticky-back{
            position: fixed;
            left: 65px;
            top: 165px;
            z-index: 100;
        }
        
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
		);
		popupWin.document.close();
	}
}
