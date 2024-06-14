import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalDianosisInfoViewComponent } from './clinical-dianosis-info-view.component';

describe('ClinicalDianosisInfoViewComponent', () => {
  let component: ClinicalDianosisInfoViewComponent;
  let fixture: ComponentFixture<ClinicalDianosisInfoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalDianosisInfoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalDianosisInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
