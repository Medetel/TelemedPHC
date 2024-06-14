import { TestBed } from '@angular/core/testing';

import { PharmacyInfoService } from './pharmacy-info.service';

describe('PharmacyInfoService', () => {
  let service: PharmacyInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmacyInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
