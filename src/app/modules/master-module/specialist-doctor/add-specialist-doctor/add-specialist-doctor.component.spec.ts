import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecialistDoctorComponent } from './add-specialist-doctor.component';

describe('AddSpecialistDoctorComponent', () => {
  let component: AddSpecialistDoctorComponent;
  let fixture: ComponentFixture<AddSpecialistDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSpecialistDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpecialistDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
