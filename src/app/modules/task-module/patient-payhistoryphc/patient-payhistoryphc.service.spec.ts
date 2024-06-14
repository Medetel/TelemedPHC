import { TestBed } from '@angular/core/testing';

import { PatientPayhistoryphcService } from './patient-payhistoryphc.service';

describe('PatientPayhistoryphcService', () => {
  let service: PatientPayhistoryphcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientPayhistoryphcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
