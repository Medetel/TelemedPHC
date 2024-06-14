import { TestBed } from '@angular/core/testing';

import { ServicechargeService } from './servicecharge.service';

describe('ServicechargeService', () => {
  let service: ServicechargeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicechargeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
