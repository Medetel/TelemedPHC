import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickConsultChangeComponent } from './quick-consult-change.component';

describe('QuickConsultChangeComponent', () => {
  let component: QuickConsultChangeComponent;
  let fixture: ComponentFixture<QuickConsultChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickConsultChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickConsultChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
