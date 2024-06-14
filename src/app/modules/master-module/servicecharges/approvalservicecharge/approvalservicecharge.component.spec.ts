import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalservicechargeComponent } from './approvalservicecharge.component';

describe('ApprovalservicechargeComponent', () => {
  let component: ApprovalservicechargeComponent;
  let fixture: ComponentFixture<ApprovalservicechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalservicechargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalservicechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
