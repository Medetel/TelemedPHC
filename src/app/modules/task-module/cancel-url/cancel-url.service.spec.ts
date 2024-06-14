import { TestBed } from '@angular/core/testing';

import { CancelUrlService } from './cancel-url.service';

describe('CancelUrlService', () => {
  let service: CancelUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancelUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
