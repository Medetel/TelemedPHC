import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveReferralComponent } from './approve-referral.component';

describe('ApproveReferralComponent', () => {
  let component: ApproveReferralComponent;
  let fixture: ComponentFixture<ApproveReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveReferralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
