import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PHCManualAppointComponent } from './phc-manual-appoint.component';

describe('PHCManualAppointComponent', () => {
  let component: PHCManualAppointComponent;
  let fixture: ComponentFixture<PHCManualAppointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PHCManualAppointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PHCManualAppointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
