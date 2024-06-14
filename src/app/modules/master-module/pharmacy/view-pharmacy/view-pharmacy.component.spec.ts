import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPharmacyComponent } from './view-pharmacy.component';

describe('ViewPharmacyComponent', () => {
  let component: ViewPharmacyComponent;
  let fixture: ComponentFixture<ViewPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPharmacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
