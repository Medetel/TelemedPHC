import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CounsultationService } from '../../counsultation.service';

@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class CloseComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CloseComponent>,@Inject(MAT_DIALOG_DATA) private data: any,private router: Router, private service: CounsultationService) { }

  ngOnInit(): void {
  }
  
 
  close()
  {
    this.router.navigate(['/base/task/consultation'])
  }
  

}
