import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTwoKannadaComponent } from './video-two-kannada.component';

describe('VideoTwoKannadaComponent', () => {
  let component: VideoTwoKannadaComponent;
  let fixture: ComponentFixture<VideoTwoKannadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoTwoKannadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTwoKannadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
