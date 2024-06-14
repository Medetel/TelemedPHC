import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuickConsultChangeComponent } from './view-quick-consult-change.component';

describe('ViewQuickConsultChangeComponent', () => {
  let component: ViewQuickConsultChangeComponent;
  let fixture: ComponentFixture<ViewQuickConsultChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuickConsultChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuickConsultChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
