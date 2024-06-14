import { TestBed } from '@angular/core/testing';

import { VideoConfService } from './video-conf.service';

describe('VideoConfService', () => {
  let service: VideoConfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoConfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
