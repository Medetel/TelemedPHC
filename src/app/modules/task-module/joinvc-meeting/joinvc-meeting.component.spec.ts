import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinvcMeetingComponent } from './joinvc-meeting.component';

describe('JoinvcMeetingComponent', () => {
  let component: JoinvcMeetingComponent;
  let fixture: ComponentFixture<JoinvcMeetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinvcMeetingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinvcMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
