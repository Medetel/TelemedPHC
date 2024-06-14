import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcMeetingComponent } from './vc-meeting.component';

describe('VcMeetingComponent', () => {
  let component: VcMeetingComponent;
  let fixture: ComponentFixture<VcMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
