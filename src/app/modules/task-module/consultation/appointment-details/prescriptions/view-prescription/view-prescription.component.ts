import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.component.html',
  styleUrls: ['./view-prescription.component.scss']
})
export class ViewPrescriptionComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  // prc_Drd_name_unit: any;
  // drg_frq_name: any;
  // drug_strength: any;
  // prc_intake_instaruction: any;
  prc_Drd_name_unit:any;
  prc_drug_type_name:any;
  drug_strength:any;
  drg_Unit:any;
  drg_frq_order:any;
  drg_frq_name:any;
  prc_drug_duration:any;
  prc_duration_intermof:any;
  prc_intake:any;
  prc_intake_instaruction:any;
  status_name:any;


  constructor(@Inject(MAT_DIALOG_DATA) private _data: any) { }
  public downloadAsPDF() {
    const doc = new jsPDF();
    //get table html
    const pdfTable = this.pdfTable.nativeElement;
    //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);
   
    const documentDefinition = { content: html };
    
    pdfMake.createPdf(documentDefinition).open();    
  
  }

  ngOnInit(): void {  
    // this.prc_Drd_name_unit=this._data.d.prc_Drd_name_unit;
    // this.drug_strength=this._data.d.drug_strength
    // this.drg_frq_name=this._data.d.drg_frq_name
    // this.prc_intake_instaruction=this._data.d.prc_intake_instaruction
   this.prc_Drd_name_unit=this._data.d.prc_Drd_name_unit
  this.prc_drug_type_name=this._data.d.prc_drug_type_name
  this.drug_strength=this._data.d.drug_strength
  this.drg_Unit=this._data.d.drg_Unit
  this.drg_frq_order=this._data.d.drg_frq_order
  this.drg_frq_name=this._data.d.drg_frq_name
  this.prc_drug_duration=this._data.d.prc_drug_duration
  this.prc_duration_intermof=this._data.d.prc_duration_intermof
  this.prc_intake=this._data.d.prc_intake
  this.prc_intake_instaruction=this._data.d.prc_intake_instaruction
  this.status_name=this._data.d.status_name
  }

}
