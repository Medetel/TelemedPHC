import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPhcManualAppoinmentComponent } from './view-phc-manual-appoinment.component';

describe('ViewPhcManualAppoinmentComponent', () => {
  let component: ViewPhcManualAppoinmentComponent;
  let fixture: ComponentFixture<ViewPhcManualAppoinmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPhcManualAppoinmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPhcManualAppoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
