import { TestBed } from '@angular/core/testing';

import { SpecialistDoctorService } from './specialist-doctor.service';

describe('SpecialistDoctorService', () => {
  let service: SpecialistDoctorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialistDoctorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
