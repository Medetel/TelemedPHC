import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAppointmentAddComponent } from './manual-appointment-add.component';

describe('ManualAppointmentAddComponent', () => {
  let component: ManualAppointmentAddComponent;
  let fixture: ComponentFixture<ManualAppointmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualAppointmentAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualAppointmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
