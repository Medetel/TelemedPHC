import { Component, OnInit } from '@angular/core';
import { NgForm,FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from "@angular/router";
import { CounsultationService } from '../counsultation.service';


@Component({
  selector: 'app-vc',
  templateUrl: './vc.component.html',
  styleUrls: ['./vc.component.scss']
})
export class VCComponent implements OnInit {
 

  constructor() { }
 
  ngOnInit(): void {
    
  }

}
