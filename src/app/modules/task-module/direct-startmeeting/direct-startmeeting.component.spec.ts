import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectStartmeetingComponent } from './direct-startmeeting.component';

describe('DirectStartmeetingComponent', () => {
  let component: DirectStartmeetingComponent;
  let fixture: ComponentFixture<DirectStartmeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectStartmeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectStartmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
