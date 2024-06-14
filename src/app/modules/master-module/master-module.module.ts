import { NgModule } from '@angular/core';
//import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { sharedModule } from 'src/app/shared/share.module';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule,Route } from '@angular/router';
import { MasterModuleComponent } from './master-module.component';
import { CountryComponent } from './country/country.component';
import { AddCountryComponent } from './country/add-country/add-country.component';
import { ViewCountryComponent } from './country/view-country/view-country.component';
import { EditCountryComponent } from './country/edit-country/edit-country.component';
import { DeleteCountryComponent } from './country/delete-country/delete-country.component';
import { StateComponent } from './state/state.component';
import { AddStateComponent } from './state/add-state/add-state.component';
import { ViewStateComponent } from './state/view-state/view-state.component';
import { EditStateComponent } from './state/edit-state/edit-state.component';
import { DeleteStateComponent } from './state/delete-state/delete-state.component';
import { DistrictComponent } from './district/district.component';
import { AddDistrictComponent } from './district/add-district/add-district.component';
import { ViewDistrictComponent } from './district/view-district/view-district.component';
import { EditDistrictComponent } from './district/edit-district/edit-district.component';
import { DeleteDistrictComponent } from './district/delete-district/delete-district.component';
import { QualificationComponent } from './qualification/qualification.component';
import { AddQualificationComponent } from './qualification/add-qualification/add-qualification.component';
import { ViewQualificationComponent } from './qualification/view-qualification/view-qualification.component';
import { EditQualificationComponent } from './qualification/edit-qualification/edit-qualification.component';
import { DeleteQualificationComponent } from './qualification/delete-qualification/delete-qualification.component';
import { DesignationComponent } from './designation/designation.component';
import { AddDesignationComponent } from './designation/add-designation/add-designation.component';
import { ViewDesignationComponent } from './designation/view-designation/view-designation.component';
import { EditDesignationComponent } from './designation/edit-designation/edit-designation.component';
import { DeleteDesignationComponent } from './designation/delete-designation/delete-designation.component';
import { DisciplineComponent } from './discipline/discipline.component';
// import { AddDisciplineComponent } from './Discipline/add-discipline/add-discipline.component';
import { ViewDisciplineComponent } from './discipline/view-discipline/view-discipline.component';
import { EditDisciplineComponent } from './discipline/edit-discipline/edit-discipline.component';
import { DeleteDisciplineComponent } from './discipline/delete-discipline/delete-discipline.component';
import { SpecilizationComponent } from './specilization/specilization.component';
// import { AddSpecilizationComponent } from './Specilization/add-specilization/add-specilization.component';
import { ViewSpecilizationComponent } from './specilization/view-specilization/view-specilization.component';
import { EditSpecilizationComponent } from './specilization/edit-specilization/edit-specilization.component';
import { DeleteSpecilizationComponent } from './specilization/delete-specilization/delete-specilization.component';
import { SkillsetComponent } from './skillset/skillset.component';
import { AddSkillsetComponent } from './skillset/add-skillset/add-skillset.component';
import { ViewSkillsetComponent } from './skillset/view-skillset/view-skillset.component';
import { EditSkillsetComponent } from './skillset/edit-skillset/edit-skillset.component';
import { DeleteSkillsetComponent } from './skillset/delete-skillset/delete-skillset.component';
import { NetworkComponent } from './network/network.component';
import { AddNetworkComponent } from './network/add-network/add-network.component';
import { ViewNetworkComponent } from './network/view-network/view-network.component';
import { EditNetworkComponent } from './network/edit-network/edit-network.component';
import { DeleteNetworkComponent } from './network/delete-network/delete-network.component';
import { HospitalComponent } from './hospital/hospital.component';
import { AddHospitalComponent } from './hospital/add-hospital/add-hospital.component';
import { ViewHospitalComponent } from './hospital/view-hospital/view-hospital.component';
import { EditHospitalComponent } from './hospital/edit-hospital/edit-hospital.component';
import { DeleteHospitalComponent } from './hospital/delete-hospital/delete-hospital.component';
import { AssistantComponent } from './assistant/assistant.component';
import { AddAssistantComponent } from './assistant/add-assistant/add-assistant.component';
import { ViewAssistantComponent } from './assistant/view-assistant/view-assistant.component';
import { EditAssistantComponent } from './assistant/edit-assistant/edit-assistant.component';
import { DeleteAssistantComponent } from './assistant/delete-assistant/delete-assistant.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AddDoctorComponent } from './doctor/add-doctor/add-doctor.component';
import { ViewDoctorComponent } from './doctor/view-doctor/view-doctor.component';
import { EditDoctorComponent } from './doctor/edit-doctor/edit-doctor.component';
import { DeleteDoctorComponent } from './doctor/delete-doctor/delete-doctor.component';
import { PartnerComponent } from './partner/partner.component';
import { AddPartnerComponent } from './partner/add-partner/add-partner.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { AddPharmacyComponent } from './pharmacy/add-pharmacy/add-pharmacy.component';
import { DoctorScheduleComponent } from './doctor-schedule/doctor-schedule.component';
import { AddDoctorScheduleComponent } from './doctor-schedule/add-doctor-schedule/add-doctor-schedule.component';
import { DoctorScheduleHistoryComponent } from './doctor-schedule-history/doctor-schedule-history.component';
import { AddDoctorScheduleHistoryComponent } from './doctor-schedule-history/add-doctor-schedule-history/add-doctor-schedule-history.component';
import { TalukComponent } from './taluk/taluk.component';
import { GramComponent } from './gram/gram.component';
import { AddTalukComponent } from './taluk/add-taluk/add-taluk.component';
import { AddGramComponent } from './gram/add-gram/add-gram.component';
import { ViewTalukComponent } from './taluk/view-taluk/view-taluk.component';
import { EditTalukComponent } from './taluk/edit-taluk/edit-taluk.component';
import { DeleteTalukComponent } from './taluk/delete-taluk/delete-taluk.component';
import { ViewGramComponent } from './gram/view-gram/view-gram.component';
import { EditGramComponent } from './gram/edit-gram/edit-gram.component';
import { DeleteGramComponent } from './gram/delete-gram/delete-gram.component';
import { EditPharmacyComponent } from './pharmacy/edit-pharmacy/edit-pharmacy.component';
import { DeletePharmacyComponent } from './pharmacy/delete-pharmacy/delete-pharmacy.component';
import { ViewPharmacyComponent } from './pharmacy/view-pharmacy/view-pharmacy.component';
import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { AddDiagnosticComponent } from './diagnostic/add-diagnostic/add-diagnostic.component';
import { EditDiagnosticComponent } from './diagnostic/edit-diagnostic/edit-diagnostic.component';
import { ViewDiagnosticComponent } from './diagnostic/view-diagnostic/view-diagnostic.component';
import { DeleteDiagnosticComponent } from './diagnostic/delete-diagnostic/delete-diagnostic.component';
import { DiagnoisComponent } from '../task-module/consultation/appointment-details/diagnois/diagnois.component';
import { ApproveCountryComponent } from './country/approve-country/approve-country.component';
import { ApproveStateComponent } from './state/approve-state/approve-state.component';
import { ApprovelDistricComponent } from './district/approvel-distric/approvel-distric.component';
import { ApproveTalukComponent } from './taluk/approve-taluk/approve-taluk.component';
import { ApproveGramComponent } from './gram/approve-gram/approve-gram.component';
import { ApproveQualificationComponent } from './qualification/approve-qualification/approve-qualification.component';
import { ApproveDesignationComponent } from './designation/approve-designation/approve-designation.component';
import { ApproveDisciplineComponent } from './discipline/approve-discipline/approve-discipline.component';
import { ApproveSpecializationComponent } from './specilization/approve-specialization/approve-specialization.component';
import { ApproveSkillsComponent } from './skillset/approve-skills/approve-skills.component';
import { ApproveNetworkComponent } from './network/approve-network/approve-network.component';
import { ApproveHospitalComponent } from './hospital/approve-hospital/approve-hospital.component';
import { ApproveAssistantComponent } from './assistant/approve-assistant/approve-assistant.component';
import { DrugsComponent } from './drugs/drugs.component';
import { AddDrugsComponent } from './drugs/add-drugs/add-drugs.component';
import { EditDrugsComponent } from './drugs/edit-drugs/edit-drugs.component';
import { ViewDrugsComponent } from './drugs/view-drugs/view-drugs.component';
import { DeleteDrugsComponent } from './drugs/delete-drugs/delete-drugs.component';
import { DrugApprovelComponent } from './drugs/drug-approvel/drug-approvel.component';
import { DiagnosticTestComponent } from './diagnostic-test/diagnostic-test.component';
import { AddDiagnostictestComponent } from './diagnostic-test/add-diagnostictest/add-diagnostictest.component';
import { ViewDiagnostictestComponent } from './diagnostic-test/view-diagnostictest/view-diagnostictest.component';
import { EditDiagnostictestComponent } from './diagnostic-test/edit-diagnostictest/edit-diagnostictest.component';
import { DeleteDiagnostictestComponent } from './diagnostic-test/delete-diagnostictest/delete-diagnostictest.component';
import { ApproveDiagnostictestComponent } from './diagnostic-test/approve-diagnostictest/approve-diagnostictest.component';
import { AssistantPasswordComponent } from './assistant/assistant-password/assistant-password.component';
import { VideoConfComponent } from './video-conf/video-conf.component';
import { VcMeetingComponent } from './vc-meeting/vc-meeting.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ServicechargesComponent } from './servicecharges/servicecharges.component';
import { AddservicechargeComponent } from './servicecharges/addservicecharge/addservicecharge.component';
import { ApprovalservicechargeComponent } from './servicecharges/approvalservicecharge/approvalservicecharge.component';
import { DeleteservicechargeComponent } from './servicecharges/deleteservicecharge/deleteservicecharge.component';
import { ViewservicechargesComponent } from './servicecharges/viewservicecharges/viewservicecharges.component';
import { EditservicechargeComponent } from './servicecharges/editservicecharge/editservicecharge.component';
import { AddDisciplineComponent } from './discipline/add-discipline/add-discipline.component';
import { AddSpecilizationComponent } from './specilization/add-specilization/add-specilization.component';
import { DeleteDoctorScheduleComponent } from './doctor-schedule/delete-doctor-schedule/delete-doctor-schedule.component';
import { SpecialistDoctorComponent } from './specialist-doctor/specialist-doctor.component';
import { AddSpecialistDoctorComponent } from './specialist-doctor/add-specialist-doctor/add-specialist-doctor.component';
import { EditSpecialistDoctorComponent } from './specialist-doctor/edit-specialist-doctor/edit-specialist-doctor.component';
import { ViewSpecialistDoctorComponent } from './specialist-doctor/view-specialist-doctor/view-specialist-doctor.component';
import { DeleteSpecialistDoctorComponent } from './specialist-doctor/delete-specialist-doctor/delete-specialist-doctor.component';
import { ApproveSpecialistDoctorComponent } from './specialist-doctor/approve-specialist-doctor/approve-specialist-doctor.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { AddDiagnosisComponent } from './diagnosis/add-diagnosis/add-diagnosis.component';
import { EditDiagnosisComponent } from './diagnosis/edit-diagnosis/edit-diagnosis.component';
import { ViewDiagnosisComponent } from './diagnosis/view-diagnosis/view-diagnosis.component';
import { ApproveDiagnosisComponent } from './diagnosis/approve-diagnosis/approve-diagnosis.component';
import { DeleteDiagnosisComponent } from './diagnosis/delete-diagnosis/delete-diagnosis.component';
import { GalleryUploadComponent } from './gallery-upload/gallery-upload.component';
import { AddGalleryComponent } from './gallery-upload/add-gallery/add-gallery.component';
import { ApproveGalleryComponent } from './gallery-upload/approve-gallery/approve-gallery.component';
import { DeleteGalleryComponent } from './gallery-upload/delete-gallery/delete-gallery.component';
import { EditGalleryComponent } from './gallery-upload/edit-gallery/edit-gallery.component';
import { ViewGalleryComponent } from './gallery-upload/view-gallery/view-gallery.component';
import { CallcenterComponent } from './callcenter/callcenter.component';
import { AddCallcenterComponent } from './callcenter/add-callcenter/add-callcenter.component';
import { EditCallcenterComponent } from './callcenter/edit-callcenter/edit-callcenter.component';
import { ViewCallcenterComponent } from './callcenter/view-callcenter/view-callcenter.component';
import { ApproveCallcenterComponent } from './callcenter/approve-callcenter/approve-callcenter.component';
import { DeleteCallcenterComponent } from './callcenter/delete-callcenter/delete-callcenter.component';


const routes:Route[]=[
  {
    path:'',component:MasterModuleComponent,
    children:[
      {
        path:'country',component:MasterModuleComponent,
        children:[
          {
            path:'',component:CountryComponent
          },
          {
            path:'add-country',component:AddCountryComponent
          }
        ]
      },
      {
        path:'state',component:MasterModuleComponent,
        children:[
          {
            path:'',component:StateComponent
          },
          {
            path:'add-state',component:AddStateComponent
          }
        ]
      },
      {
        path:'services',component:MasterModuleComponent,
        children:[
          {
            path:'',component:ServicechargesComponent
          },
          {
            path:'addservicecharge',component:AddservicechargeComponent
          }
        ]
      },
      {
        path:'district',component:MasterModuleComponent,
        children:[
          {
            path:'',component:DistrictComponent
          },
          {
            path:'add-district',component:AddDistrictComponent
          }
        ]
      },
      {
        path:'taluk',component:MasterModuleComponent,
        children:[
          {
            path:'',component:TalukComponent
          },
          {
            path:'add-taluk',component:AddTalukComponent
          }
        ]
      },
      {
        path:'gram',component:MasterModuleComponent,
        children:[
          {
            path:'',component:GramComponent
          },
          {
            path:'add-gram',component:AddGramComponent
          }
        ]
      },
      {
        path:'qualification',component:MasterModuleComponent,
        children:[
          {
            path:'',component:QualificationComponent
          },
          {
            path:'add-qualification',component:AddQualificationComponent
          }
        ]
      },
      {
        path:'designation',component:MasterModuleComponent,
        children:[
          {
            path:'',component:DesignationComponent
          },
          {
            path:'add-designation',component:AddDesignationComponent
          }
        ]
      },
      {
        path:'discipline',component:MasterModuleComponent,
        children:[
          {
            path:'',component:DisciplineComponent
          },
          {
            path:'add-discipline',component:AddDisciplineComponent
          }
        ]
      },
      {
        path: 'specialist-doctor', component: MasterModuleComponent,
        children: [
          {
            path: '', component: SpecialistDoctorComponent
          },
          {
            path: 'add-specialist-doctor', component: AddSpecialistDoctorComponent
          }
        ]
      },
      {
        path: 'diagnosis', component: MasterModuleComponent,
        children: [
          {
            path: '', component: DiagnosisComponent
          },
          {
            path: 'add-diagnosis', component: AddDiagnosisComponent
          }
        ]
      },
      {
        path: 'videogallery', component: MasterModuleComponent,
        children: [
          {
            path: '', component: GalleryUploadComponent
          },
          {
            path: 'add-gallery', component: AddGalleryComponent
          }
        ]
      },
      {
        path:'specilization',component:MasterModuleComponent,
        children:[
          {
            path:'',component:SpecilizationComponent
          },
          {
            path:'add-specilization',component:AddSpecilizationComponent
          }
        ]
      },
      {
        path:'skillset',component:MasterModuleComponent,
        children:[
          {
            path:'',component:SkillsetComponent
          },
          {
            path:'add-skillset',component:AddSkillsetComponent
          }
        ]
      },
      {
        path:'network',component:MasterModuleComponent,
        children:[
          {
            path:'',component:NetworkComponent
          },
          {
            path:'add-network',component:AddNetworkComponent
          }
        ]
      },
      {
        path:'drugs',component:MasterModuleComponent,
        children:[
          {
            path:'',component:DrugsComponent
          },
          {
            path:'add-drugs',component:AddDrugsComponent
          }
        ]
      },
      {
        path:'diagnostic-test',component:MasterModuleComponent,
        children:[
          {
            path:'',component:DiagnosticTestComponent
          },
          {
            path:'add-diagnostictest',component:AddDiagnostictestComponent
          }
        ]
      },
      {
        path:'hospital',component:MasterModuleComponent,
        children:[
          {
            path:'',component:HospitalComponent
          },
          {
            path:'add-hospital',component:AddHospitalComponent
          }
        ]
      },
      {
        path:'assistant',component:MasterModuleComponent,
        children:[
          {
            path:'',component:AssistantComponent
          },
          {
            path:'add-assistant',component:AddAssistantComponent
          }
        ]
      },
      {
        path: 'support-agent', component: MasterModuleComponent,
        children: [
          {
            path: '', component: CallcenterComponent
          },
          {
            path: 'add-callcenter', component: AddCallcenterComponent
          }
        ]
      },
      {
        path:'partner',component:MasterModuleComponent,
        children:[
          {
            path:'',component:PartnerComponent
          },
          {
            path:'add-partner',component:AddPartnerComponent
          }
        ]
      },
      {
        path:'pharmacy',component:MasterModuleComponent,
        children:[
          {
            path:'',component:PharmacyComponent
          },
          {
            path:'add-pharmacy',component:AddPharmacyComponent
          }
        ]
      },
      {
        path:'diagnostic',component:MasterModuleComponent,
        children:[
          {
            path:'',component:DiagnosticComponent
          },
          {
            path:'add-diagnostic',component:AddDiagnosticComponent
          }
        ]
      },
      {
        path:'doctor',component:MasterModuleComponent,
        children:[
          {
            path:'',component:DoctorComponent
          },
          {
            path:'add-doctor',component:AddDoctorComponent
          }
        ]
      },
      {
        path:'doctorschedule',component:MasterModuleComponent,
        children:[
          {
            path:'',component:DoctorScheduleComponent
          },
          {
            path:'add-doctorschedule',component:AddDoctorScheduleComponent
          }
        ]
      },
      {
        path:'doctorschedulehistory',component:MasterModuleComponent,
        children:[
          {
            path:'',component:DoctorScheduleHistoryComponent
          },
          {
            path:'add-doctorschedulehistory',component:AddDoctorScheduleHistoryComponent
          }
        ]
      },
      {
        path:'videoconf',component:MasterModuleComponent,
        children:[
          {
            path:'',component:VideoConfComponent
          },
          {
            path:'vc-meeting',component:VcMeetingComponent
          }
        ]
      },
    ]
  }
]


@NgModule({
  declarations: [
    CountryComponent,
    AddCountryComponent,
    ViewCountryComponent,
    EditCountryComponent,
    DeleteCountryComponent,
    StateComponent,
    AddStateComponent,
    ViewStateComponent,
    EditStateComponent,
    DeleteStateComponent,
    DistrictComponent,
    AddDistrictComponent,
    ViewDistrictComponent,
    EditDistrictComponent,
    DeleteDistrictComponent,
    QualificationComponent,
    AddQualificationComponent,
    ViewQualificationComponent,
    EditQualificationComponent,
    DeleteQualificationComponent,
    DesignationComponent,
    AddDesignationComponent,
    ViewDesignationComponent,
    EditDesignationComponent,
    DeleteDesignationComponent,
    DisciplineComponent,
    AddDisciplineComponent,
    ViewDisciplineComponent,
    EditDisciplineComponent,
    DeleteDisciplineComponent,
    SpecilizationComponent,
    AddSpecilizationComponent,
    ViewSpecilizationComponent,
    EditSpecilizationComponent,
    DeleteSpecilizationComponent,
    SkillsetComponent,
    AddSkillsetComponent,
    ViewSkillsetComponent,
    EditSkillsetComponent,
    DeleteSkillsetComponent,
    NetworkComponent,
    AddNetworkComponent,
    ViewNetworkComponent,
    EditNetworkComponent,
    DeleteNetworkComponent,
    HospitalComponent,
    AddHospitalComponent,
    ViewHospitalComponent,
    EditHospitalComponent,
    DeleteHospitalComponent,
    AssistantComponent,
    AddAssistantComponent,
    ViewAssistantComponent,
    EditAssistantComponent,
    DeleteAssistantComponent,
    DoctorComponent,
    AddDoctorComponent,
    ViewDoctorComponent,
    EditDoctorComponent,
    DeleteDoctorComponent,
    PartnerComponent,
    AddPartnerComponent,
    PharmacyComponent,
    AddPharmacyComponent,
    DoctorScheduleComponent,
    AddDoctorScheduleComponent,
    DoctorScheduleHistoryComponent,
    AddDoctorScheduleHistoryComponent,
    TalukComponent,
    GramComponent,
    AddTalukComponent,
    AddGramComponent,
    ViewTalukComponent,
    EditTalukComponent,
    DeleteTalukComponent,
    ViewGramComponent,
    EditGramComponent,
    DeleteGramComponent,
    EditPharmacyComponent,
    DeletePharmacyComponent,
    ViewPharmacyComponent,
    DiagnosticComponent,
    AddDiagnosticComponent,
    EditDiagnosticComponent,
    ViewDiagnosticComponent,
    DeleteDiagnosticComponent,
    ApproveCountryComponent,
    ApproveStateComponent,
    ApprovelDistricComponent,
    ApproveTalukComponent,
    ApproveGramComponent,
    ApproveQualificationComponent,
    ApproveDesignationComponent,
    ApproveDisciplineComponent,
    ApproveSpecializationComponent,
    ApproveSkillsComponent,
    ApproveNetworkComponent,
    ApproveHospitalComponent,
    ApproveAssistantComponent,
    DrugsComponent,
    AddDrugsComponent,
    EditDrugsComponent,
    ViewDrugsComponent,
    DeleteDrugsComponent,
    DrugApprovelComponent,
    DiagnosticTestComponent,
    AddDiagnostictestComponent,
    ViewDiagnostictestComponent,
    EditDiagnostictestComponent,
    DeleteDiagnostictestComponent,
    ApproveDiagnostictestComponent,
    AssistantPasswordComponent,
    VideoConfComponent,
    VcMeetingComponent,
    ServicechargesComponent,
     AddservicechargeComponent,
     ApprovalservicechargeComponent,
     DeleteservicechargeComponent,
     ViewservicechargesComponent,
     EditservicechargeComponent,
     DeleteDoctorScheduleComponent,
     SpecialistDoctorComponent,
     AddSpecialistDoctorComponent,
     EditSpecialistDoctorComponent,
     ViewSpecialistDoctorComponent,
     DeleteSpecialistDoctorComponent,
     ApproveSpecialistDoctorComponent,
     DiagnosisComponent,
     AddDiagnosisComponent,
     EditDiagnosisComponent,
     ViewDiagnosisComponent,
     ApproveDiagnosisComponent,
     DeleteDiagnosisComponent,
     GalleryUploadComponent,
     AddGalleryComponent,
     ApproveGalleryComponent,
     DeleteGalleryComponent,
     EditGalleryComponent,
     ViewGalleryComponent,
     CallcenterComponent,
     AddCallcenterComponent,
     EditCallcenterComponent,
     ViewCallcenterComponent,
     ApproveCallcenterComponent,
     DeleteCallcenterComponent,
  ],
  imports: [
    CommonModule,
    sharedModule,
    DataTablesModule,
    MatPaginatorModule,
    RouterModule.forChild(routes)
  ]
})
export class MasterModuleModule { }
