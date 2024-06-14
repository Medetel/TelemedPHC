import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillsetComponent } from './add-skillset.component';

describe('AddSkillsetComponent', () => {
  let component: AddSkillsetComponent;
  let fixture: ComponentFixture<AddSkillsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSkillsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
