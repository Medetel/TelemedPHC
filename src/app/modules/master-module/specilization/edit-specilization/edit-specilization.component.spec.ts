import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpecilizationComponent } from './edit-specilization.component';

describe('EditSpecilizationComponent', () => {
  let component: EditSpecilizationComponent;
  let fixture: ComponentFixture<EditSpecilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSpecilizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpecilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
