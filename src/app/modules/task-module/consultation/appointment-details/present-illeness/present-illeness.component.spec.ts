import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentIllenessComponent } from './present-illeness.component';

describe('PresentIllenessComponent', () => {
  let component: PresentIllenessComponent;
  let fixture: ComponentFixture<PresentIllenessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentIllenessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentIllenessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
