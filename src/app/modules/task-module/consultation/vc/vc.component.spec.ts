import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VCComponent } from './vc.component';

describe('VCComponent', () => {
  let component: VCComponent;
  let fixture: ComponentFixture<VCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
