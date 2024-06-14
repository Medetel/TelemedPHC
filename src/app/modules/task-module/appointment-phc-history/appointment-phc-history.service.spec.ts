import { TestBed } from '@angular/core/testing';

import { AppointmentPhcHistoryService } from './appointment-phc-history.service';

describe('AppointmentPhcHistoryService', () => {
  let service: AppointmentPhcHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentPhcHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
