import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAppoinmentComponent } from './approve-appoinment.component';

describe('ApproveAppoinmentComponent', () => {
  let component: ApproveAppoinmentComponent;
  let fixture: ComponentFixture<ApproveAppoinmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveAppoinmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAppoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
