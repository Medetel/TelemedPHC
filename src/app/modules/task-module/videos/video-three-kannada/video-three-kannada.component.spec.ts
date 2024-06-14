import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoThreeKannadaComponent } from './video-three-kannada.component';

describe('VideoThreeKannadaComponent', () => {
  let component: VideoThreeKannadaComponent;
  let fixture: ComponentFixture<VideoThreeKannadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoThreeKannadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoThreeKannadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
