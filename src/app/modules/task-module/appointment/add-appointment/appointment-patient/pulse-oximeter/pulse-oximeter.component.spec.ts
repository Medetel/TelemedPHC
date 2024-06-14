import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulseOximeterComponent } from './pulse-oximeter.component';

describe('PulseOximeterComponent', () => {
  let component: PulseOximeterComponent;
  let fixture: ComponentFixture<PulseOximeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PulseOximeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PulseOximeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
