import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentRejectComponent } from './appoinment-reject.component';

describe('AppoinmentRejectComponent', () => {
  let component: AppoinmentRejectComponent;
  let fixture: ComponentFixture<AppoinmentRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppoinmentRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoinmentRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
