import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagingTestComponent } from './imaging-test.component';

describe('ImagingTestComponent', () => {
  let component: ImagingTestComponent;
  let fixture: ComponentFixture<ImagingTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagingTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagingTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
