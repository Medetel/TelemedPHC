import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFourComponent } from './video-four.component';

describe('VideoFourComponent', () => {
  let component: VideoFourComponent;
  let fixture: ComponentFixture<VideoFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
