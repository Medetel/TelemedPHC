import { TestBed } from '@angular/core/testing';

import { ClinicalDiagnosisInfoService } from './clinical-diagnosis-info.service';

describe('ClinicalDiagnosisInfoService', () => {
  let service: ClinicalDiagnosisInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicalDiagnosisInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
