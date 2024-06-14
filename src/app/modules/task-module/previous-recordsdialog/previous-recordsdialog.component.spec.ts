import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousRecordsdialogComponent } from './previous-recordsdialog.component';

describe('PreviousRecordsdialogComponent', () => {
  let component: PreviousRecordsdialogComponent;
  let fixture: ComponentFixture<PreviousRecordsdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousRecordsdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousRecordsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
