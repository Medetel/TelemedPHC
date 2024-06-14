import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiagnostictestComponent } from './edit-diagnostictest.component';

describe('EditDiagnostictestComponent', () => {
  let component: EditDiagnostictestComponent;
  let fixture: ComponentFixture<EditDiagnostictestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDiagnostictestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDiagnostictestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
