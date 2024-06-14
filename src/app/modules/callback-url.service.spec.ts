import { TestBed } from '@angular/core/testing';

import { CallbackUrlService } from './callback-url.service';

describe('CallbackUrlService', () => {
  let service: CallbackUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallbackUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
