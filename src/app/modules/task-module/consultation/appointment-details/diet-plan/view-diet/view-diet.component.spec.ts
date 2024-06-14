import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDietComponent } from './view-diet.component';

describe('ViewDietComponent', () => {
  let component: ViewDietComponent;
  let fixture: ComponentFixture<ViewDietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDietComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
