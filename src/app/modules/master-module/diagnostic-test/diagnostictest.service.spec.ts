import { TestBed } from '@angular/core/testing';

import { DiagnostictestService } from './diagnostictest.service';

describe('DiagnostictestService', () => {
  let service: DiagnostictestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnostictestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
