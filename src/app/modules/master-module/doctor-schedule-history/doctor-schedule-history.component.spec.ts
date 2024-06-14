import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorScheduleHistoryComponent } from './doctor-schedule-history.component';

describe('DoctorScheduleHistoryComponent', () => {
  let component: DoctorScheduleHistoryComponent;
  let fixture: ComponentFixture<DoctorScheduleHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorScheduleHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorScheduleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
