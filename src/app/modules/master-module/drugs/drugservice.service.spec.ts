import { TestBed } from '@angular/core/testing';

import { DrugserviceService } from './drugservice.service';

describe('DrugserviceService', () => {
  let service: DrugserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
