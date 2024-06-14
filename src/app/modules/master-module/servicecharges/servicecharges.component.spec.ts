import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicechargesComponent } from './servicecharges.component';

describe('ServicechargesComponent', () => {
  let component: ServicechargesComponent;
  let fixture: ComponentFixture<ServicechargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicechargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicechargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
