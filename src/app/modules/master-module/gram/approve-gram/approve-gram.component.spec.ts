import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveGramComponent } from './approve-gram.component';

describe('ApproveGramComponent', () => {
  let component: ApproveGramComponent;
  let fixture: ComponentFixture<ApproveGramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveGramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveGramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
