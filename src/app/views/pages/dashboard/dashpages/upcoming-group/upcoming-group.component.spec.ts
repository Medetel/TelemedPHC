import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingGroupComponent } from './upcoming-group.component';

describe('UpcomingGroupComponent', () => {
  let component: UpcomingGroupComponent;
  let fixture: ComponentFixture<UpcomingGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
