import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewManualAppointmentComponent } from './view-manual-appointment.component';

describe('ViewManualAppointmentComponent', () => {
  let component: ViewManualAppointmentComponent;
  let fixture: ComponentFixture<ViewManualAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewManualAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewManualAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
