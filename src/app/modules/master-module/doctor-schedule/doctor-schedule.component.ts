import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Notification } from '../../../core/Notifications/Notification';
import { PartnerService } from '../partner.service';
import { DeleteDoctorScheduleComponent } from './delete-doctor-schedule/delete-doctor-schedule.component';

@Component({
  selector: 'app-doctor-schedule',
  templateUrl: './doctor-schedule.component.html',
  styleUrls: ['./doctor-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class DoctorScheduleComponent implements OnInit {

  panelOpenState = false;
  doctordd:any;
  schd: any;
  select: any;
  selectedDay:any;
  constructor(private service:PartnerService, public dialog: MatDialog, private notif: Notification) {
    this.dataSource.data = this.PeriodicElement;
  }
  scheduleadd = new FormGroup({
    
    dO_Id_FK: new FormControl(),
    do_Scd_day: new FormControl('', [Validators.required]),
    time_from: new FormControl('',[Validators.required]),
    time_to: new FormControl('',[Validators.required]),
  })

  // validateDayDuplicate(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const selectedDay = control.value;
  //     if (this.schd && this.schd.some(schedule => schedule.do_Scd_day === selectedDay)) {
  //       this.notif.errorsmsg("Schedule already exists");
  //       return { duplicateDay: true };    

  //     } 
  //     return null;  
  //   };
  // }


  PeriodicElement = [
    { position: 1, Doctor: '', Day: '', FromTime: '', Totime: '', Action: '' },
  ];

  displayedColumns: string[] = ['position','doctor', 'Day', 'From-Time', 'To-Time', 'Action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.get_schedules();
    this.Get_Doctor();
  }

  Get_Doctor(){
    this.service.Get_Doctor()
    .subscribe((data)=>{
      this.doctordd=data
    })
  }


  // validateDayDuplicate(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const selectedDay = control.value;
  //     if (this.schd && this.schd.some(schedule => schedule.do_Scd_day === selectedDay)) {
  //       this.notif.errorsmsg("Schedule already exists");
  //       return { duplicateDay: true };
  //     }
  //     return null;
  //   };
  // }



result:any;
  schedule() { 
    if(this.scheduleadd.invalid)
    {
      this.notif.errorsmsg("Please enter required fields")
      return;
    }  
      //   this.selectedDay = this.scheduleadd.value.do_Scd_day; 
      //   if (this.schd && this.schd.some(schedule => schedule.do_Scd_day === this.selectedDay)) {
      //   this.notif.errorsmsg("Schedule already exists");
      //   return;

    // }
    const selectedDoctorId = this.scheduleadd.value.dO_Id_FK;
    const selectedDay = this.scheduleadd.value.do_Scd_day;

    if (this.schd && this.schd.some(schedule => schedule.dO_Id_FK === selectedDoctorId && schedule.do_Scd_day === selectedDay)) {
      this.notif.errorsmsg("Doctor already has a schedule on this day");
      return;
    }
    this.service.post_schedule(this.scheduleadd.value)
    .subscribe((res) => {
      this.notif.successmsg("Schedule added successfully");
      window.location.reload(); 
    })
    this.scheduleadd.reset();
      this.get_schedules();  
  }

  get_schedules() {   
    this.service.get_allschedule()
      .subscribe((data) => {
        this.schd = data 
        this.schd = this.schd.filter(u =>u.delete_status!=1)       
        this.dataSource = new MatTableDataSource(this.schd);
        this.dataSource.paginator = this.paginator;
      },(error)=>{
        this.schd=[];
        this.dataSource=new MatTableDataSource(this.schd);
      })
  }
 delete(id:any)
 {
 
    const dialogRef = this.dialog.open(DeleteDoctorScheduleComponent,
      {
        width: '30%',        
        height: '200px',
        hasBackdrop: true, 
        data: { id }
      });
    dialogRef.afterClosed().subscribe(result => {
      this.get_schedules();  
    });  
  }
  
  }
  
  

 

