import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCallcenterComponent } from './view-callcenter.component';

describe('ViewCallcenterComponent', () => {
  let component: ViewCallcenterComponent;
  let fixture: ComponentFixture<ViewCallcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCallcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCallcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
