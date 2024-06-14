import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiagnostictestComponent } from './add-diagnostictest.component';

describe('AddDiagnostictestComponent', () => {
  let component: AddDiagnostictestComponent;
  let fixture: ComponentFixture<AddDiagnostictestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDiagnostictestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiagnostictestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
