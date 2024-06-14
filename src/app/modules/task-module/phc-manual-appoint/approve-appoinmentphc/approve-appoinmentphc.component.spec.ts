import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAppoinmentphcComponent } from './approve-appoinmentphc.component';

describe('ApproveAppoinmentphcComponent', () => {
  let component: ApproveAppoinmentphcComponent;
  let fixture: ComponentFixture<ApproveAppoinmentphcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveAppoinmentphcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAppoinmentphcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
