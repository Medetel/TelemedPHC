import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentConfirmComponent } from './appoinment-confirm.component';

describe('AppoinmentConfirmComponent', () => {
  let component: AppoinmentConfirmComponent;
  let fixture: ComponentFixture<AppoinmentConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppoinmentConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoinmentConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
