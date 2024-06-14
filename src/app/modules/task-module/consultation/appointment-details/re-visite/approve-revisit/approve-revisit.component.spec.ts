import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRevisitComponent } from './approve-revisit.component';

describe('ApproveRevisitComponent', () => {
  let component: ApproveRevisitComponent;
  let fixture: ComponentFixture<ApproveRevisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveRevisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRevisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
