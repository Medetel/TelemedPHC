import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDiagnostictestComponent } from './approve-diagnostictest.component';

describe('ApproveDiagnostictestComponent', () => {
  let component: ApproveDiagnostictestComponent;
  let fixture: ComponentFixture<ApproveDiagnostictestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDiagnostictestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDiagnostictestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
