import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDiagnostictestComponent } from './delete-diagnostictest.component';

describe('DeleteDiagnostictestComponent', () => {
  let component: DeleteDiagnostictestComponent;
  let fixture: ComponentFixture<DeleteDiagnostictestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDiagnostictestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDiagnostictestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
