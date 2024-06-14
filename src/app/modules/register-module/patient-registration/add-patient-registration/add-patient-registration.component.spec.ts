import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientRegistrationComponent } from './add-patient-registration.component';

describe('AddPatientRegistrationComponent', () => {
  let component: AddPatientRegistrationComponent;
  let fixture: ComponentFixture<AddPatientRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPatientRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPatientRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
