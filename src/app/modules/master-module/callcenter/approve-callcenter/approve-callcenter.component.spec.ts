import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCallcenterComponent } from './approve-callcenter.component';

describe('ApproveCallcenterComponent', () => {
  let component: ApproveCallcenterComponent;
  let fixture: ComponentFixture<ApproveCallcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveCallcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCallcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
