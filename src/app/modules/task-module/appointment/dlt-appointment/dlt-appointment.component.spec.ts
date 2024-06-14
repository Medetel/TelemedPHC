import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DltAppointmentComponent } from './dlt-appointment.component';

describe('DltAppointmentComponent', () => {
  let component: DltAppointmentComponent;
  let fixture: ComponentFixture<DltAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DltAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DltAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
