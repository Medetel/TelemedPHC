import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestDietplanComponent } from './suggest-dietplan.component';

describe('SuggestDietplanComponent', () => {
  let component: SuggestDietplanComponent;
  let fixture: ComponentFixture<SuggestDietplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestDietplanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestDietplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
