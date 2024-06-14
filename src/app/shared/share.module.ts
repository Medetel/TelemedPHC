import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { Notification } from '../core/Notifications/Notification';
import { GlobalStorage } from '../core/Gloabl/Global';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';
import{ReactiveFormsModule,FormControl} from '@angular/forms'
//material module
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MomentDateModule } from '@angular/material-moment-adapter';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';

// import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
      },
      display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'L',
        monthYearA11yLabel: 'MMMM YYYY'
      },
};

@NgModule({
    exports: [
        CommonModule,
        NgSelectModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatTableModule,
        MatDividerModule,
        MatDialogModule,
        MatMenuModule,
        MatTabsModule,
        ReactiveFormsModule,
       MomentDateModule,
       MatCheckboxModule,
       MatStepperModule,
       MatExpansionModule,
       MatChipsModule,
       MatAutocompleteModule,
       MatBadgeModule,
       MatSidenavModule

    ],
    imports: [
        RouterModule,
        CommonModule,
        ToastrModule.forRoot({
          timeOut: 3500,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
    }),
        DataTablesModule,
        NgSelectModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatTableModule,
        MatDividerModule,
        MatDialogModule,
        MatMenuModule,
        MatTabsModule,
        ReactiveFormsModule,
        MomentDateModule,
        MatSortModule,
        MatPaginatorModule,
        MatTableModule,
        MatCheckboxModule,
        MatStepperModule,
        MatExpansionModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatSidenavModule,
       
       
    ],
    declarations: [

    ]
    ,
     providers: [Notification, GlobalStorage,      
       { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
     ]
})
export class sharedModule { }