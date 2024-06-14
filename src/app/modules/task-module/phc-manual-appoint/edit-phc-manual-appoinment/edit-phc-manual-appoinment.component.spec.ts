import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhcManualAppoinmentComponent } from './edit-phc-manual-appoinment.component';

describe('EditPhcManualAppoinmentComponent', () => {
  let component: EditPhcManualAppoinmentComponent;
  let fixture: ComponentFixture<EditPhcManualAppoinmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPhcManualAppoinmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhcManualAppoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
