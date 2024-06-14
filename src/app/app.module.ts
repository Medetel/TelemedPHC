import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//import { MatPaginator } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './core/guard/auth.guard';
import { AppComponent } from './app.component';
import { LayoutModule } from './views/layout/layout.module';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './core/Interceptor';
import { UserService } from '../app/views/pages/auth/UserDetails/user.service';
import { UserProfile } from '../app/views/pages/auth/UserDetails/user.profile';
import { DataTablesModule } from 'angular-datatables';
import { CommanService } from './service/comman.service'
import { sharedModule } from '../app/shared/share.module';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, NgxUiLoaderRouterModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION } from 'ngx-ui-loader';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
// import { NgbDateCustomParserFormatter } from './Common/dateformate/dateformat';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AdminComponent } from './modules/admin-module/admin.component';
import { ProfileComponent } from './modules/profile-module/profile.component';
import { MasterModuleComponent } from './modules/master-module/master-module.component';
import { RegisterModuleComponent } from './modules/register-module/register-module.component';
import { TaskModuleComponent } from './modules/task-module/task-module.component';
import { ErrorInterceptor } from './core/Interceptor/errorInterceptor';
import { NgbDateCustomParserFormatter } from './Common/dateformate/dateformat';
import { CallbackUrlComponent } from './modules/callback-url/callback-url.component';
// import { ReportsComponent } from './modules/reports/reports.component';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
const Config: NgxUiLoaderConfig = {
  bgsColor: "#09ecfb",
  bgsOpacity: 0.5,
  bgsPosition: "bottom-right",
  bgsSize: 60,
  bgsType: "ball-spin-clockwise",
  blur: 5,
  delay: 0,
  fgsColor: "#09ecfb",
  fgsPosition: "center-center",
  fgsSize: 60,
  fgsType: "ball-spin-clockwise",
  gap: 24,
  logoPosition: "center-center",
  logoSize: 120,
  masterLoaderId: "master",
  overlayBorderRadius: "0",
  overlayColor: "rgba(40, 40, 40, 0.8)",
  pbColor: "RED",
  pbDirection: "ltr",
  pbThickness: 5,
  hasProgressBar: true,
  textColor: "#FFFFFF",
  textPosition: "center-center",
  maxTime: -1,
  minTime: 300
};

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ProfileComponent,
    MasterModuleComponent,
    RegisterModuleComponent,
    TaskModuleComponent,
    CallbackUrlComponent
    // ReportsComponent
  ],
  imports: [
    NgxUiLoaderModule.forRoot(Config),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    NgxUiLoaderRouterModule.forRoot({ showForeground: true }),
    LayoutModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    //MatPaginator,
    BrowserAnimationsModule,
    DataTablesModule,
    sharedModule,
    NgWizardModule.forRoot(ngWizardConfig),
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS
    }, 
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    //{ provide: LocationStrategy, useClass: PathLocationStrategy },
    httpInterceptorProviders,
    UserService,
    UserProfile,
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    AuthGuard, CommanService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
