import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDiagnosticComponent } from './delete-diagnostic.component';

describe('DeleteDiagnosticComponent', () => {
  let component: DeleteDiagnosticComponent;
  let fixture: ComponentFixture<DeleteDiagnosticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDiagnosticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
