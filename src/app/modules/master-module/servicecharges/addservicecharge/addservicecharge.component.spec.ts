import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddservicechargeComponent } from './addservicecharge.component';

describe('AddservicechargeComponent', () => {
  let component: AddservicechargeComponent;
  let fixture: ComponentFixture<AddservicechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddservicechargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddservicechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
