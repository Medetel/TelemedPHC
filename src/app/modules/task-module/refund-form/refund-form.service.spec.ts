import { TestBed } from '@angular/core/testing';

import { RefundFormService } from './refund-form.service';

describe('RefundFormService', () => {
  let service: RefundFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefundFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
