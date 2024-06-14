import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPayhistoryphcComponent } from './patient-payhistoryphc.component';

describe('PatientPayhistoryphcComponent', () => {
  let component: PatientPayhistoryphcComponent;
  let fixture: ComponentFixture<PatientPayhistoryphcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientPayhistoryphcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPayhistoryphcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
