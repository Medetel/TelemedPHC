import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDisciplineComponent } from './approve-discipline.component';

describe('ApproveDisciplineComponent', () => {
  let component: ApproveDisciplineComponent;
  let fixture: ComponentFixture<ApproveDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDisciplineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
