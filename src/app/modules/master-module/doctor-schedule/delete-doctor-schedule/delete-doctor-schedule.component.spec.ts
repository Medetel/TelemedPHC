import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDoctorScheduleComponent } from './delete-doctor-schedule.component';

describe('DeleteDoctorScheduleComponent', () => {
  let component: DeleteDoctorScheduleComponent;
  let fixture: ComponentFixture<DeleteDoctorScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDoctorScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDoctorScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
