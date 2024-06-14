import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatientManualComponent } from './view-patient-manual.component';

describe('ViewPatientManualComponent', () => {
  let component: ViewPatientManualComponent;
  let fixture: ComponentFixture<ViewPatientManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPatientManualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPatientManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
