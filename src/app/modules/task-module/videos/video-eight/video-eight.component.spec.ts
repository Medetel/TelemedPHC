import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoEightComponent } from './video-eight.component';

describe('VideoEightComponent', () => {
  let component: VideoEightComponent;
  let fixture: ComponentFixture<VideoEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoEightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
