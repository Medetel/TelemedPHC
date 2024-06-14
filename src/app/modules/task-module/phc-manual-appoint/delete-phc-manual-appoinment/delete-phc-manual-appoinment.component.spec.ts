import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePhcManualAppoinmentComponent } from './delete-phc-manual-appoinment.component';

describe('DeletePhcManualAppoinmentComponent', () => {
  let component: DeletePhcManualAppoinmentComponent;
  let fixture: ComponentFixture<DeletePhcManualAppoinmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePhcManualAppoinmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePhcManualAppoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
