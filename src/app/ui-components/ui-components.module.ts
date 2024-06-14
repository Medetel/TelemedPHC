import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiComponentsComponent } from './ui-components.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { TimepickerComponent } from './timepicker/timepicker.component';

const routes: Routes = [
  {
    path: '',
    component: UiComponentsComponent,
    children: [
      {
        path: '',
        redirectTo: 'alerts',
        pathMatch: 'full'
      },
      {
        path: 'timepicker',
        component: TimepickerComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    UiComponentsComponent,
     TimepickerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),  
    NgbModule,
    PerfectScrollbarModule,
    FormsModule,    
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class UiComponentsModule { }
