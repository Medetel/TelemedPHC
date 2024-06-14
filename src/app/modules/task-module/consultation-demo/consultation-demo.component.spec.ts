import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationDemoComponent } from './consultation-demo.component';

describe('ConsultationDemoComponent', () => {
  let component: ConsultationDemoComponent;
  let fixture: ComponentFixture<ConsultationDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
