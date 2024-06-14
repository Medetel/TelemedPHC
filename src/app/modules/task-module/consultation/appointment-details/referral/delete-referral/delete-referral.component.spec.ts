import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReferralComponent } from './delete-referral.component';

describe('DeleteReferralComponent', () => {
  let component: DeleteReferralComponent;
  let fixture: ComponentFixture<DeleteReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReferralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
