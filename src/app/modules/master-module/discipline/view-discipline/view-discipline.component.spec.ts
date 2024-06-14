import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDisciplineComponent } from './view-discipline.component';

describe('ViewDisciplineComponent', () => {
  let component: ViewDisciplineComponent;
  let fixture: ComponentFixture<ViewDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDisciplineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
