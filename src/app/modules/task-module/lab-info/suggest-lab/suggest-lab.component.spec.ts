import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestLabComponent } from './suggest-lab.component';

describe('SuggestLabComponent', () => {
  let component: SuggestLabComponent;
  let fixture: ComponentFixture<SuggestLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
