import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveStateComponent } from './approve-state.component';

describe('ApproveStateComponent', () => {
  let component: ApproveStateComponent;
  let fixture: ComponentFixture<ApproveStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
