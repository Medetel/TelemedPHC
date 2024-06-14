import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteManualAppointmentComponent } from './delete-manual-appointment.component';

describe('DeleteManualAppointmentComponent', () => {
  let component: DeleteManualAppointmentComponent;
  let fixture: ComponentFixture<DeleteManualAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteManualAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteManualAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
