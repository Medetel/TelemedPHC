import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcSpecialistComponent } from './vc-specialist.component';

describe('VcSpecialistComponent', () => {
  let component: VcSpecialistComponent;
  let fixture: ComponentFixture<VcSpecialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcSpecialistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
