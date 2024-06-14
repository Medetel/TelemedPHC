import { TestBed } from '@angular/core/testing';

import { GramService } from './gram.service';

describe('GramService', () => {
  let service: GramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
