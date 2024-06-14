import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDesignationComponent } from './approve-designation.component';

describe('ApproveDesignationComponent', () => {
  let component: ApproveDesignationComponent;
  let fixture: ComponentFixture<ApproveDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDesignationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
