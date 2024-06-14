import { TestBed } from '@angular/core/testing';

import { GalleryUploadService } from './gallery-upload.service';

describe('GalleryUploadService', () => {
  let service: GalleryUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
