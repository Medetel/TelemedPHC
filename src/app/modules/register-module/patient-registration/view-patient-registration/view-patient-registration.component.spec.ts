import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatientRegistrationComponent } from './view-patient-registration.component';

describe('ViewPatientRegistrationComponent', () => {
  let component: ViewPatientRegistrationComponent;
  let fixture: ComponentFixture<ViewPatientRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPatientRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPatientRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
