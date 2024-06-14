import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveSkillsComponent } from './approve-skills.component';

describe('ApproveSkillsComponent', () => {
  let component: ApproveSkillsComponent;
  let fixture: ComponentFixture<ApproveSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
