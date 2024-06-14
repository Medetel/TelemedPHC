import { TestBed } from '@angular/core/testing';

import { SpecilizationService } from './specilization.service';

describe('SpecilizationService', () => {
  let service: SpecilizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecilizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
