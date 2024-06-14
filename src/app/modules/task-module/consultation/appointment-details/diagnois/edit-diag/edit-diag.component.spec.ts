import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiagComponent } from './edit-diag.component';

describe('EditDiagComponent', () => {
  let component: EditDiagComponent;
  let fixture: ComponentFixture<EditDiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDiagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
