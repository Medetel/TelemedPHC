import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAppointmentphcComponent } from './assign-appointmentphc.component';

describe('AssignAppointmentphcComponent', () => {
  let component: AssignAppointmentphcComponent;
  let fixture: ComponentFixture<AssignAppointmentphcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignAppointmentphcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignAppointmentphcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
