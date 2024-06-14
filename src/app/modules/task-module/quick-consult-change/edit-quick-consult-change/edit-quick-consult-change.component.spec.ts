import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuickConsultChangeComponent } from './edit-quick-consult-change.component';

describe('EditQuickConsultChangeComponent', () => {
  let component: EditQuickConsultChangeComponent;
  let fixture: ComponentFixture<EditQuickConsultChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuickConsultChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuickConsultChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
