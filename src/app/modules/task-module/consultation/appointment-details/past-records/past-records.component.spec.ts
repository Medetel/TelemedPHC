import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastRecordsComponent } from './past-records.component';

describe('PastRecordsComponent', () => {
  let component: PastRecordsComponent;
  let fixture: ComponentFixture<PastRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
