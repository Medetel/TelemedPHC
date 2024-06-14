import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDoctorRegComponent } from './approve-doctor-reg.component';

describe('ApproveDoctorRegComponent', () => {
  let component: ApproveDoctorRegComponent;
  let fixture: ComponentFixture<ApproveDoctorRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDoctorRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDoctorRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
