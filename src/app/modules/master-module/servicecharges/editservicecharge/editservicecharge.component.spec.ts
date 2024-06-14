import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditservicechargeComponent } from './editservicecharge.component';

describe('EditservicechargeComponent', () => {
  let component: EditservicechargeComponent;
  let fixture: ComponentFixture<EditservicechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditservicechargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditservicechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
