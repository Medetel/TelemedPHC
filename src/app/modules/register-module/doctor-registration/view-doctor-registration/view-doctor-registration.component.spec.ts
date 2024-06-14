import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoctorRegistrationComponent } from './view-doctor-registration.component';

describe('ViewDoctorRegistrationComponent', () => {
  let component: ViewDoctorRegistrationComponent;
  let fixture: ComponentFixture<ViewDoctorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDoctorRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDoctorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
