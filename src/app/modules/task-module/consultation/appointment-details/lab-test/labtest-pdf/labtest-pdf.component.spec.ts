import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabtestPdfComponent } from './labtest-pdf.component';

describe('LabtestPdfComponent', () => {
  let component: LabtestPdfComponent;
  let fixture: ComponentFixture<LabtestPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabtestPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabtestPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
