import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePhcManualAppointmentComponent } from './delete-phc-manual-appointment.component';

describe('DeletePhcManualAppointmentComponent', () => {
  let component: DeletePhcManualAppointmentComponent;
  let fixture: ComponentFixture<DeletePhcManualAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePhcManualAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePhcManualAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
