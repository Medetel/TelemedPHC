import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const htmlToPdfmake = require("html-to-pdfmake");
import { LabInfoService } from '../lab-info.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';



@Component({
	selector: 'app-suggest-lab',
	templateUrl: './suggest-lab.component.html',
	styleUrls: ['./suggest-lab.component.scss']
})
export class SuggestLabComponent implements OnInit {
	// mainData: any;
	// childData: any;
	// imageUrl: string;
	do_reg_no: any;
	imageUrl2: any;
	imageUrl3: any;
	mainData: any;
	childData: any;
	imageUrl: string;
	hospital_Name: any;
	hospital_Address: any;
	hos_village: any;
	taluk_name: any;
	district_name: any;
	state_name: any;
	postalcode: any;
	country_name: any;
	hospital_Email: any;
	hos_phoneNo: any;
	hos_url: any;
	dO_Name: any;
	pR_Name: any;
	consulted_Date: any;
	coN_Id: any;
	//pr_Id: any;
	page_title: any;
	pr_Id: any;
	pR_Code: any;
	pR_Age: any;
	/*
	@ViewChild('pdfTable') pdfTable!: ElementRef;
	public exportPDF() {
		const pdfTable = this.pdfTable.nativeElement;
		var html = htmlToPdfmake(pdfTable.innerHTML);
		const documentDefinition = { content: html };
		pdfMake.createPdf(documentDefinition).download(); 
		 
	  }
	  */

	// download() {
	// 	const printContents = document.getElementById('print-section').innerHTML;
	// 	const blob = new Blob([printContents], { type: 'text/html' });
	// 	const url = URL.createObjectURL(blob);

	// 	const a = document.createElement('a');
	// 	a.href = url;
	// 	a.download = "Labtest-" + this._data.d.coN_Id + ".html"; // Specify the desired filename
	// 	a.click();
	// 	}

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
			const Filename = "Labtest-" + this._data.d.coN_Id + ".pdf";
			doc.save(Filename);
		});
	}

	constructor(@Inject(MAT_DIALOG_DATA) private _data: any, private service: LabInfoService, private http: HttpClient) { }



	printThisPage() {
		window.print();
	}


	// 	ngOnInit(): void {
	// 	    this.service.GetConsult_LabTestById(this._data.d.coN_Id).subscribe((data:any)=>{
	// 			this.mainData = data;
	// 			this.childData = data[0].getalllabtest;	
	// 			this.imageUrl = this.mainData[0].hospital_Logo

	// 	})

	//   }
	// }
	ngOnInit(): void {
		this.service.GetConsult_LabTestById(this._data.d.coN_Id).subscribe((data: any) => {
			this.mainData = data;
			console.log('main data :' + JSON.stringify(this.mainData))
			this.hospital_Name = this.mainData[0].hospital_Name;
			this.hospital_Address = this.mainData[0].hospital_Address;
			this.hos_village = this.mainData[0].hos_village;
			this.taluk_name = this.mainData[0].taluk_name;
			this.district_name = this.mainData[0].district_name;
			this.state_name = this.mainData[0].state_name;
			this.postalcode = this.mainData[0].postalcode;
			this.country_name = this.mainData[0].country_name;
			this.hospital_Email = this.mainData[0].hospital_Email;
			this.hos_phoneNo = this.mainData[0].hos_phoneNo;
			this.hos_url = this.mainData[0].hos_url;
			this.coN_Id = this.mainData[0].coN_Id;
			this.pr_Id = this.mainData[0].pR_Code;
			this.dO_Name = this.mainData[0].dO_Name;
			this.pR_Code = this.mainData[0].pR_Code;
			this.pR_Age = this.mainData[0].pR_Age;
			this.pR_Name = this.mainData[0].pR_Name;
			this.do_reg_no = this.mainData[0].do_reg_no;
			this.consulted_Date = this.mainData[0].consulted_Date;
			this.childData = data[0].getalllabtest;
			this.imageUrl = this.mainData[0].hospital_Logo;
			this.imageUrl2 = this.mainData[0].do_signature;
			this.imageUrl3 = this.mainData[0].hos_NetworkLogo;
			this.page_title = 'Lab' + '-' + 'ConsId' + this.coN_Id + '-' + 'PId' + this.pr_Id;;

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
            border: 0px solid #ccc;
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

