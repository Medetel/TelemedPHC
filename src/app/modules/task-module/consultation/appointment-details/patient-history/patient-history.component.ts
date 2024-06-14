import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CounsultationService } from '../../counsultation.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.scss']
})
export class PatientHistoryComponent implements AfterViewInit {
  consult_id:number;
  patient_id:number;
  data:any=[];
  patientid:number;
  viewhid: boolean = false;

  TooltipPosition: TooltipPosition[] = ['above'];

  displayedColumns: string[] = ['position','position2',  'name', 'weight','name1', 'name2'];


  dataSource= new MatTableDataSource<PeriodicElement>(this.data);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute,private service: CounsultationService, public dialog:MatDialog) { }

  ngAfterViewInit(): void {  

    let id = +this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {      
      id = +params['id'];
      this.patient_id=id;     
    });
    
    this.get_patienthistory();
  }

  openDialog(d) {
   
    const dialogRef = this.dialog.open(PatientDetailComponent,
      {
        height:'80%',
        width: '80%',
        data: { d }
      });
    dialogRef.afterClosed().subscribe(result => {     
    
    });
  }

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

    get_patienthistory(){
      this.service.Get_patienthistory_id(this.patient_id).subscribe((res)=>{
        this.data = res;
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.data);
        this.dataSource.paginator=this.paginator
        this.dataSource.sort=this.sort       
      })
    }
}

export interface PeriodicElement {
  name: string;
  name1: string;
  name2: string;
  position: number;
  position2:string;
  // position1: string;
  weight: number;
}
