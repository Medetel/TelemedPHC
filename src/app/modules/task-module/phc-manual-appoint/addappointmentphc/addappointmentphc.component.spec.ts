import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddappointmentphcComponent } from './addappointmentphc.component';

describe('AddappointmentphcComponent', () => {
  let component: AddappointmentphcComponent;
  let fixture: ComponentFixture<AddappointmentphcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddappointmentphcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddappointmentphcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
