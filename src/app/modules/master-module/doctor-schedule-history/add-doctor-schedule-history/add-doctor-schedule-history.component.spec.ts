import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorScheduleHistoryComponent } from './add-doctor-schedule-history.component';

describe('AddDoctorScheduleHistoryComponent', () => {
  let component: AddDoctorScheduleHistoryComponent;
  let fixture: ComponentFixture<AddDoctorScheduleHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoctorScheduleHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorScheduleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
