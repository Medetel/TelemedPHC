import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import{sharedModule} from '../../../shared/share.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../auth/UserDetails/user.service';
import { UserProfile } from '../auth/UserDetails/user.profile';
import { httpInterceptorProviders } from '../../../core/Interceptor';
import { forgotpasswordComponent } from '../auth/forgotpassword/forgotpassword.component';
import { MustMatchDirective} from '../../../directives/must-match.directive';
import { PatientLoginComponent } from './patient-login/patient-login.component';
import { PatientRegisterComponent } from './patient-register/patient-register.component';
import { MessageDialogComponent } from './login/message-dialog/message-dialog.component';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'forgot',
        component: forgotpasswordComponent
      },
      {
        path:'patientlogin',
        component:PatientLoginComponent
      },
      {
        path: 'patient-register',
        component: PatientRegisterComponent
      },
    ]
  },
]
@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent,forgotpasswordComponent,MustMatchDirective, PatientLoginComponent, PatientRegisterComponent, MessageDialogComponent],
  imports: [
    FormsModule, ReactiveFormsModule,
    CommonModule,
    sharedModule,
    RouterModule.forChild(routes)
  ], providers: [AuthService, httpInterceptorProviders]
})
export class AuthModule { }
