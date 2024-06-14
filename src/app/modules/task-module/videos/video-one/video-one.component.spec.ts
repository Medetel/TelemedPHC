import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoOneComponent } from './video-one.component';

describe('VideoOneComponent', () => {
  let component: VideoOneComponent;
  let fixture: ComponentFixture<VideoOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
