import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientRegistrationComponent } from './edit-patient-registration.component';

describe('EditPatientRegistrationComponent', () => {
  let component: EditPatientRegistrationComponent;
  let fixture: ComponentFixture<EditPatientRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatientRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
