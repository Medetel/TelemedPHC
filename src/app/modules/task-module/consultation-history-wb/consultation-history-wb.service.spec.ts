import { TestBed } from '@angular/core/testing';

import { ConsultationHistoryWbService } from './consultation-history-wb.service';

describe('ConsultationHistoryWbService', () => {
  let service: ConsultationHistoryWbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultationHistoryWbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
