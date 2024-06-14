import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecilizationComponent } from './add-specilization.component';

describe('AddSpecilizationComponent', () => {
  let component: AddSpecilizationComponent;
  let fixture: ComponentFixture<AddSpecilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSpecilizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpecilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
