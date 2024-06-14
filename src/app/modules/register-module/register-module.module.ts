import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sharedModule } from 'src/app/shared/share.module';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule ,Route } from '@angular/router';
import { RegisterModuleComponent } from './register-module.component';
import { DoctorRegistrationComponent } from './doctor-registration/doctor-registration.component';
import { AddDoctorRegistrationComponent } from './doctor-registration/add-doctor-registration/add-doctor-registration.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { AddPatientRegistrationComponent } from './patient-registration/add-patient-registration/add-patient-registration.component';
import { ViewDoctorRegistrationComponent } from './doctor-registration/view-doctor-registration/view-doctor-registration.component';
import { EditDoctorRegistrationComponent } from './doctor-registration/edit-doctor-registration/edit-doctor-registration.component';
import { DeleteDoctorRegistrationComponent } from './doctor-registration/delete-doctor-registration/delete-doctor-registration.component';
import { ViewPatientRegistrationComponent } from './patient-registration/view-patient-registration/view-patient-registration.component';
import { EditPatientRegistrationComponent } from './patient-registration/edit-patient-registration/edit-patient-registration.component';
import { DeletePatientRegistrationComponent } from './patient-registration/delete-patient-registration/delete-patient-registration.component';
import { ApproveDoctorRegComponent } from './doctor-registration/approve-doctor-reg/approve-doctor-reg.component';
import { MessageboxComponent } from './patient-registration/messagebox/messagebox.component';

const routes:Route[]=[
        {
          path:'',component:RegisterModuleComponent,
          children:[
            {
              path:'doctor',component:RegisterModuleComponent,
              children:[
                {
                  path:'',component:DoctorRegistrationComponent,
                },
                {
                  path:'add-doctor',component:AddDoctorRegistrationComponent
                }
              ]
            },
            {
              path:'patient',component:RegisterModuleComponent,
              children:[
                {
                  path:'',component:PatientRegistrationComponent,
                },
                {
                  path:'add-patient',component:AddPatientRegistrationComponent
                }
              ]
            },
          ]
        }
]


@NgModule({
  declarations: [
    DoctorRegistrationComponent,
    AddDoctorRegistrationComponent,
    PatientRegistrationComponent,
    AddPatientRegistrationComponent,
    ViewDoctorRegistrationComponent,
    EditDoctorRegistrationComponent,
    DeleteDoctorRegistrationComponent,
    ViewPatientRegistrationComponent,
    EditPatientRegistrationComponent,
    DeletePatientRegistrationComponent,
    ApproveDoctorRegComponent,
    MessageboxComponent,
  ],
  imports: [
    CommonModule,
    sharedModule,
    DataTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class RegisterModuleModule { }
