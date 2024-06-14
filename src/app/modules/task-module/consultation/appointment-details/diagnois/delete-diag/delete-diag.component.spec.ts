import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDiagComponent } from './delete-diag.component';

describe('DeleteDiagComponent', () => {
  let component: DeleteDiagComponent;
  let fixture: ComponentFixture<DeleteDiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDiagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
