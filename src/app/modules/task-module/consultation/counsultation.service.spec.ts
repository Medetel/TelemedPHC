import { TestBed } from '@angular/core/testing';

import { CounsultationService } from './counsultation.service';

describe('CounsultationService', () => {
  let service: CounsultationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounsultationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
