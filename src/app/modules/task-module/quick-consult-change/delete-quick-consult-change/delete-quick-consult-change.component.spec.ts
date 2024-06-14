import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuickConsultChangeComponent } from './delete-quick-consult-change.component';

describe('DeleteQuickConsultChangeComponent', () => {
  let component: DeleteQuickConsultChangeComponent;
  let fixture: ComponentFixture<DeleteQuickConsultChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteQuickConsultChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteQuickConsultChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
