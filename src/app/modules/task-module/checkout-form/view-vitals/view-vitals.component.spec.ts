import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVitalsComponent } from './view-vitals.component';

describe('ViewVitalsComponent', () => {
  let component: ViewVitalsComponent;
  let fixture: ComponentFixture<ViewVitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVitalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
