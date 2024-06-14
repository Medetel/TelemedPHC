import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFourKannadaComponent } from './video-four-kannada.component';

describe('VideoFourKannadaComponent', () => {
  let component: VideoFourKannadaComponent;
  let fixture: ComponentFixture<VideoFourKannadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoFourKannadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFourKannadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
