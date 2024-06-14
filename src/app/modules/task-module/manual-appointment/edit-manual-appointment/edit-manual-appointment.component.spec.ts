import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManualAppointmentComponent } from './edit-manual-appointment.component';

describe('EditManualAppointmentComponent', () => {
  let component: EditManualAppointmentComponent;
  let fixture: ComponentFixture<EditManualAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditManualAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditManualAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
