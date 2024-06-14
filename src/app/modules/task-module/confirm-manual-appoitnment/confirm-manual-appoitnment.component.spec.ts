import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmManualAppoitnmentComponent } from './confirm-manual-appoitnment.component';

describe('ConfirmManualAppoitnmentComponent', () => {
  let component: ConfirmManualAppoitnmentComponent;
  let fixture: ComponentFixture<ConfirmManualAppoitnmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmManualAppoitnmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmManualAppoitnmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
