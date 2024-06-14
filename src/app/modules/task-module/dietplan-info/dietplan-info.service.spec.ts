import { TestBed } from '@angular/core/testing';

import { DietplanInfoService } from './dietplan-info.service';

describe('DietplanInfoService', () => {
  let service: DietplanInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DietplanInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
