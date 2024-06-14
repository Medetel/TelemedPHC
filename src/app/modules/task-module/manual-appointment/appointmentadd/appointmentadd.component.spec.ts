import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentaddComponent } from './appointmentadd.component';

describe('AppointmentaddComponent', () => {
  let component: AppointmentaddComponent;
  let fixture: ComponentFixture<AppointmentaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
