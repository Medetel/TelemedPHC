import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteservicechargeComponent } from './deleteservicecharge.component';

describe('DeleteservicechargeComponent', () => {
  let component: DeleteservicechargeComponent;
  let fixture: ComponentFixture<DeleteservicechargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteservicechargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteservicechargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
