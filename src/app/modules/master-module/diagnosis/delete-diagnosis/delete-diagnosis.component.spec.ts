import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDiagnosisComponent } from './delete-diagnosis.component';

describe('DeleteDiagnosisComponent', () => {
  let component: DeleteDiagnosisComponent;
  let fixture: ComponentFixture<DeleteDiagnosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDiagnosisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
