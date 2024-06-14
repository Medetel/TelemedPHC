import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAppointmentComponent } from './manual-appointment.component';

describe('ManualAppointmentComponent', () => {
  let component: ManualAppointmentComponent;
  let fixture: ComponentFixture<ManualAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
