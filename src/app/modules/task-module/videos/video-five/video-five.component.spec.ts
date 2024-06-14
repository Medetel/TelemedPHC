import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFiveComponent } from './video-five.component';

describe('VideoFiveComponent', () => {
  let component: VideoFiveComponent;
  let fixture: ComponentFixture<VideoFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
