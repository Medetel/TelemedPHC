import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalDianosisInfoComponent } from './clinical-dianosis-info.component';

describe('ClinicalDianosisInfoComponent', () => {
  let component: ClinicalDianosisInfoComponent;
  let fixture: ComponentFixture<ClinicalDianosisInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalDianosisInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalDianosisInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
