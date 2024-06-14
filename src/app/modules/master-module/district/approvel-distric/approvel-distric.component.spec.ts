import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovelDistricComponent } from './approvel-distric.component';

describe('ApprovelDistricComponent', () => {
  let component: ApprovelDistricComponent;
  let fixture: ComponentFixture<ApprovelDistricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovelDistricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovelDistricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
