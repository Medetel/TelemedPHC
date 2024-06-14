import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDoctorRegistrationComponent } from './delete-doctor-registration.component';

describe('DeleteDoctorRegistrationComponent', () => {
  let component: DeleteDoctorRegistrationComponent;
  let fixture: ComponentFixture<DeleteDoctorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDoctorRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDoctorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
