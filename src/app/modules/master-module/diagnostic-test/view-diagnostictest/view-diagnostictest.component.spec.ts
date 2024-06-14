import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDiagnostictestComponent } from './view-diagnostictest.component';

describe('ViewDiagnostictestComponent', () => {
  let component: ViewDiagnostictestComponent;
  let fixture: ComponentFixture<ViewDiagnostictestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDiagnostictestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDiagnostictestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
