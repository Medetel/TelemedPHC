import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewservicechargesComponent } from './viewservicecharges.component';

describe('ViewservicechargesComponent', () => {
  let component: ViewservicechargesComponent;
  let fixture: ComponentFixture<ViewservicechargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewservicechargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewservicechargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
