import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSkillsetComponent } from './edit-skillset.component';

describe('EditSkillsetComponent', () => {
  let component: EditSkillsetComponent;
  let fixture: ComponentFixture<EditSkillsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSkillsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSkillsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
