import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlabComponent } from './editlab.component';

describe('EditlabComponent', () => {
  let component: EditlabComponent;
  let fixture: ComponentFixture<EditlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditlabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
