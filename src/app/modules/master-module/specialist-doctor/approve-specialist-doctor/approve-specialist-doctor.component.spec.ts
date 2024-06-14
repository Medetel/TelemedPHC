import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveSpecialistDoctorComponent } from './approve-specialist-doctor.component';

describe('ApproveSpecialistDoctorComponent', () => {
  let component: ApproveSpecialistDoctorComponent;
  let fixture: ComponentFixture<ApproveSpecialistDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveSpecialistDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveSpecialistDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
