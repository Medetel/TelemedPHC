import { TestBed } from '@angular/core/testing';

import { ConsultationHistoryService } from './consultation-history.service';

describe('ConsultationHistoryService', () => {
  let service: ConsultationHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
