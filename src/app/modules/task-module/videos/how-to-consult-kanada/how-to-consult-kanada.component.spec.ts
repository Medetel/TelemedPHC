import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToCONSULTKANADAComponent } from './how-to-consult-kanada.component';

describe('HowToCONSULTKANADAComponent', () => {
  let component: HowToCONSULTKANADAComponent;
  let fixture: ComponentFixture<HowToCONSULTKANADAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowToCONSULTKANADAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToCONSULTKANADAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
