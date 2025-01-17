import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecilizationComponent } from './view-specilization.component';

describe('ViewSpecilizationComponent', () => {
  let component: ViewSpecilizationComponent;
  let fixture: ComponentFixture<ViewSpecilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSpecilizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpecilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
