import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sharedModule } from 'src/app/shared/share.module';
import { RouterModule,Route } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditUsersComponent } from '../admin-module/users/edit-users/edit-users.component';
const routes:Route[]=[
       {
         path:'',component:ProfileComponent,
         children:[
           {
             path:'user-profile',component:ProfileComponent,
             children:[
               {
                 path:'',component:ProfilePageComponent
               }
             ]
           },
           {
            path:'edit-user-profile',component:ProfileComponent,
            children:[
              {
                path:'',component:EditProfileComponent
              }
            ]
          },
         ]
       }
]
@NgModule({
  declarations: [
    ProfilePageComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    sharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
