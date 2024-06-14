import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorRegistrationComponent } from './add-doctor-registration.component';

describe('AddDoctorRegistrationComponent', () => {
  let component: AddDoctorRegistrationComponent;
  let fixture: ComponentFixture<AddDoctorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoctorRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
