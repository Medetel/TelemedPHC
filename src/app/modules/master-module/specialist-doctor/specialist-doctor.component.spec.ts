import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistDoctorComponent } from './specialist-doctor.component';

describe('SpecialistDoctorComponent', () => {
  let component: SpecialistDoctorComponent;
  let fixture: ComponentFixture<SpecialistDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialistDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
