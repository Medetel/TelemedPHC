import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HemoglobinTestComponent } from './hemoglobin-test.component';

describe('HemoglobinTestComponent', () => {
  let component: HemoglobinTestComponent;
  let fixture: ComponentFixture<HemoglobinTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HemoglobinTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HemoglobinTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
