import { TestBed } from '@angular/core/testing';

import { LabInfoService } from './lab-info.service';

describe('LabInfoService', () => {
  let service: LabInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
