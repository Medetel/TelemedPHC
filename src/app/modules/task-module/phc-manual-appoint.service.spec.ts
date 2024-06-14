import { TestBed } from '@angular/core/testing';

import { PHCManualAppointService } from './phc-manual-appoint.service';

describe('PHCManualAppointService', () => {
  let service: PHCManualAppointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PHCManualAppointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
