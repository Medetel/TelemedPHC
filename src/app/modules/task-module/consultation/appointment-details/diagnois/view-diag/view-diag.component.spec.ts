import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDiagComponent } from './view-diag.component';

describe('ViewDiagComponent', () => {
  let component: ViewDiagComponent;
  let fixture: ComponentFixture<ViewDiagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDiagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDiagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
