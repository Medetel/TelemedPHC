import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTwoComponent } from './video-two.component';

describe('VideoTwoComponent', () => {
  let component: VideoTwoComponent;
  let fixture: ComponentFixture<VideoTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
