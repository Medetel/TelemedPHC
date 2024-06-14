import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoThreeComponent } from './video-three.component';

describe('VideoThreeComponent', () => {
  let component: VideoThreeComponent;
  let fixture: ComponentFixture<VideoThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
