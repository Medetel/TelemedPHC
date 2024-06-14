import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationHistoryWbComponent } from './consultation-history-wb.component';

describe('ConsultationHistoryWbComponent', () => {
  let component: ConsultationHistoryWbComponent;
  let fixture: ComponentFixture<ConsultationHistoryWbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationHistoryWbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationHistoryWbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
