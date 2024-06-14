import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGramComponent } from './view-gram.component';

describe('ViewGramComponent', () => {
  let component: ViewGramComponent;
  let fixture: ComponentFixture<ViewGramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
