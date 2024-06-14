import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePrescriptionsComponent } from './delete-prescriptions.component';

describe('DeletePrescriptionsComponent', () => {
  let component: DeletePrescriptionsComponent;
  let fixture: ComponentFixture<DeletePrescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePrescriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePrescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
