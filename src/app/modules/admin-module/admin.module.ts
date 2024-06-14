import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sharedModule } from 'src/app/shared/share.module';
import { RouterModule,Route } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { AuthorizeComponent } from './authorize/authorize.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminComponent } from './admin.component';
import { AddUsersComponent } from './users/add-users/add-users.component';
import { AddRolesComponent } from './roles/add-roles/add-roles.component';
import { DataTablesModule } from 'angular-datatables';
import { ViewUsersComponent } from './users/view-users/view-users.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';
import { DeleteUsersComponent } from './users/delete-users/delete-users.component';
import { ViewRolesComponent } from './roles/view-roles/view-roles.component';
import { EditRolesComponent } from './roles/edit-roles/edit-roles.component';
import { DeleteRolesComponent } from './roles/delete-roles/delete-roles.component';
import { ActiveRolesComponent } from './roles/active-roles/active-roles.component';
import { ViewAuthorizeComponent } from './authorize/view-authorize/view-authorize.component';
import { ActiveUserComponent } from './users/active-user/active-user.component';


const routes:Route[]=[
        {
          path:'',component:AdminComponent,
          children:[
            {
              path:'users',component:AdminComponent,
              children:[
                {path:'',component:UsersComponent},
                {path:'add-users',component:AddUsersComponent}
              ]
            },
            {
              path:'roles',component:AdminComponent,
              children:[
                {path:'',component:RolesComponent},
                {path:'add-roles',component:AddRolesComponent}
              ]
            },
            {
              path:'authorize',component:AdminComponent,
              children:[
                {path:'',component:AuthorizeComponent}
              ]
            },
            {
              path:'changepassword',component:AdminComponent,
              children:[
                {path:'',component:ChangePasswordComponent}
              ]
            },
          ]
        }
]


@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    AuthorizeComponent,
    ChangePasswordComponent,
    AddUsersComponent,
    AddRolesComponent,
    ViewUsersComponent,
    EditUsersComponent,
    DeleteUsersComponent,
    ViewRolesComponent,
    EditRolesComponent,
    DeleteRolesComponent,
    ActiveRolesComponent,
    ViewAuthorizeComponent,
    ActiveUserComponent,
  ],
  imports: [
    CommonModule,
    sharedModule,
    DataTablesModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
