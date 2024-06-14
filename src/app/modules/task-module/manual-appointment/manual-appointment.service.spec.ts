import { TestBed } from '@angular/core/testing';

import { ManualAppointmentService } from './manual-appointment.service';

describe('ManualAppointmentService', () => {
  let service: ManualAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManualAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
