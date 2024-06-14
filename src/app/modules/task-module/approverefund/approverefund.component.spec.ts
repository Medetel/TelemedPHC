import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverefundComponent } from './approverefund.component';

describe('ApproverefundComponent', () => {
  let component: ApproverefundComponent;
  let fixture: ComponentFixture<ApproverefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
