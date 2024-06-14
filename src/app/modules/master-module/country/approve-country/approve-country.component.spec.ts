import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCountryComponent } from './approve-country.component';

describe('ApproveCountryComponent', () => {
  let component: ApproveCountryComponent;
  let fixture: ComponentFixture<ApproveCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
