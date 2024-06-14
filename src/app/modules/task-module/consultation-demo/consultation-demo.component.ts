import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientRegistrationService } from '../../register-module/patient-registration/patient-registration.service';

@Component({
  selector: 'app-consultation-demo',
  templateUrl: './consultation-demo.component.html',
  styleUrls: ['./consultation-demo.component.scss']
})
export class ConsultationDemoComponent implements OnInit {

  constructor(private router: ActivatedRoute, private routerLink:Router) {
   }
 
  patient_register = true;
  doctor_schedule = true;
  appointment = true;
  approve_appointment = true;
  consult_patient = true;
  video_call = true;
  video_consult = true;


  ngOnInit(): void {
    let id = this.router.snapshot.params['id'];
    // console.log('receive id', id)
    if (id == 'patient_register') {
      this.patient_register = false;
    }
    else if (id == 'doctor_schedule') {
      this.doctor_schedule =false
    }
    else if (id == 'appointment') {
      this.appointment = false
    }
    else if (id == 'approve_appointment') {
      this.approve_appointment = false
    }
    else if (id == 'consult_patient') {
      this.consult_patient = false
    }
    else if (id == 'video_call') {
      this.video_call = false
    }
    else if (id == 'video_consult') {
      this.video_consult = false
    } 

  }

  

  back() {

    let id = this.router.snapshot.params['id'];
    // console.log('receive id', id)
    if (id == 'patient_register') {
      this.routerLink.navigate(['/base/registration/patient'])
    }
    else if (id == 'doctor_schedule') {
      this.routerLink.navigate(['/base/master/doctorschedule'])
    }
    else if (id == 'appointment') {
      this.routerLink.navigate(['/base/task/appointment'])
    }
    else if (id == 'approve_appointment') {
      this.routerLink.navigate(['/base/task/Confirmmanualappointment'])
    }
    else if (id == 'consult_patient') {
      this.routerLink.navigate(['/base/task/consultation'])
    }
    else if (id == 'video_call') {
      this.routerLink.navigate(['/base/task/consultation'])
    }
    else {
      this.routerLink.navigate(['/base/task/join-vc'])
    } 
  }

}
