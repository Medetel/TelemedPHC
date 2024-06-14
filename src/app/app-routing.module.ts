import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { BaseComponent } from './views/layout/base/base.component';
import { CallbackUrlComponent } from './modules/callback-url/callback-url.component';
const routes: Routes = [
  
  {
    path:'',redirectTo:'auth',pathMatch:'full'
  },
  
  {
    path: 'callbackurl', component: CallbackUrlComponent,
  },
  { path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) }
  ,
  {
    canActivate:[AuthGuard],
    path: 'base',
    component: BaseComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        canActivate:[AuthGuard],
        path: "admin",
        loadChildren: () =>
          import("./modules/admin-module/admin.module").then((m) => m.AdminModule),
      },
      {
        canActivate:[AuthGuard],
        path: "profile",
        loadChildren: () =>
          import("./modules/profile-module/profile.module").then((m) => m.ProfileModule),
      },
      {
        canActivate:[AuthGuard],
        path: "master",
        loadChildren: () =>
          import("./modules/master-module/master-module.module").then((m) => m.MasterModuleModule),
      },
      {
        canActivate:[AuthGuard],
        path: "registration",
        loadChildren: () =>
          import("./modules/register-module/register-module.module").then((m) => m.RegisterModuleModule),
      },
      {
        canActivate:[AuthGuard],
        path: "task",
        loadChildren: () =>
          import("./modules/task-module/task-module.module").then((m) => m.TaskModuleModule),
      },
      {
        canActivate:[AuthGuard],
        path: "reports",
        loadChildren: () =>
          import("./modules/reports/reports.module").then((m) => m.ReportsModule),
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
