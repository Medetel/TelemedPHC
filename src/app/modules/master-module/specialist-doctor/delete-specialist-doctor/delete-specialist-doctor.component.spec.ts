import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSpecialistDoctorComponent } from './delete-specialist-doctor.component';

describe('DeleteSpecialistDoctorComponent', () => {
  let component: DeleteSpecialistDoctorComponent;
  let fixture: ComponentFixture<DeleteSpecialistDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSpecialistDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSpecialistDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
