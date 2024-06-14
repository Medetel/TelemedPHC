import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalobservationComponent } from './clinicalobservation.component';

describe('ClinicalobservationComponent', () => {
  let component: ClinicalobservationComponent;
  let fixture: ComponentFixture<ClinicalobservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalobservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalobservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
