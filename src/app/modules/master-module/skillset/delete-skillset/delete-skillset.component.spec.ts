import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSkillsetComponent } from './delete-skillset.component';

describe('DeleteSkillsetComponent', () => {
  let component: DeleteSkillsetComponent;
  let fixture: ComponentFixture<DeleteSkillsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSkillsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSkillsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
