import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPHCHistoryComponent } from './appointment-phc-history.component';

describe('AppointmentPHCHistoryComponent', () => {
  let component: AppointmentPHCHistoryComponent;
  let fixture: ComponentFixture<AppointmentPHCHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentPHCHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentPHCHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
