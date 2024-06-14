import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietplanInfoComponent } from './dietplan-info.component';

describe('DietplanInfoComponent', () => {
  let component: DietplanInfoComponent;
  let fixture: ComponentFixture<DietplanInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietplanInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietplanInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
