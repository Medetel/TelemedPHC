import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhcManualAppointmentComponent } from './add-phc-manual-appointment.component';

describe('AddPhcManualAppointmentComponent', () => {
  let component: AddPhcManualAppointmentComponent;
  let fixture: ComponentFixture<AddPhcManualAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhcManualAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhcManualAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
