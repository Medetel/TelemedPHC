import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulationengComponent } from './consulationeng.component';

describe('ConsulationengComponent', () => {
  let component: ConsulationengComponent;
  let fixture: ComponentFixture<ConsulationengComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulationengComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulationengComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
