import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAllhistoryComponent } from './patient-allhistory.component';

describe('PatientAllhistoryComponent', () => {
  let component: PatientAllhistoryComponent;
  let fixture: ComponentFixture<PatientAllhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAllhistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAllhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
