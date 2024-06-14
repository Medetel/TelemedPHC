import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesPhcComponent } from './packages-phc.component';

describe('PackagesPhcComponent', () => {
  let component: PackagesPhcComponent;
  let fixture: ComponentFixture<PackagesPhcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagesPhcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesPhcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
