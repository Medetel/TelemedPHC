import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionPdfComponent } from './prescription-pdf.component';

describe('PrescriptionPdfComponent', () => {
  let component: PrescriptionPdfComponent;
  let fixture: ComponentFixture<PrescriptionPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
