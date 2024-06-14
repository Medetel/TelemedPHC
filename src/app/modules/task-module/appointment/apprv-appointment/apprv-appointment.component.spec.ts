import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprvAppointmentComponent } from './apprv-appointment.component';

describe('ApprvAppointmentComponent', () => {
  let component: ApprvAppointmentComponent;
  let fixture: ComponentFixture<ApprvAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprvAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprvAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
