import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationWbViewComponent } from './consultation-wb-view.component';

describe('ConsultationWbViewComponent', () => {
  let component: ConsultationWbViewComponent;
  let fixture: ComponentFixture<ConsultationWbViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationWbViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationWbViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
