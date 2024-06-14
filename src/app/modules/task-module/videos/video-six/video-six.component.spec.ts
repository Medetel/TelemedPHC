import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSixComponent } from './video-six.component';

describe('VideoSixComponent', () => {
  let component: VideoSixComponent;
  let fixture: ComponentFixture<VideoSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoSixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
