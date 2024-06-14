import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveQualificationComponent } from './approve-qualification.component';

describe('ApproveQualificationComponent', () => {
  let component: ApproveQualificationComponent;
  let fixture: ComponentFixture<ApproveQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveQualificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
