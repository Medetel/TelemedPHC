import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { sharedModule } from 'src/app/shared/share.module';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule, Route } from '@angular/router';
import { TaskModuleComponent } from './task-module.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AddAppointmentComponent } from './appointment/add-appointment/add-appointment.component';
import { AppointmentPatientComponent } from './appointment/add-appointment/appointment-patient/appointment-patient.component';
import { TempratureComponent } from './appointment/add-appointment/appointment-patient/temprature/temprature.component';
import { BloodPressureComponent } from './appointment/add-appointment/appointment-patient/blood-pressure/blood-pressure.component';
import { BloodTestComponent } from './appointment/add-appointment/appointment-patient/blood-test/blood-test.component';
import { EcgMonitorComponent } from './appointment/add-appointment/appointment-patient/ecg-monitor/ecg-monitor.component';
import { HemoglobinTestComponent } from './appointment/add-appointment/appointment-patient/hemoglobin-test/hemoglobin-test.component';
import { PulseOximeterComponent } from './appointment/add-appointment/appointment-patient/pulse-oximeter/pulse-oximeter.component';
import { ManualAppointmentComponent } from './manual-appointment/manual-appointment.component';
import { ManualAppointmentAddComponent } from './manual-appointment/manual-appointment-add/manual-appointment-add.component';
import { ViewPatientManualComponent } from './manual-appointment/manual-appointment-add/view-patient-manual/view-patient-manual.component';
import { FixAppointmentComponent } from './manual-appointment/manual-appointment-add/fix-appointment/fix-appointment.component';
import { AppointmentDetailsComponent } from './consultation/appointment-details/appointment-details.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { PatientHistoryComponent } from './consultation/appointment-details/patient-history/patient-history.component';
import { PastRecordsComponent } from './consultation/appointment-details/past-records/past-records.component';
import { CompliantsComponent } from './consultation/appointment-details/compliants/compliants.component';
import { SymptomsComponent } from './consultation/appointment-details/symptoms/symptoms.component';
import { ParameterComponent } from './consultation/appointment-details/parameter/parameter.component';
import { DiagnoisComponent } from './consultation/appointment-details/diagnois/diagnois.component';
import { PrescriptionsComponent } from './consultation/appointment-details/prescriptions/prescriptions.component';
import { LabTestComponent } from './consultation/appointment-details/lab-test/lab-test.component';
import { ImagingTestComponent } from './consultation/appointment-details/imaging-test/imaging-test.component';
import { DietPlanComponent } from './consultation/appointment-details/diet-plan/diet-plan.component';
import { ReferralComponent } from './consultation/appointment-details/referral/referral.component';
import { ViewManualAppointmentComponent } from './manual-appointment/view-manual-appointment/view-manual-appointment.component';
import { EditManualAppointmentComponent } from './manual-appointment/edit-manual-appointment/edit-manual-appointment.component';
import { DeleteManualAppointmentComponent } from './manual-appointment/delete-manual-appointment/delete-manual-appointment.component';
import { AppointmentaddComponent } from './manual-appointment/appointmentadd/appointmentadd.component';
import { ConfirmManualAppoitnmentComponent } from './confirm-manual-appoitnment/confirm-manual-appoitnment.component';
import { PHCManualAppointComponent } from './phc-manual-appoint/phc-manual-appoint.component';
//import { AddPhcManualAppointmentComponent } from './PHC-manual-appoint/add-phc-manual-appointment/add-phc-manual-appointment.component';
//import { DeletePhcManualAppoinmentComponent } from './PHC-manual-appoint/delete-phc-manual-appoinment/delete-phc-manual-appoinment.component';
import { ViewPhcManualAppoinmentComponent } from './phc-manual-appoint/view-phc-manual-appoinment/view-phc-manual-appoinment.component';
import { EditPhcManualAppoinmentComponent } from './phc-manual-appoint/edit-phc-manual-appoinment/edit-phc-manual-appoinment.component';
import { PreviousRecordsComponent } from './previous-records/previous-records.component';
import { PreviousRecordsdialogComponent } from './previous-recordsdialog/previous-recordsdialog.component';
import { ViewConsultationComponent } from './confirm-manual-appoitnment/view-consultation/view-consultation.component';
import { AppoinmentConfirmComponent } from './confirm-manual-appoitnment/appoinment-confirm/appoinment-confirm.component';
import { AppoinmentRejectComponent } from './confirm-manual-appoitnment/appoinment-reject/appoinment-reject.component';
import { ApproveAppoinmentComponent } from './manual-appointment/approve-appoinment/approve-appoinment.component';
import { ApproveAppoinmentphcComponent } from './phc-manual-appoint/approve-appoinmentphc/approve-appoinmentphc.component';
import { PresentIllenessComponent } from './consultation/appointment-details/present-illeness/present-illeness.component';
import { ClinicalobservationComponent } from './consultation/appointment-details/clinicalobservation/clinicalobservation.component';
import { ReVisiteComponent } from './consultation/appointment-details/re-visite/re-visite.component';
import { ClosureComponent } from './consultation/appointment-details/closure/closure.component';
import { ViewPrescriptionComponent } from './consultation/appointment-details/prescriptions/view-prescription/view-prescription.component';
import { PrescriptionPdfComponent } from './consultation/appointment-details/prescriptions/prescription-pdf/prescription-pdf.component';
import { ViewDietComponent } from './consultation/appointment-details/diet-plan/view-diet/view-diet.component';
import { DeletePrescriptionsComponent } from './consultation/appointment-details/prescriptions/delete-prescriptions/delete-prescriptions.component';
import { DeleteDietComponent } from './consultation/appointment-details/diet-plan/delete-diet/delete-diet.component';
import { ViewDiagComponent } from './consultation/appointment-details/diagnois/view-diag/view-diag.component';
import { EditDiagComponent } from './consultation/appointment-details/diagnois/edit-diag/edit-diag.component';
import { DeleteDiagComponent } from './consultation/appointment-details/diagnois/delete-diag/delete-diag.component';
import { EditlabComponent } from './consultation/appointment-details/lab-test/editlab/editlab.component';
import { DeletelabComponent } from './consultation/appointment-details/lab-test/deletelab/deletelab.component';
import { DeleteconsultComponent } from './consultation/deleteconsult/deleteconsult.component';
//import { VCComponent } from './consultation/vc/vc.component';
import { StartMeetingComponent } from './consultation/start-meeting/start-meeting.component';
import { JoinMeetingComponent } from './consultation/join-meeting/join-meeting.component';

import { ViewReferralComponent } from './consultation/appointment-details/referral/view-referral/view-referral.component';
import { DeleteReferralComponent } from './consultation/appointment-details/referral/delete-referral/delete-referral.component';
import { ApproveReferralComponent } from './consultation/appointment-details/referral/approve-referral/approve-referral.component';
import { ViewRevisitComponent } from './consultation/appointment-details/re-visite/view-revisit/view-revisit.component';
import { ApproveRevisitComponent } from './consultation/appointment-details/re-visite/approve-revisit/approve-revisit.component';
import { DeleteRevisitComponent } from './consultation/appointment-details/re-visite/delete-revisit/delete-revisit.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GoogleChartsModule } from 'angular-google-charts';
import { PatientAllhistoryComponent } from './patient-allhistory/patient-allhistory.component';
import { PatientDetailComponent } from './consultation/appointment-details/patient-history/patient-detail/patient-detail.component';
import { DeletePhcManualAppoinmentComponent } from './phc-manual-appoint/delete-phc-manual-appoinment/delete-phc-manual-appoinment.component';
import { ApprvAppointmentComponent } from './appointment/apprv-appointment/apprv-appointment.component';
import { DltAppointmentComponent } from './appointment/dlt-appointment/dlt-appointment.component';
import { ViewPatientComponent } from './appointment/add-appointment/view-patient/view-patient.component';
import { AssignAppointmentphcComponent } from './phc-manual-appoint/assign-appointmentphc/assign-appointmentphc.component';
import { AddappointmentphcComponent } from './phc-manual-appoint/addappointmentphc/addappointmentphc.component';
import { FilterPipe } from './phc-manual-appoint/filter.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';
import { AppointmentPHCHistoryComponent } from './appointment-phc-history/appointment-phc-history.component';
import { ViewAppointmentComponent } from './appointment-history/view-appointment/view-appointment.component';
import { CloseComponent } from './consultation/appointment-details/close/close.component';
import { VideoConfComponent } from './consultation/video-conf/video-conf.component';
import { JoinvcMeetingComponent } from './joinvc-meeting/joinvc-meeting.component';
import { AddPhcManualAppointmentComponent } from './phc-manual-appoint/add-phc-manual-appointment/add-phc-manual-appointment.component';
import { Time24to12Format } from '../../../app/shared/time24to12.pipe';
import { DirectStartmeetingComponent } from './direct-startmeeting/direct-startmeeting.component';
import { LabInfoComponent } from './lab-info/lab-info.component';
import { SuggestLabComponent } from './lab-info/suggest-lab/suggest-lab.component';
import { PharmacyInfoComponent } from './pharmacy-info/pharmacy-info.component';
import { SuggestPrescriptionComponent } from './pharmacy-info/suggest-prescription/suggest-prescription.component';
import { EndMeetingComponent } from './consultation/end-meeting/end-meeting.component';
import { LabtestPdfComponent } from './consultation/appointment-details/lab-test/labtest-pdf/labtest-pdf.component';
import { DietplanInfoComponent } from './dietplan-info/dietplan-info.component';
import { SuggestDietplanComponent } from './dietplan-info/suggest-dietplan/suggest-dietplan.component';
import { ConsultationHistoryComponent } from './consultation-history/consultation-history.component';
import { ConsultationViewComponent } from './consultation-history/consultation-view/consultation-view.component';
import { QuickConsultChangeComponent } from './quick-consult-change/quick-consult-change.component';
import { ViewQuickConsultChangeComponent } from './quick-consult-change/view-quick-consult-change/view-quick-consult-change.component';
import { EditQuickConsultChangeComponent } from './quick-consult-change/edit-quick-consult-change/edit-quick-consult-change.component';
import { DeleteQuickConsultChangeComponent } from './quick-consult-change/delete-quick-consult-change/delete-quick-consult-change.component';
import { ArticlesComponent } from './articles/articles.component';
import { ConsultationDemoComponent } from './consultation-demo/consultation-demo.component';
import { VideoOneComponent } from './videos/video-one/video-one.component';
import { VideoTwoComponent } from './videos/video-two/video-two.component';
import { VideoThreeComponent } from './videos/video-three/video-three.component';
import { VideoFourComponent } from './videos/video-four/video-four.component';
import { VideoFiveComponent } from './videos/video-five/video-five.component';
import { VideoSixComponent } from './videos/video-six/video-six.component';
import { VideoSevenComponent } from './videos/video-seven/video-seven.component';
import { RedirectUrlComponent } from './redirect-url/redirect-url.component';
import { CancelUrlComponent } from './cancel-url/cancel-url.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { VideoOneKannadaComponent } from './videos/video-one-kannada/video-one-kannada.component';
import { VideoTwoKannadaComponent } from './videos/video-two-kannada/video-two-kannada.component';
import { VideoThreeKannadaComponent } from './videos/video-three-kannada/video-three-kannada.component';
import { VideoFourKannadaComponent } from './videos/video-four-kannada/video-four-kannada.component';
import { VideoEightComponent } from './videos/video-eight/video-eight.component';
import { ClinicalDianosisInfoComponent } from './clinical-dianosis-info/clinical-dianosis-info.component';
import { ClinicalDianosisInfoViewComponent } from './clinical-dianosis-info/clinical-dianosis-info-view/clinical-dianosis-info-view.component';
import { RefundFormComponent } from './refund-form/refund-form.component';
import { PatientPayhistoryphcComponent } from './patient-payhistoryphc/patient-payhistoryphc.component';
import { PackagesPhcComponent } from './checkout-form/packages-phc/packages-phc.component';
import { VitalsComponent } from './checkout-form/vitals/vitals.component';
import { ApproverefundComponent } from './approverefund/approverefund.component';
import { ViewVitalsComponent } from './checkout-form/view-vitals/view-vitals.component';
import { HowAddConsulationEnglishComponent } from './videos/how-add-consulation-english/how-add-consulation-english.component';
import { HowToCONSULTKANADAComponent } from './videos/how-to-consult-kanada/how-to-consult-kanada.component';
import { ConsulationengComponent } from './videos/consulationeng/consulationeng.component';
import { ConsultationHistoryWbComponent } from './consultation-history-wb/consultation-history-wb.component';
import { ConsultationWbViewComponent } from './consultation-history-wb/consultation-wb-view/consultation-wb-view.component';
import { VcSpecialistComponent } from './vc-specialist/vc-specialist.component';


const routes: Route[] = [
  {
    path: '', component: TaskModuleComponent,
    children: [
      {
        path: 'appointment', component: TaskModuleComponent,
        children: [
          {
            path: '', component: AppointmentComponent,
          },
          {
            path: 'add-appointment', component: AddAppointmentComponent
          },
          {
            path: 'previous-record/:patient_id', component: PreviousRecordsComponent
          },
        ]
      },
      {
        path: 'patientAllhistory', component: PatientAllhistoryComponent,
      },
      {
        path: 'join-vc', component: JoinvcMeetingComponent,
      },
      {
        path: 'videocall-specialist', component: VcSpecialistComponent,
      },
      {
        path: 'direct-startmeeting/:pR_Id', component: DirectStartmeetingComponent,
      },
      {
        path: 'lab-info', component: LabInfoComponent,
      },
      {
        path: 'pharmacy-info', component: PharmacyInfoComponent,
      },
      {
        path: 'dietplan-info', component: DietplanInfoComponent,
      },     
      {
        path: 'clinical-dianosis-info', component: ClinicalDianosisInfoComponent,
      },   
       
      {
        path: 'redirecturl', component: RedirectUrlComponent,
      },
      {
        path: 'cancelurl', component: CancelUrlComponent,
      },

      {
        path: 'checkoutform', component: CheckoutFormComponent,
      },
      {
        path: 'refundform', component: RefundFormComponent,
      },
      {
        path: 'approverefund', component: ApproverefundComponent,
      },
      {
        path: 'payhistoryphc', component: PatientPayhistoryphcComponent,
      },

      {
        path: 'manualappointment', component: TaskModuleComponent,
        children: [
          {
            path: '', component: ManualAppointmentComponent,
          },
          {
            // path:'add-manualappointment',component:ManualAppointmentAddComponent
            path: 'add-manualappointment', component: AppointmentaddComponent
          },
          {
            path: 'previous-record/:patient_id', component: PreviousRecordsComponent
          },
        ]
      },
      {
        path: 'manualappointmentphc', component: TaskModuleComponent,
        children: [
          {
            path: '', component: PHCManualAppointComponent,
          },
          {
            // path:'add-manualappointment',component:ManualAppointmentAddComponent
            path: 'add-manualappointmentphc', component: AddPhcManualAppointmentComponent
          }
         
        ]
      },
      {
        path: 'quick_consult', component: TaskModuleComponent,
        children: [
          {
            path: '', component: QuickConsultChangeComponent,
          },
          {

            path: 'view-quickconsult', component: ViewQuickConsultChangeComponent
          },
          {

            path: 'edit-quickconsult', component: EditQuickConsultChangeComponent
          },
          {

            path: 'delete-quickconsult', component: DeleteQuickConsultChangeComponent
          },
        ]
      },
      {
        path: 'appointment-history', component: TaskModuleComponent,
        children: [
          {
            path: '', component: AppointmentHistoryComponent,
          }
        ]
      },
      {
        path: 'consultation-history', component: TaskModuleComponent,
        children: [
          {
            path: '', component: ConsultationHistoryComponent,
          }
        ]
      },
      {
        path: 'consultation-history-wb', component: TaskModuleComponent,
        children: [
          {
            path: '', component: ConsultationHistoryWbComponent,
          }
        ]
      },
      {
        path: 'appointmentphc-history', component: TaskModuleComponent,
        children: [
          {
            path: '', component: AppointmentPHCHistoryComponent
          }
        ]

      },
      {
        path: 'Confirmmanualappointment', component: TaskModuleComponent,
        children: [
          {
            path: '', component: ConfirmManualAppoitnmentComponent,
          },
        ]
      },
      {
        path: 'articles', component: TaskModuleComponent,
        children: [
          {
            path: '', component: ArticlesComponent,
          },
        ]
      },
      // {
      //   path: 'consultation_demo/:id', component: TaskModuleComponent,
      //   children: [
      //     {
      //       path: '', component: ConsultationDemoComponent,
      //     },
      //   ]
      // },
      {
        path: 'v1', component: TaskModuleComponent,
        children: [
          {
            path: '', component: VideoOneComponent,
          },
        ]
      },
      {
        path: 'v2', component: TaskModuleComponent,
        children: [
          {
            path: '', component: VideoTwoComponent,
          },
        ]
      },
      {
        path: 'v3', component: TaskModuleComponent,
        children: [
          {
            path: '', component: VideoThreeComponent,
          },
        ]
      },
      {
        path: 'v4', component: TaskModuleComponent,
        children: [
          {
            path: '', component: VideoFourComponent,
          },
        ]
      },
      {
        path: 'v5', component: TaskModuleComponent,
        children: [
          {
            path: '', component: VideoFiveComponent,
          },
        ]
      },
      {
        path: 'v6', component: TaskModuleComponent,
        children: [
          {
            path: '', component: VideoSixComponent,
          },
        ]
      },
      {
        path: 'v7', component: TaskModuleComponent,
        children: [
          {
            path: '', component: VideoSevenComponent,
          },
        ]
      },
      {
        path: 'v8', component: TaskModuleComponent,
        children: [
          {
            path: '', component: VideoEightComponent,
          },
        ]
      },
      {
        path: 'v1_kannada', component: TaskModuleComponent,
        children: [
          {
            path: '', component: VideoOneKannadaComponent,
          },
        ]
      },

      {
        path: 'How_To_fix_appoinmnet_ENG', component: HowAddConsulationEnglishComponent,
        children: [
          {
            path: '', component: VideoOneKannadaComponent,
          },
        ]
      },
      {
        path: 'Pay_for_consult_kannada', component: HowToCONSULTKANADAComponent,
        children: [
          {
            path: '', component: VideoOneKannadaComponent,
          },
        ]
      },

      {
        path: 'How_To_pay_consulatation_ENG', component: ConsulationengComponent,
        children: [
          {
            path: '', component: VideoOneKannadaComponent,
          },
        ]
      },
      {
        path: 'v2_kannada', component: TaskModuleComponent,
        children: [
          {
            path: '', component: VideoTwoKannadaComponent,
          },
        ]
      },
      {
        path: 'v3_kannada', component: TaskModuleComponent,
        children: [
          {
            path: '', component: VideoThreeKannadaComponent,
          },
        ]
      },
      {
        path: 'v4_kannada', component: TaskModuleComponent,
        children: [
          {
            path: '', component: VideoFourKannadaComponent,
          },
        ]
      },
      {
        path: 'consultation', component: TaskModuleComponent,
        children: [
          {
            path: '', component: ConsultationComponent,
          },

          {
            path: 'vcconsult/:consult_id/:patient_id', component: VideoConfComponent,
          },

          //{
          // path:'vcconsult',component:VCComponent,
          //},

          {
            path: 'start-meeting', component: StartMeetingComponent,
          },
          {
            path: 'join-meeting', component: JoinMeetingComponent,
          },

          {
            path: 'consult/:id', component: AppointmentDetailsComponent,
            children: [
              {
                path: 'patienthistory/:id', component: PatientHistoryComponent,
              },
              {
                path: 'pastrecord/:id', component: PastRecordsComponent,
              },
              {
                path: 'compliants/:id', component: CompliantsComponent,
              },
              {
                path: 'symptoms/:id', component: SymptomsComponent,
              },
              {
                path: 'parameter/:id', component: ParameterComponent,
              },
              {
                path: 'diagnois/:id', component: DiagnoisComponent,
              },
              {
                path: 'prescription/:id', component: PrescriptionsComponent,
              },
              {
                path: 'labtest/:id', component: LabTestComponent,
              },
              {
                path: 'imagingtest/:id', component: ImagingTestComponent,
              },
              {
                path: 'dietplan/:id', component: DietPlanComponent,
              },
              {
                path: 'referral/:id', component: ReferralComponent,
              },
              {
                path: 'presentillness/:id', component: PresentIllenessComponent,
              },
              {
                path: 'clinicalobsevation/:id', component: ClinicalobservationComponent,
              },
              {
                path: 'revisite/:id', component: ReVisiteComponent,
              },
            ]
          }
        ]
      },
    ]
  }
]


@NgModule({
  declarations: [
    AppointmentComponent,
    AddAppointmentComponent,
    ViewPatientComponent,
    AppointmentPatientComponent,
    TempratureComponent,
    BloodPressureComponent,
    BloodTestComponent,
    EcgMonitorComponent,
    HemoglobinTestComponent,
    PulseOximeterComponent,
    ManualAppointmentComponent,
    ManualAppointmentAddComponent,
    ViewPatientManualComponent,
    FixAppointmentComponent,
    AppointmentDetailsComponent,
    ConsultationComponent,
    PatientHistoryComponent,
    PastRecordsComponent,
    CompliantsComponent,
    SymptomsComponent,
    ParameterComponent,
    DiagnoisComponent,
    PrescriptionsComponent,
    LabTestComponent,
    ImagingTestComponent,
    DietPlanComponent,
    ReferralComponent,
    ViewManualAppointmentComponent,
    EditManualAppointmentComponent,
    DeleteManualAppointmentComponent,
    AppointmentaddComponent,
    ConfirmManualAppoitnmentComponent,
    PHCManualAppointComponent,
    AddPhcManualAppointmentComponent,
    DeletePhcManualAppoinmentComponent,
    ViewPhcManualAppoinmentComponent,
    EditPhcManualAppoinmentComponent,
    PreviousRecordsComponent,
    PreviousRecordsdialogComponent,
    ViewConsultationComponent,
    AppoinmentConfirmComponent,
    AppoinmentRejectComponent,
    ApproveAppoinmentComponent,
    ApproveAppoinmentphcComponent,
    PresentIllenessComponent,
    ClinicalobservationComponent,
    ReVisiteComponent,
    ClosureComponent,
    ViewPrescriptionComponent,
    PrescriptionPdfComponent,
    ViewDietComponent,
    DeletePrescriptionsComponent,
    DeleteDietComponent,
    ViewDiagComponent,
    EditDiagComponent,
    DeleteDiagComponent,
    EditlabComponent,
    DeletelabComponent,
    DeleteconsultComponent,
    //VCComponent,
    VideoConfComponent,
    StartMeetingComponent,
    JoinMeetingComponent,
    ViewReferralComponent,
    DeleteReferralComponent,
    ApproveReferralComponent,
    ViewRevisitComponent,
    ApproveRevisitComponent,
    DeleteRevisitComponent,
    PatientAllhistoryComponent,
    PatientDetailComponent,
    DeletePhcManualAppoinmentComponent,
    ApprvAppointmentComponent,
    DltAppointmentComponent,
    AssignAppointmentphcComponent,
    AddappointmentphcComponent,
    FilterPipe,
    AppointmentHistoryComponent,
    AppointmentPHCHistoryComponent,
    ViewAppointmentComponent,
    CloseComponent,
    JoinvcMeetingComponent,
    Time24to12Format,
    DirectStartmeetingComponent,
    LabInfoComponent,
    SuggestLabComponent,
    PharmacyInfoComponent,
    SuggestPrescriptionComponent,
    EndMeetingComponent,
    LabtestPdfComponent,
    DietplanInfoComponent,
    SuggestDietplanComponent,
    ConsultationHistoryComponent,
    ConsultationViewComponent,
    QuickConsultChangeComponent,
    ViewQuickConsultChangeComponent,
    EditQuickConsultChangeComponent,
    DeleteQuickConsultChangeComponent,
    ArticlesComponent,
    ConsultationDemoComponent,
    VideoOneComponent,
    VideoTwoComponent,
    VideoThreeComponent,
    VideoFourComponent,
    VideoFiveComponent,
    VideoSixComponent,
    VideoSevenComponent,
    RedirectUrlComponent,
    CancelUrlComponent,
    CheckoutFormComponent,
    VideoOneKannadaComponent,
    VideoTwoKannadaComponent,
    VideoThreeKannadaComponent,
    VideoFourKannadaComponent,
    VideoEightComponent,
    ClinicalDianosisInfoComponent,
    ClinicalDianosisInfoViewComponent,
    RefundFormComponent,
    PatientPayhistoryphcComponent,
    PackagesPhcComponent,
    VitalsComponent,
    ApproverefundComponent,
    ViewVitalsComponent,
    HowAddConsulationEnglishComponent,
    HowToCONSULTKANADAComponent,
    ConsulationengComponent,
    ConsultationHistoryWbComponent,
    ConsultationWbViewComponent,
    VcSpecialistComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    sharedModule,
    DataTablesModule,
    MatPaginatorModule,
    GoogleChartsModule,
    MatRadioModule,
    RouterModule.forChild(routes)
  ]
})
export class TaskModuleModule { }
