import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpecialistDoctorComponent } from './edit-specialist-doctor.component';

describe('EditSpecialistDoctorComponent', () => {
  let component: EditSpecialistDoctorComponent;
  let fixture: ComponentFixture<EditSpecialistDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSpecialistDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpecialistDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
