import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRevisitComponent } from './view-revisit.component';

describe('ViewRevisitComponent', () => {
  let component: ViewRevisitComponent;
  let fixture: ComponentFixture<ViewRevisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRevisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRevisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
