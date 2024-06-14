import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestPrescriptionComponent } from './suggest-prescription.component';

describe('SuggestPrescriptionComponent', () => {
  let component: SuggestPrescriptionComponent;
  let fixture: ComponentFixture<SuggestPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestPrescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
