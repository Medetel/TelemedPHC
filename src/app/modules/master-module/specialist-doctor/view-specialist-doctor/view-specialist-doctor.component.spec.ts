import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecialistDoctorComponent } from './view-specialist-doctor.component';

describe('ViewSpecialistDoctorComponent', () => {
  let component: ViewSpecialistDoctorComponent;
  let fixture: ComponentFixture<ViewSpecialistDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSpecialistDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpecialistDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
