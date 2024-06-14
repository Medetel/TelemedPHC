import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSpecilizationComponent } from './delete-specilization.component';

describe('DeleteSpecilizationComponent', () => {
  let component: DeleteSpecilizationComponent;
  let fixture: ComponentFixture<DeleteSpecilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSpecilizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSpecilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
