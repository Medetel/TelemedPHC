import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePatientRegistrationComponent } from './delete-patient-registration.component';

describe('DeletePatientRegistrationComponent', () => {
  let component: DeletePatientRegistrationComponent;
  let fixture: ComponentFixture<DeletePatientRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePatientRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePatientRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
