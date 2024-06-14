import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveHospitalComponent } from './approve-hospital.component';

describe('ApproveHospitalComponent', () => {
  let component: ApproveHospitalComponent;
  let fixture: ComponentFixture<ApproveHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveHospitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
