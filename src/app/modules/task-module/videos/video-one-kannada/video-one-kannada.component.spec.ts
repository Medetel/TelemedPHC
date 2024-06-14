import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOneKannadaComponent } from './video-one-kannada.component';

describe('VideoOneKannadaComponent', () => {
  let component: VideoOneKannadaComponent;
  let fixture: ComponentFixture<VideoOneKannadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoOneKannadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoOneKannadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
