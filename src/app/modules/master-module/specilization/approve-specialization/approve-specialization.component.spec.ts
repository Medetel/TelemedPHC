import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveSpecializationComponent } from './approve-specialization.component';

describe('ApproveSpecializationComponent', () => {
  let component: ApproveSpecializationComponent;
  let fixture: ComponentFixture<ApproveSpecializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveSpecializationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
